export const ROUTES = {
  HOME: '/',
  USERS: '/users',
  USER_LIST: '/users',
  USER_VIEW: '/users/view',
  USER_CREATE: '/users/create',
  USER_DETAIL: '/users/:id',
  USER_EDIT: '/users/:id/edit',
  
} as const;

// Navigation items configuration
export const NAV_ITEMS = [
  {
    path: ROUTES.USERS,
    label: 'Users',
    icon: '👥',
    description: 'Manage user accounts'
  },
  ] as const;
