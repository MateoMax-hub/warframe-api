const Part = require('../models/part');
const Item = require('../models/item');
const Inv = require('../models/inv');

exports.addPart = async (req, res) => {
  try {
    const savePart = async () => {
      const part = new Part({
        partType: req.body.partType.toLowerCase(),
        part: item._id
      })
      await part.save();
      res.success('OK', part);
    }
    let item
    if (req.body.itemId) {
      item = await Item.findById(req.body.itemId);
    } else {
      item = await Item.findOne({name: req.body.part, type: req.body.itemType})
    }
    
    // const itemExistance = await Inv.findOne({idItem: item._id});
    // if (itemExistance) {
    //   savePart()
    //   return;
    // }
    const partsLeft = [];
    for (let i = 0; i < item.parts.length; i++) {
      const part = item.parts[i];
      const partExistance = await Part.find({partType: part.partType, part: item._id}) 
      const partsEnough = part.cuantity - partExistance.length
      if (partsEnough > 0) {
        for (let i = 0; i < partsEnough; i++) {
          partsLeft.push(part);
        }
      }
    }
    if (partsLeft.length >= 2 || partsLeft.partType !== req.body.partType) {
      savePart()
      return;
    }

    //delete other parts and save new item
    for (let i = 0; i < item.parts.length; i++) {
      const element = item.parts[i];
      for (let o = 0; o < element.cuantity; o++) {
        await Part.findOneAndDelete({partType: element.partType, part: item._id});
      }
    }
    const itemToInv = new Inv({
      type: item.type,
      name: item.name
    })
    await itemToInv.save();
    itemToInv.message = 'item complete'
    res.success('OK', itemToInv);
  } catch (error) {
    res.error(error);
  }
};

exports.getParts = async (req, res) => {
  try {
    const parts = await Part.find().populate('part');
    res.success('OK', parts);
  } catch (error) {
    res.error(error);
  }
};

exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findById(req.body._id).populate('part')
    await part.remove();
    res.success('OK', { message: `${part.part.name} part deleted successfully` });
  } catch (error) {
    res.error(error);
  }
};
