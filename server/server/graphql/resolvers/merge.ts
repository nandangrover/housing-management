/**
 * Primary file for extracting proper schema structured objects
 */

import dateToString from '../../helpers/date';
import Notice from '../../models/notice';
import User from '../../models/user';

/**
 * Get user object with schema typing
 * @param id
 */
const getUser = async (id: string): Promise<object> => {
  try {
    const user: any = await User.findById(id);
    return {
      ...user._doc,
      _id: user.id,
      createdAt: dateToString(user._doc.createdAt),
      updatedAt: dateToString(user._doc.updatedAt)
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get notice object with schema typing
 * @param id
 */
const getNotice = async (id: string): Promise<object> => {
  try {
    const notice: any = await Notice.findById(id);
    return {
      ...notice._doc,
      _id: notice.id,
      createdAt: dateToString(notice._doc.createdAt),
      updatedAt: dateToString(notice._doc.updatedAt)
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get all notices for a particular user
 * @param id
 */
const getUserNotices = async (userId: string): Promise<object> => {
  try {
    const notices: any = await Notice.find({ userId });
    return notices.map((notice) => {
      return transformNotice(notice);
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Get user object with schema typing
 * @param user
 */
const transformUser = async (user: any): Promise<object> => {
  return {
    ...user._doc,
    _id: user.id,
    notices: getUserNotices(user.id),
    createdAt: dateToString(user._doc.createdAt),
    updatedAt: dateToString(user._doc.updatedAt)
  };
};

/**
 * Get notice object with schema typing
 * @param notice
 */
const transformNotice = async (notice: any): Promise<object> => {
  return {
    ...notice._doc,
    _id: notice.id,
    user: getUser(notice.userId),
    createdAt: dateToString(notice._doc.createdAt),
    updatedAt: dateToString(notice._doc.updatedAt)
  };
};

export { getUser, getNotice, getUserNotices, transformUser, transformNotice };
