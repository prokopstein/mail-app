const request = require('../../lib/rest-rq');

class MailgunProvider {
  constructor(config) {
    this.config = config;
  }

  sendEmail(email) {
    const auth = Buffer.from(`api:${this.config.key}`).toString('base64');

    const url = `${this.config.url}/${this.config.domain}/messages`;
    const headers = { Authorization: `Basic ${auth}` };
    return request.postForm(url, this.getPayload(email), headers);
  }

  getPayload(email) {
    const res = {
      to: email.to.join(),
      from: this.config.from,
      subject: email.subject,
      text: email.content,
    };

    if (email.cc) res.cc = email.cc.join();
    if (email.bcc) res.bcc = email.bcc.join();
    return res;
  }
}

module.exports = {
  create: (config) => new MailgunProvider(config)
};
