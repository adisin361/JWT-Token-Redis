const authServices = require('../services/authServices');

const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    const user = await authServices.createUser(username, password);
    res.status(201).send(user);
  }

  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

const getToken = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    const token = await authServices.getToken(username, password);
    res.status(200).json({
      status: 'success',
      token
    });
  }

  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

const validateToken = async (req, res) => {
  try {
    const { token } = req.query;
    const valid = await authServices.validateToken(token);
    res.status(200).json({
      status: 'success',
      message: 'user verified',
      data: valid
    });
  }

  catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getToken,
  validateToken
};