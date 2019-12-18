import express from 'express';

import activityRoutes from './activity.route';

import userRoutes from './user.route';

import authRoutes from './auth.route';


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


// mount activity routes at /activities
router.use('/activities', activityRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

export default router;
