import { useState } from 'react';
import { ResetPasswordFormData, AuthResponse, FormValidationErrors } from '../models/auth';

export const useResetPasswordController = (token: string) => {
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        token,
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormValidationErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const updateField = (field: keyof ResetPasswordFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validatePassword = (password: string): string[] => {
        const issues = [];
        if (password.length < 8) {
            issues.push('Mật khẩu phải có ít nhất 8 ký tự');
        }
        if (!/[A-Z]/.test(password)) {
            issues.push('Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa');
        }
        if (!/[0-9]/.test(password)) {
            issues.push('Mật khẩu phải chứa ít nhất 1 chữ số');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            issues.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
        }
        return issues;
    };

    const validateForm = (): boolean => {
        const newErrors: FormValidationErrors = {};

        if (!formData.token) {
            newErrors.token = 'Token không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu mới là bắt buộc';
        } else {
            const passwordIssues = validatePassword(formData.password);
            if (passwordIssues.length > 0) {
                newErrors.password = passwordIssues[0]; // Show first issue
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (): Promise<AuthResponse> => {
        if (!validateForm()) {
            return { success: false, message: 'Vui lòng kiểm tra lại thông tin' };
        }

        setIsLoading(true);

        try {
            // Simulate API call for reset password
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For demo purposes, simulate success/failure based on token
            if (token && token.length > 10) {
                return { 
                    success: true, 
                    message: 'Mật khẩu đã được đặt lại thành công! Bạn sẽ được chuyển đến trang đăng nhập.' 
                };
            } else {
                return { 
                    success: false, 
                    message: 'Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.' 
                };
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' 
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        updateField,
        handleSubmit
    };
};