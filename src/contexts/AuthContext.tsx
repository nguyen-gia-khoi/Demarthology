import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {AuthService} from '../services';
import {AuthUser, LoginCredentials} from '../types';
import {AuthUtils} from '../utils';

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const authService = AuthService.getInstance();

    const isAuthenticated = !!user && AuthUtils.isAuthenticated();

    // Check for existing authentication on mount
    useEffect(() => {
        const initializeAuth = async () => {
            if (AuthUtils.isAuthenticated()) {
                try {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                } catch (error) {
                    console.error('Failed to get current user:', error);
                    AuthUtils.clearTokens();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, [authService]);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        setIsLoading(true);
        try {
            const loginResponse = await authService.login(credentials);

            // Convert UserInfo from login response to AuthUser for consistency
            const authUser: AuthUser = {
                id: 'user-' + Date.now(),
                email: loginResponse.user.email,
                name: `${loginResponse.user.firstName} ${loginResponse.user.lastName}`,
                role: loginResponse.user.role || 'user',
                permissions: ['read', 'write'],
                avatarUrl: '/avatar.webp'
            };

            setUser(authUser);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    const refreshAuth = async (): Promise<void> => {
        if (AuthUtils.isAuthenticated()) {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Failed to refresh auth:', error);
                setUser(null);
                AuthUtils.clearTokens();
            }
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};