const request = require('request');

const { NetError, HttpError } = require('./errors');

const ca = undefined;
const timeout = 10000;

const getOpt = (uri, headers) => {
  const opt = { uri, timeout };
  if (headers) {
    opt.headers = headers;
  }
  if (ca) {
    opt.agentOptions = { ca };
  } else {
    opt.rejectUnauthorized = false;
  }
  return opt;
};

const httpResponseError = (code) => {
  const digit = Math.floor(code / 100);
  return digit !== 2;
};

const httpMethod = (opt, method) => new Promise((resolve, reject) => {
  request[method](opt, (err, httpResponse, body) => {
    if (err) {
      const { message } = err;
      return reject(new NetError(message, err));
    }

    const { statusCode, statusMessage } = httpResponse;
    return httpResponseError(statusCode) ? reject(new HttpError(statusMessage, body)) : resolve(body);
  });
});

const postJson = (uri, payload, headers) => {
  const opt = getOpt(uri, headers);
  opt.json = true;
  opt.body = payload;
  return httpMethod(opt, 'post');
};

const postForm = (uri, payload, headers) => {
  const opt = getOpt(uri, headers);
  opt.form = payload;
  return httpMethod(opt, 'post');
};

module.exports = {
  postJson,
  postForm,
};
