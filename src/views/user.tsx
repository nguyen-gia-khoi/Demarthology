import React from 'react';
import { User } from '../models/user';

interface UserViewProps {
  users: User[];
  onUserSelect?: (user: User) => void;
  onUserEdit?: (user: User) => void;
  onUserDelete?: (userId: string) => void;
  showActions?: boolean;
  layout?: 'list' | 'grid' | 'table';
  className?: string;
}

const UserView: React.FC<UserViewProps> = ({
  users,
  onUserSelect,
  onUserEdit,
  onUserDelete,
  showActions = true,
  layout = 'list',
  className = ''
}) => {
  // Render different layouts
  const renderUserItem = (user: User) => (
    <div 
      key={user.id} 
      className="border p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onUserSelect?.(user)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        {showActions && (
          <div className="flex gap-2 ml-4">
            {onUserEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUserEdit(user);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            {onUserDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUserDelete(user.id);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderListLayout = () => (
    <div className="space-y-3">
      {users.map(renderUserItem)}
    </div>
  );

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(renderUserItem)}
    </div>
  );

  const renderTableLayout = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            {showActions && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onUserEdit && (
                      <button
                        onClick={() => onUserEdit(user)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    {onUserDelete && (
                      <button
                        onClick={() => onUserDelete(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (users.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-400 text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No users found</h3>
        <p className="text-gray-500">Start by adding some users to see them here.</p>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users ({users.length})</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">Layout:</span>
          <select 
            className="text-sm border rounded px-2 py-1"
            onChange={(e) => console.log('Layout changed to:', e.target.value)}
          >
            <option value="list">List</option>
            <option value="grid">Grid</option>
            <option value="table">Table</option>
          </select>
        </div>
      </div>

      {layout === 'list' && renderListLayout()}
      {layout === 'grid' && renderGridLayout()}
      {layout === 'table' && renderTableLayout()}
    </div>
  );
};

export default UserView;
