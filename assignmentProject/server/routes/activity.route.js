import express from 'express';
import asyncHandler from 'express-async-handler';

import activityCtrl from '../controllers/activity.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/activities - Get list of activities */
  .get(asyncHandler(activityCtrl.list))

  /** POST /api/activities - Create new activities */
  .post(asyncHandler(activityCtrl.create));

router.route('/:activityId')
  /** GET /api/activities/:activityId - Get activities */
  .get(asyncHandler(activityCtrl.get))

  /** PUT /api/activities/:activityId - Update activities */
  .put(asyncHandler(activityCtrl.update))

  /** DELETE /api/activities/:activityId - Delete activities */
  .delete(asyncHandler(activityCtrl.remove));

/** Load activity when API with activityId route parameter is hit */
router.param('activityId', asyncHandler(activityCtrl.load));

export default router;
