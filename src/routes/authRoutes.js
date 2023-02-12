const Router = require('express').Router;
const router = Router();
const { createUser, getToken, validateToken } = require('../controllers/authControllers');
router.post('/user', createUser);
router.post('/login', getToken);
router.get('/token/validate', validateToken);

module.exports = router;
