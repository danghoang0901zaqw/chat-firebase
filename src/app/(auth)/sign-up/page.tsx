'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import { auth } from '@/firebase/config';
import { addDocument } from '@/firebase/services';
import { defaultAvatar } from '@/utils/constaint';
import signUpSchema, { FormSignUpValues } from '@/validation/auth/signUp';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignUp = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignUpValues>({
        resolver: yupResolver(signUpSchema),
        defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSignUp = async (data: FormSignUpValues) => {
        try {
           
            setLoading(true);
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await addDocument('users', {
                displayName: data.username,
                email: user.email,
                photoURL: defaultAvatar,
                uid: user.uid,
                providerId: user.providerId,
            });
            setLoading(false);
            router.push('/login');
        } catch (error: any) {
            let msgError = 'Đăng ký tài khoản thất bại';
            if (error.includes('(auth/email-already-in-use)')) {
                msgError = 'Tài khoản này đã tồn tại';
            }
            toast.error(msgError);
            setLoading(false);
        }
    };

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
                    <Button className="w-full" primary disabled={loading}>
                        {loading ? <Loading /> : 'Đăng ký'}
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
