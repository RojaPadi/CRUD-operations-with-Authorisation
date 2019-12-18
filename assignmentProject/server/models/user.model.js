import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import crypto from 'crypto';
import mongooseFloat from 'mongoose-float';
const Float = mongooseFloat.loadType(mongoose);

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date
  },
  photo: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    city: {
      type: String
    },
    zip: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    street: {
      type: String
    },
    district: {
      type: String
    },
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  createdByName: {
    type: String
  },
  createdBy: {
    employee: {
      type: Schema.ObjectId,
      ref: 'Employee'
    }
  },
  updatedBy: {
    employee: {
      type: Schema.ObjectId,
      ref: 'Employee'
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  status: {
    type: String,
    default: 'Active'
  },
  active: {
    type: Boolean,
    default: true
  }
},
  {
    usePushEach: true
  });

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    let result = owasp.test(this.password);
    if (result.errors.length) {
      let error = result.errors.join(' ');
      this.invalidate('password', error);
    }
  }

  next();
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.methods = {
  /**
  * Create instance method for authenticating user
  * @param {password}
  */
  authenticate(password) {
    return this.password === this.hashPassword(password);
  },

  /**
  * Create instance method for hashing a password
  * @param {password}
  */
  hashPassword(password) {
    if (this.salt && password) {
      return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
      return password;
    }
  }
};


UserSchema.statics = {

  /**
   * save and update User
   * @param User
   * @returns {Promise<User, APIError>}
   */
  save(user) {
    return user.save()
      .then((user) => {
        if (user) {
          return user;
        }
        let req = {};
        const err = new APIError('error in user', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });

  },

  /**
 * List user in descending order of 'createdAt' timestamp.
 * @returns {Promise<user[]>}
 */
  list(query) {
    return this.find(query.filter)
      .sort(query.sorting)
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .exec();
  },

  /**
   * Count of user records
   * @returns {Promise<user[]>}
   */
  totalCount(query) {
    return this.find(query.filter)
      .count();
  },
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<user, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        let req = {};
        const err = new APIError('No such user exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
  },

  /**
   * Find unique email.
   * @param {string} email.
   * @returns {Promise<User[]>}
   */
  findUniqueEmail(email) {
    email = email.toLowerCase();
    return this.findOne({
      email: email,
      active: true
    })
      .exec()
      .then((user) => user);
  },
  /**
  * get lastOneMonthData  records
  * @returns {Promise<question[]>}
  */
  lastOneMonthData(query) {
    return this.aggregate(query)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
}

export default mongoose.model('User', UserSchema);
