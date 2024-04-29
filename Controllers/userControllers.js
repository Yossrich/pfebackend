


const User = require('../Models/userModel.js');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req, res) => {
  const { name, ID, password, email, role } = req.body;

  try {
    const user = await User.signup(name, email, ID, password, role);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { ID, password } = req.body;

  try {
    const { token, role } = await User.login(ID, password);
    res.status(200).json({ token, role });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };

/*module.exports = {
  getUsers,
  loginUser,
  logoutUser,
  updateProfile,
  deleteAccount,
  uploadImage,
  searchUsers,
  followUser,
  unfollowUser,
  checkFollowing,
  isValidPassword,
  resetPasswordRequest,
  validateResetPasswordToken,
  resetPassword,
  googleLogin,
  githubLogin,
  facebookLogin,
  twitterLogin,
  serializeUser,
  signupUser
};*/