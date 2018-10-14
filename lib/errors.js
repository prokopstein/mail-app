class NetError extends Error {
  constructor(message, details) {
    super(message);

    this.details = details;
  }
}

class HttpError extends Error {
  constructor(message, body) {
    super(message);

    this.body = body;
  }
}

module.exports = {
	NetError,
	HttpError,
};
