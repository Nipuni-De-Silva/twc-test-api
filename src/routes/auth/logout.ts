import express, { Request, Response, Router} from 'express';
const router: Router = express.Router();

router.post('/', function(req, res, next) {
  console.log('Route: (logout)')
  //1. remove cookies
  res.clearCookie('token');
  //2. redirect to login screen
  res.redirect('/login')
});

module.exports = router;