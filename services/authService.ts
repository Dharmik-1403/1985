
import { User } from '../types';

// This service simulates a backend connecting to a MySQL database.
// Since we are in a browser environment, we use localStorage to mock the 'users' table.

const SIMULATED_NETWORK_DELAY = 800;
const DB_TABLE_USERS = 'mysql_simulated_users_table';

export const loginUser = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Mock Query: SELECT * FROM users WHERE email = ? AND password = ?
        const usersRaw = localStorage.getItem(DB_TABLE_USERS);
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          console.log('[MySQL] Connection successful. User found.');
          resolve({ id: user.id, name: user.name, email: user.email, profileImage: user.profileImage });
        } else {
          console.warn('[MySQL] Query returned no results for credentials.');
          reject(new Error('Invalid email or password.'));
        }
      } catch (err) {
        reject(new Error('Database connection failed.'));
      }
    }, SIMULATED_NETWORK_DELAY);
  });
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Mock Query: SELECT id FROM users WHERE email = ?
        const usersRaw = localStorage.getItem(DB_TABLE_USERS);
        const users = usersRaw ? JSON.parse(usersRaw) : [];

        if (users.find((u: any) => u.email === email)) {
          reject(new Error('A user with this email already exists.'));
          return;
        }

        // Mock Query: INSERT INTO users ...
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          password, // In a real app, this MUST be hashed!
          profileImage: undefined
        };

        users.push(newUser);
        localStorage.setItem(DB_TABLE_USERS, JSON.stringify(users));
        
        console.log(`[MySQL] INSERT INTO users VALUES (${newUser.id}, ${newUser.name}, ${newUser.email}) - SUCCESS`);
        
        resolve({ id: newUser.id, name: newUser.name, email: newUser.email });
      } catch (err) {
        reject(new Error('Database insert failed.'));
      }
    }, SIMULATED_NETWORK_DELAY);
  });
};

export const updateUser = async (updatedUser: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Mock Query: UPDATE users SET ... WHERE id = ?
        const usersRaw = localStorage.getItem(DB_TABLE_USERS);
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        
        const index = users.findIndex((u: any) => u.id === updatedUser.id);
        
        if (index !== -1) {
          // Preserve password, update other fields
          users[index] = { ...users[index], ...updatedUser };
          localStorage.setItem(DB_TABLE_USERS, JSON.stringify(users));
          console.log(`[MySQL] UPDATE users SET name='${updatedUser.name}'... WHERE id=${updatedUser.id}`);
          resolve(updatedUser);
        } else {
          reject(new Error('User not found.'));
        }
      } catch (err) {
        reject(new Error('Failed to update profile.'));
      }
    }, SIMULATED_NETWORK_DELAY);
  });
};
