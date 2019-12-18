import User from '../models/user.model'

import i18nUtil from '../utils/i18n.util';
import respUtil from '../utils/resp.util';
import serviceUtil from '../utils/service.util';
import sessionUtil from '../utils/session.util';
/**
 * Load User and append to req.
 * @param req
 * @param res
 * @param next
 */

async function load(req, res, next) {
  req.user = await User.get(req.params.userId);
  return next();
}

/**
 * Get User
 * @param req
 * @param res
 * @returns {details: user}
 */

async function get(req, res) {
  req.query = await serviceUtil.generateListQuery(req);
  let user = req.user;
  user.password = undefined
  user.salt = undefined
  let responseJson = {
    respCode: respUtil.getDetailsSuccessResponse().respCode,
    details: user
  };
  return res.json(responseJson);
}

/**
 * Create new user
 * @param req
 * @param res
 * @returns { respCode: respCode, respMessage: respMessage }
 */
async function create(req, res) {
  let user = new User(req.body);
  //check email exists or not
  const uniqueEmail = await User.findUniqueEmail(user.email);
  if (uniqueEmail) {
    req.i18nKey = 'emailExists';
    return res.json(respUtil.getErrorResponse(req));
  }
  req.user = await User.save(user);
  req.user.password = req.user.salt = undefined;
  req.entityType = 'user';
  req.activityKey = 'userCreate';
  return res.json(respUtil.createSuccessResponse(req));
}



/**
* Get user list. based on criteria
* @param req
* @param res
* @param next
* @returns {users: users, pagination: pagination}
*/
async function list(req, res, next) {
  let responseJson = {};
  const query = {};
  if (query.page === 1) {
    // total count
    query.pagination.totalCount = await User.totalCount(query);
  }
  //get user records
  const users = await User.list(query);
  users.password = undefined
  users.salt = undefined
  responseJson.respCode = respUtil.getDetailsSuccessResponse().respCode;
  responseJson.users = users;
  responseJson.pagination = query.pagination;
  return res.json(responseJson);
}


/**
 * Update existing user
 * @param req
 * @param res
 * @param next
 * @returns { respCode: respCode, respMessage: respMessage }
 */
async function update(req, res, next) {
  let user = req.user;
  user = Object.assign(user, req.body);
  req.user = await User.save(user);
  req.entityType = 'user';
  return res.json(respUtil.updateSuccessResponse(req));
}

/**
 * Delete user.
 * @param req
 * @param res
 * @param next
 * @returns { respCode: respCode, respMessage: respMessage }
 */
async function remove(req, res, next) {
  let user = req.user;
  user.active = false;
  req.user = await User.save(user);
  req.entityType = 'user';
  return res.json(respUtil.removeSuccessResponse(req));
}

export default {
  create,
  list,
  get,
  load,
  update,
  remove
};
