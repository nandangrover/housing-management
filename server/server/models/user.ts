/**
 * Define model for user
 */

import mongoose from 'mongoose';

/**
 * User Schema
 */
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    flat: {
      type: String,
      required: true
    },
    permissions: [{
      type: String,
      required: true
    }]
  },
  {
    timestamps: true
  }
);

/**
 * Statics
 */
userSchema.statics = {
  /**
   * Get User
   * @param {ObjectId} id - The objectId of user.
   */
  get(id: string): mongoose.Document {
    return this.findById(id)
      .execAsync()
      .then((user: any) => {
        if (user) {
          return user;
        }
      });
  }
};

/**
 * Methods
 */
userSchema.methods = {};

export default mongoose.model('User', userSchema);
