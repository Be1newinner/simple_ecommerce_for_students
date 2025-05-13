const { UserModel } = require("./auth.model.js");
const { verifyHash } = require("../../shared/utils/hashing.js");
const { generateLoginTokens } = require("../../shared/utils/jwt.js");

async function loginUserService(email, password) {
  const user = await UserModel.findOne({ email }).lean();

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isPasswordValid = await verifyHash(password, user.password);
  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  const { accessToken, refreshToken } = await generateLoginTokens({
    uid: userWithoutPassword._id,
    email: userWithoutPassword.email,
    role: userWithoutPassword.role
  });

  return {
    ...userWithoutPassword,
    accessToken,
    refreshToken
  };
}

async function registerUserService({ email, password, name, gender, role, phone }) {
  const userData = new UserModel({
    email,
    password,
    name,
    gender,
    role,
    phone,
  });

  const user = await userData.save();
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
}

module.exports = {
  loginUserService,
  registerUserService
};
