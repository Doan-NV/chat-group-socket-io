module.exports = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    let formattedResponse = {
      status: res.statusCode,
      message: res.statusMessage || 'OK',
      data: null
    };

    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      formattedResponse.data = data;
    } catch (err) {
      formattedResponse.data = data;
    }

    originalSend.call(this, JSON.stringify(formattedResponse));
  };

  next();
};


