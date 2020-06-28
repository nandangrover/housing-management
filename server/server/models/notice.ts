/**
 * Define model for Notice
 */

import mongoose from 'mongoose';

/**
 * Notice Schema
 */
const noticeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Notice', noticeSchema);
