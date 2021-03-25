require("dotenv").config();
const crypto = require("crypto");

// decrypting the encrypted keys
function decryptKeys(str) {
  let iv = Buffer.from(process.env.IV, "hex");
  let encryptedStr = Buffer.from(str, "hex");
  var key = Buffer.from(process.env.SECRET, "hex");
  let decipher = crypto.createDecipheriv(
    process.env.ALGORITHM,
    Buffer.from(key),
    iv
  );
  let decrypted = decipher.update(encryptedStr);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const EncryptedKeys = {
  dbURI:
    "5ace8123da19320ab9ea71fe786db5e325679fcb8d15d1549ea9d3130119657a2a72132468b2e41a491d7131f2d924535ee27c5e25a63b3af5e640e5d2e9f5e5876cf7308fc8abaa2b77811c0ffb829522b22849f1eb7abd21ee70182f456ddc6fd354df9b3ef5157d7075ed338aad83",
  jwtSecret:
    "ea84758ba99754c5fe9cada816c84678278eb19ff8d8b28f86a9ba8243977c5a386aa89013a0ee54daeabe1b43d67d26",
};

module.exports = {
  mongodb: {
    dbURI: decryptKeys(EncryptedKeys.dbURI),
  },
  jwt: {
    clientSecret: decryptKeys(EncryptedKeys.jwtSecret),
  },
};
