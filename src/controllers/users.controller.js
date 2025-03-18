import { UserModel } from "../models/users.model.js";
import { verifyHash } from "../utils/hashing.js";
import { generateLoginTokens } from "../utils/jwt.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      res.status(404).json({
        error: "No User Found!",
        message: "User Logged In Failed!",
        data: null,
      });
      return;
    }

    const isPasswordValid = await verifyHash(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Invalid email or password!",
        data: null,
      });
      return;
    }

    console.log({ user })

    const userWithoutPassword = user;
    delete userWithoutPassword.password;
    
    const { accessToken, refreshToken } = await generateLoginTokens({
      uid: userWithoutPassword._id,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role
    })

    userWithoutPassword.accessToken = accessToken;
    userWithoutPassword.refreshToken = refreshToken;

    res.status(200).json({
      error: null,
      message: "User logged in successfully!",
      data: userWithoutPassword,
    });
    return;
  } catch (error) {
    const errorMessage = error.message || "Unexpected error!";
    console.log("ERROR => ", error)

    res.status(500).json({
      // error: error,
      message: errorMessage,
      data: null,
    });
  }
}

export async function registerController(req, res) {
  try {
    const { email, password, name, gender, role, phone } = req.body;

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

    if (user) {
      res.status(200).json({
        error: null,
        message: "User register In Success!",
        data: userWithoutPassword,
      });
    } else {
      res.status(404).json({
        error: "No User Found!",
        message: "User Logged In Failed!",
        data: null,
      });
    }
  } catch (error) {
    const errorMessage = error.message || "Unexpected error!";

    console.log("ERROR => ", error)

    res.status(500).json({
      // error: error,
      message: errorMessage,
      data: null,
    });
  }
}
