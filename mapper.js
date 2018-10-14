function toArray(v) {
  if (v) {
    const array = v.split(',');
    return array.map(x => x.trim());
  }
  return undefined;
}

module.exports.mapTo = (email) => {
  if (!email) throw new Error('Bad request');
  if (!email.to) throw new Error('No recipient');
  if (!email.subject) throw new Error('No subject');
  if (!email.content) throw new Error('No content');

  return {
    to: toArray(email.to),
    cc: toArray(email.cc),
    bcc: toArray(email.bcc),
    subject: email.subject,
    content: email.content,
  };
};
