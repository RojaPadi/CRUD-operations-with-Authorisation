import config from '../config/config';

import User from '../models/user.model';


import tokenService from '../services/token.service';

import respUtil from '../utils/resp.util';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {

  let user, token;
  req.i18nKey = 'loginError';

  // check email from user datbase
  if (req.body.entityType === config.commonRole.user) {
    req.entityType = 'user';
    req.activityKey = 'userLoginSuccess';
    user = await User.findUniqueEmail(req.body.email);

    // compare authenticate password for employee
    if (!user || !user.authenticate(req.body.password)) {
      return res.json(respUtil.getErrorResponse(req));
    }

    req.i18nKey = 'userWaStatusMessage';
    if (user.status === config.commonStatus.Pending) {
      return res.json(respUtil.getErrorResponse(req));
    }
    req.user = user;
  }
  req.i18nKey = 'loginSuccessMessage';

  // remove exisisting token and save new token
  await tokenService.removeTokenAndSaveNewToken(req);
  res.json(respUtil.loginSuccessResponse(req));
}

async function logout(req, res, next) {
  req.i18nKey = 'logoutMessage';
  // check login type user/employee
  if (req.body.type === config.commonRole.employee) {
    req.activityKey = 'employeeLogout';
  } else {
    req.activityKey = 'userLogout';
  }
  res.json(respUtil.logoutSuccessResponse(req));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default {
  login,
  getRandomNumber,
  logout
};
