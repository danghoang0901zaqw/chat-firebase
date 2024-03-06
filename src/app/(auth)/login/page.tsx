'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormLoginValues {
    username: string;
    password: string;
}

const Login = () => {
    const validationSchema: yup.ObjectSchema<FormLoginValues> = yup.object().shape({
        username: yup
            .string()
            .required('Vui lòng điền tên đăng nhập')
            .test('regex-email', 'Email không đúng định dạng', (value: string) => {
                const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return regexEmail.test(value);
            }),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: { username: '', password: '' },
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = (data: FormLoginValues) => {
        console.log(data);
    };
    return (
        <div className="h-full w-full flex flex-col gap-2 p-3 pt-10 md:p-10">
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-3">
                <h3 className="text-center text-3xl font-semibold">Đăng nhập tài khoản</h3>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                type="text"
                                placeholder="Tên đăng nhập"
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
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
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
                <div className="w-full flex gap-2 mt-4">
                    <Button className="w-full" to="/sign-up" outline>
                        Đăng ký
                    </Button>
                    <Button onClick={handleSubmit(handleLogin)} className="w-full" primary>
                        Đăng nhập
                    </Button>
                </div>
            </form>
            <div className="flex items-center gap-3 mt-2">
                <hr className="w-full bg-gray-200" />
                <p className="text-center font-medium">Hoặc</p>
                <hr className="w-full bg-gray-200" />
            </div>
            <div className="w-full flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-all">
                    <Image
                        src="/images/brands/facebook.png"
                        alt="facebook"
                        width={36}
                        height={36}
                        className="object-cover"
                    />
                </div>
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-all">
                    <Image
                        src="/images/brands/google.png"
                        alt="google"
                        width={36}
                        height={36}
                        className="object-cover"
                    />
                </div>
            </div>
            <Button text to="/forgot-password" className="text-primary ">
                Quên mật khẩu
            </Button>
            <p className="text-xs text-center font-normal">
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                <span className="text-primary">Điều khoản sử dụng</span> của chúng tôi.
            </p>
        </div>
    );
};

export default Login;
