const bc = require('bcryptjs');
const saltRounds = 10;

exports.encrypt = textToEncrypt => bc.hashSync(textToEncrypt, saltRounds);
