import React from 'react';
import UserController from '../controllers/user';
import UserView from '../views/user';

export const userRoutes = [
  {
    path: '/users',
    element: <UserController />
  },
  {
    path: '/users/view',
    element: <UserView users={[]} />
  },
  {
    path: '/users/create',
    element: <div>Create User Form</div>
  },
  {
    path: '/users/:id',
    element: <div>User Detail</div>
  },
  {
    path: '/users/:id/edit',
    element: <div>Edit User Form</div>
  }
];
