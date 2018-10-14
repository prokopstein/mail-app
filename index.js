const express = require('express');
const bodyParser = require('body-parser');

const service = require('./service');

const app = express();
app.use(express.static('web'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sender = service.start();

app.post('/sendMail', (req, res) => {
  sender.sendEmail(req.body)
    .then((e) => {
      const msg = e ? e : 'Email has been sent';
	  console.log(`[OK] ${msg}`);
      res.status(200).json({ result: msg });
    })
    .catch((e) => {
      const err = (e && e.message) ? e.message : 'An error occured';
	  console.log(`[ERR] ${err}`);
      res.status(400).json({ error: err });
    });
});

const port = 3019;
app.listen(port);
console.log(`Server is listening on port ${port}. Please access as http://localhost:${port}`);
