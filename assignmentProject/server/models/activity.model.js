import Promise from 'bluebird';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

import APIError from '../helpers/APIError';
const Schema = mongoose.Schema;
/**
 * Activity Schema
 */
const ActivitySchema = new mongoose.Schema({
  contextId: {
    type: Schema.ObjectId
  },
  contextName: {
    type: Schema.ObjectId
  },
  contextType: {
    type: String
  },
  desc: {
    type: String
  },
  description: {
    type: String
  },
  context: {
    type: String
  },
  key: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  loginFrom: {
    type: String
  },
  createdBy: {
    employee: {
      type: Schema.ObjectId,
      ref: 'Employee'
    },
    name: {
      type: String
    }
  }
});

/**
 * Statics
 */
ActivitySchema.statics = {
  /**
   * save and update activity
   * @param activity
   * @returns {Promise<Activity, APIError>}
   */
  save(activity) {
    return activity.save()
      .then((activity) => {
        if (activity) {
          return activity;
        }
        const err = new APIError('Error in activity', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get activity
   * @param {ObjectId} id - The objectId of activity.
   * @returns {Promise<Activity, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate("createdBy.employee", 'firstName lastName displayName')
      .exec()
      .then((activity) => {
        if (activity) {
          return activity;
        }
        const err = new APIError('No such activity exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List activity in descending order of 'createdAt' timestamp.
   * @returns {Promise<Activity[]>}
   */
  list(query) {
    return this.find(query.filter)
      .populate('createdBy.employee', 'displayName photo')
      .sort(query.sorting)
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .exec();
  },

  historyList(query) {
    return this.find(query.filter, ({ _id: 0, description: 1, createdBy: 1, created: 1 }))
      .populate('createdBy.employee', 'displayName photo')
      .sort(query.sorting)
      .skip(query.page - 1)
      .limit(query.limit)
      .exec();
  },
  /**
   * Count of activity records
   * @returns {Promise<Activity[]>}
   */
  totalCount(query) {
    return this.find(query.filter)
      .count();
  }

};

/**
 * @typedef Activity
 */
export default mongoose.model('Activity', ActivitySchema);
