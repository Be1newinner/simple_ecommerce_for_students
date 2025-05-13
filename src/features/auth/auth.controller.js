const { loginUserService, registerUserService } = require("./auth.service");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginUserService(email, password);

    res.status(200).json({
      error: null,
      message: "User logged in successfully!",
      data: user,
    });

  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        error: "No User Found!",
        message: "User Login Failed!",
        data: null,
      });
    }

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Invalid email or password!",
        data: null,
      });
    }

    console.log("ERROR => ", error);
    res.status(500).json({
      message: error.message || "Unexpected error!",
      data: null,
    });
  }
}

async function registerController(req, res) {
  try {
    const user = await registerUserService(req.body);

    res.status(200).json({
      error: null,
      message: "User registered successfully!",
      data: user,
    });

  } catch (error) {
    console.log("ERROR => ", error);
    res.status(500).json({
      message: error.message || "Unexpected error!",
      data: null,
    });
  }
}

module.exports = {
  loginController,
  registerController
};
