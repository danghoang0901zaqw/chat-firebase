'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
interface FormSignUpValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const SignUp = () => {
    const validationSchema: yup.ObjectSchema<FormSignUpValues> = yup.object().shape({
        username: yup.string().required('Vui lòng nhập email'),
        email: yup
            .string()
            .required('Vui lòng nhập email')
            .test('regex-email', 'Email không đúng định dạng', (value: string) => {
                const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return regexEmail.test(value);
            }),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .min(8, 'Mật khẩu phải từ 8 kí tự')
            .test('password', 'Mật khẩu phải gồm chữ hoa, số và kí tự đặc biệt', (value: string) => {
                const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                return regexPassword.test(value);
            }),
        confirmPassword: yup
            .string()
            .required('Vui lòng xác nhận nhập mật khẩu')
            .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignUpValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleSignUp = (data: FormSignUpValues) => {};

    return (
        <div className="h-full w-full flex flex-col gap-2 p-3 pt-10 md:p-10">
            <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-3">
                <h3 className="text-center text-3xl font-semibold">Đăng ký tài khoản</h3>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                type="text"
                                placeholder="Họ và tên của bạn"
                            />
                            {errors.username && (
                                <span className="text-xs text-primary inline-block mt-1">
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                type="text"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <span className="text-xs text-primary inline-block mt-1">{errors.email.message}</span>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                rightIcon={
                                    <FontAwesomeIcon
                                        onClick={() => setShowPassword(!showPassword)}
                                        icon={showPassword ? faEyeSlash : faEye}
                                        size="sm"
                                        className="text-gray-700 hover:text-black"
                                    />
                                }
                            />
                            {errors.password && (
                                <span className="text-xs text-primary inline-block mt-1">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Xác nhận mật khẩu"
                                rightIcon={
                                    <FontAwesomeIcon
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                        size="sm"
                                        className="text-gray-700 hover:text-black"
                                    />
                                }
                            />
                            {errors.confirmPassword && (
                                <span className="text-xs text-primary inline-block mt-1">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                    )}
                />

                <div className="w-full flex gap-2 mt-4">
                    <Button className="w-full" to="/login" outline>
                        Đăng nhập
                    </Button>
                    <Button className="w-full" primary>
                        Đăng ký
                    </Button>
                </div>
            </form>
            <p className="text-xs text-center font-normal mt-2">
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                <span className="text-primary">Điều khoản sử dụng</span> của chúng tôi.
            </p>
        </div>
    );
};

export default SignUp;
