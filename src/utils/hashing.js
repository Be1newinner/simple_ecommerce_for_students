const argon2 = require("argon2");

async function hashing(text) {
  if (!text) throw new Error("INPUT IS REQUIRED!")

  try {
    const token = await argon2.hash(text);
    return token;
  } catch (error) {
    throw new Error("Hashing failed!");
  }
}

async function verifyHash(
  plainText,
  hashed
) {
  if (!plainText || !hashed) throw new Error("PLAIN_TEXT and HASHED is Required!")

  try {
    const data = await argon2.verify(hashed, plainText);
    return data;
  } catch (error) {
    throw new Error("Hash verification failed!");
  }
}

module.exports = {
  hashing,
  verifyHash
}