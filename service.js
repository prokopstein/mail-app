const providers = require('./providers/providers.json');
const mapper = require('./mapper');

const { HttpError } = require('./lib/errors');

const start = () => {
  const senders = {};

  for (const el in providers.providers) {
    const p = providers.providers[el];
	console.log(`Creating ${p.name} provider...`);

    const svc = require(p.path);
    senders[p.name] = svc.create(p.config);
  };

  const sendEmail = async (email) => {
    const emailRQ = mapper.mapTo(email);

    let lex;
    for (const s in senders) {
      try {
        await senders[s].sendEmail(emailRQ);
        return Promise.resolve(`Email has been sent via ${s}`);
      } catch (ex) {
        console.log(ex.message);
        if (ex instanceof HttpError) {
			console.log(ex.body);
		}
        lex = ex;
      }
    }
    return Promise.reject(lex);
  };

  return { sendEmail };
};

module.exports = {
  start,
};
