/**
 * File containing all user queries, mutations and subscriptions
 */

import { PubSub } from 'apollo-server';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import User from '../../models/user';
import { transformUser } from './merge';

const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';

/**
 * User Queries
 */
const UserQueries = {
  users: async (parent, args, context) => {
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }
    try {
      const users = await User.find();
      return users.map((user) => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  user: async (parent, { userId }, context) => {
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }
    try {
      const user = await User.findById(userId);
      return transformUser(user);
    } catch (err) {
      throw err;
    }
  }
};

/**
 * User Mutations
 */
const UserMutation = {
  createUser: async (parent: any, { userInput }: any) => {
    try {
      const user = await User.findOne({
        email: userInput.email
      });
      if (user) {
        throw new Error('User already Exists');
      } else {
        console.log(userInput.password);
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: userInput.email,
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          flat: userInput.flat,
          permissions: ['member'],
          password: await bcrypt.hash(userInput.password, 10)
        });
        const savedUser = await newUser.save();
        pubsub.publish(USER_ADDED, {
          userAdded: transformUser(savedUser)
        });
        const token = jwt.sign(
          {
            userId: savedUser.id,
            name: savedUser.get('firstName'),
            permissions: savedUser.get('permissions')
          },
          config.jwtSecret,
          {
            expiresIn: '1d'
          }
        );
        return {
          userId: savedUser.id,
          token,
          tokenExpiration: 1
        };
      }
    } catch (error) {
      throw error;
    }
  },
  login: async (parent, { email, password }) => {
    try {
      const user: any = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not Exists');
      }

      const valid: boolean = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          name: user.firstName,
          permissions: user.permissions
        },
        config.jwtSecret,
        {
          expiresIn: '1d'
        }
      );
      return {
        userId: user.id,
        token,
        tokenExpiration: 1
      };
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (parent, { userId, updateUser }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }
    try {
      const user = await User.findByIdAndUpdate(userId, updateUser, {
        new: true
      });
      return transformUser(user);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const UserSubscription = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator([USER_ADDED])
  }
};

export { UserQueries, UserMutation, UserSubscription };
