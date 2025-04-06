import { describe, it, expect } from 'vitest';
import userService from '../src/services/userService.js';

const testUser = {
  username: 'test',
  email: 'RZB2O@example.com',
  password: 'test',
};

describe('User Service', () => {
  it('should create a user', async () => {
    const user = await userService.create({
      username: Math.random().toString(36).substring(2, 10),
      email: `${Math.random().toString(36).substring(2, 10)}@test.com`,
      password: 'test',
    });
    testUser.id = user.data.id;
    expect(user).toBeDefined();
  });

  it('should return a token', async () => {
    const token = await userService.login({
      email: testUser.email,
      password: testUser.password,
    });
    expect(token).toBeDefined();
  });

  it('should update a user', async () => {
    const random = Math.random().toString(36).substring(2, 10);
    const user = await userService.update(testUser.id, { username: random });
    expect(user).contains({ username: random });
  });

  it('should delete a user', async () => {
    const user = await userService.delete(testUser.id);
    expect(user).contains({ success: 'User deleted' });
  });

  it('should get user', async () => {
    const user = await userService.me(testUser.id);
    expect(user).toBeDefined();
  });

  it('should get all users', async () => {
    const users = await userService.getAll();
    expect(users).toBeDefined();
  });
});
