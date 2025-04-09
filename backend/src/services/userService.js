import userRepository from '../repositories/userRepository.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  login: async (body) => {
    const { email, password } = body;
    if (email === undefined || password === undefined) {
      return { error: 'Email and password are required' };
    }
    const user = await userRepository.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return { token };
    } else {
      return { error: 'Invalid credentials' };
    }
  },

  getAll: async () => {
    return await userRepository.all();
  },

  create: async (userData) => {
    const { valid, errors } = await User.validate(userData);
    if (!valid) {
      return { errors: errors };
    }

    const newUser = new User(userData);
    return {
      success: 'User created',
      data: await userRepository.create(newUser),
    };
  },

  update: async (userId, userData) => {
    let user = await userRepository.findById(userId);

    if (!user) {
      return { error: 'User not found' };
    }

    user = new User(user);

    const { valid, errors, updatableRows } = await User.validate(
      userData,
      true
    );

    if (!valid) {
      return { errors };
    }
    const updateUser = new User({
      id: user.id,
      username: updatableRows.username || user.username,
      email: updatableRows.email || user.email,
      password: updatableRows.password || user.password,
      avatar: updatableRows.avatar || user.avatar,
      updatedAt: new Date(),
      role: updatableRows.role || user.role,
    });

    return await userRepository.update(updateUser);
  },

  findById: async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  },

  delete: async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }
    await userRepository.delete(userId);
    return {
      success: 'User deleted',
      data: user,
    };
  },

  me: async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  },
};
