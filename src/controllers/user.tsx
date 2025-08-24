import React, { useState, useEffect } from 'react';
import { UserService } from '../services/user';
import { User } from '../models/user';

const UserController: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const userService = new UserService();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await userService.fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    const newUser = await userService.createUser({
      name: 'New User',
      email: 'newuser@example.com'
    });
    setUsers([...users, newUser]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Controller</h2>
      <button 
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add User
      </button>
      {loading && <p className="mt-2">Loading...</p>}
      <div className="mt-4">
        <h3 className="font-semibold">Users ({users.length}):</h3>
        <ul className="mt-2">
          {users.map(user => (
            <li key={user.id} className="text-sm">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserController;
