const CommonResponse = (router) => {
  router.use((req, res, next) => {
    res.success = (status = 'OK', payload = null) => {
      const payloadResponse = Array.isArray(payload) ? payload : [payload];
      const response = {
        status,
        data: payloadResponse || [],
      };
      return res.status(200).json(response);
    };

    res.badRequest = (status = 'Bad Request') => res.status(400).json({ status });

    res.unauthorized = (status = 'Unauthorized') => res.status(401).json({ status });

    res.forbiden = (status = 'Forbiden') => res.status(403).json({ status });

    res.error = (status = 'Internal server error') => {
      console.error(status);
      return res.status(500).json({ status });
    };
    next();
  });
};

module.exports = CommonResponse;
