// import { auth } from 'express-oauth2-jwt-bearer';
const { auth } = require('express-oauth2-jwt-bearer');

const authMiddleware = auth({
  audience: 'https://book-store-api',
  issuerBaseURL: `https://dev-7txjr4h7f68rlivl.us.auth0.com/`,
});

//export default authMiddleware;
module.exports = authMiddleware;
