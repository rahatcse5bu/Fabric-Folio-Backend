import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

const authUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Invalid Login Data",
    });
  }

  const user = await User.findOne({ username });
  if (user && (await user.validPassword(password))) {
    res.json({
      _id: user._id,
      username: username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("registerUser req.body: ", req.body);
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Invalid User Data",
    });
  }

  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  console.log("userExists: ", userExists);

  if (userExists || usernameExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = new User({
    username,
    email,
  });
  user.setPassword(password);
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid user data",
    });
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, shopName, password, status } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.shopName = shopName || user.shopName;
    user.status = status || user.status;

    if (password) {
      user.setPassword(password);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}).sort({
      createdAt: -1,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  authUser,
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
