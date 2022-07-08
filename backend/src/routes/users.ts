import Router from 'koa-router';
import {
  registerUser,
  loginUser,
  logoutUser,
  viewUser,
  token,
} from '../controllers/users';

const router: Router = new Router({
  prefix: '/user',
});

//* register for account
router.post('/register', registerUser);

//* login to account
router.post('/login', loginUser);

//* view account details
router.get('/account', viewUser);

//* logout of account
router.delete('/logout', logoutUser);

//* refresh access token
router.post('/token', token);

export default router;
