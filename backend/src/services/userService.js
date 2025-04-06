import userRepository from '../repositories/userRepository.js';
import User from '../models/user.js';

export default {
  getAll: async () => {
    return await userRepository.all();
  },

  create: async (userData) => {
    const { valid, errors } = await User.validate(userData);
    if (!valid) {
      return { errors: errors };
    }

    const newUser = new User(userData);
    return await userRepository.create(newUser);
  },

  update: async (userId, userData) => {
    const user = new User(await userRepository.findById(userId));
    const { valid, errors, updatableRows } = await User.validate(
      userData,
      true
    );
    if (!valid) {
      return { errors: errors };
    }

    const updateUser = new User({
      id: user.id,
      username: updatableRows.username || user.username,
      email: updatableRows.email || user.email,
      password: updatableRows.password || user.password,
      avatar: updatableRows.avatar || user.avatar,
      updatedAt: new Date(),
    });

    return await userRepository.update(updateUser);
  },

  delete: async (userId) => {
    return await userRepository.delete(userId);
  },
};
