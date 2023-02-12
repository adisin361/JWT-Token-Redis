const bcrypt = require('bcrypt');
const db = require('../../database/models/index');
const jwt = require('jsonwebtoken');
const redisUtil = require('../util/redisUtil');
const createUser = async (username, password) => {

  if (await db.Users.findOne({ where: { username } })) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.Users.create({
    username,
    password: hashedPassword
  });

  // dataValues - inbuilt sequelize method
  delete user.dataValues.password;
  return user;
};

const getToken = async (username, password) => {
  const user = await db.Users.findOne({ where: { username } });
  if (!user) {
    throw new Error('Username does not exist');
  }
  const userData = user.dataValues;
  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    throw new Error('Password is incorrect');
  }
  const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET);
  redisUtil.set(token);
  return token;
};

const validateToken = async (token) => {

  token = token.replace('Bearer ', '');

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error || !decoded) {
        reject(error);
      }
      const redisToken = await redisUtil.get();
      console.log(redisToken);
      console.log(token);
      if (redisToken !== token) {
        throw new Error('Unauthorized User');
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  createUser,
  getToken,
  validateToken
};




