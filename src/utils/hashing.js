const argon2 = require("argon2");

async function hashing(text) {
  return argon2.hash(text).catch((err) => {
    throw new Error(`Hashing failed: ${err.message}`);
  });
}

async function verifyHash(
  plainText,
  hashed
) {
  return argon2.verify(hashed, plainText).catch((err) => {
    console.log(hashed, plainText);
    console.error(err);
    throw new Error(`Hash verification failed: ${err.message}`);
  });
}

module.exports = {
  hashing,
  verifyHash
}