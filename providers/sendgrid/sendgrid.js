const request = require('../../lib/rest-rq');

class SendGridProvider {
  constructor(config) {
    this.config = config;
  }

  sendEmail(email) {
    const url = `${this.config.url}/mail/send`;
    const headers = { Authorization: `Bearer ${this.config.key}` };
    return request.postJson(url, this.getPayload(email), headers);
  }

  getPayload(email) {
    const res = {
      personalizations: [{
        to: email.to.map(x => ({ email: x })),
      }],
      from: {
        email: this.config.from,
      },
      subject: email.subject,
      content: [{
        type: 'text/plain',
        value: email.content,
      }],
    };

    if (email.cc) res.personalizations[0].cc = email.cc.map(x => ({ email: x }));
    if (email.bcc) res.personalizations[0].bcc = email.bcc.map(x => ({ email: x }));
    return res;
  }
}

module.exports = {
  create: (config) => new SendGridProvider(config),
};
