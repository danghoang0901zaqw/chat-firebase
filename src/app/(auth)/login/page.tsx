'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import { auth, facebookProvider, googleProvider } from '@/firebase/config';
import { addDocument } from '@/firebase/services';
import loginSchema, { FormLoginValues } from '@/validation/auth/login';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: { username: '', password: '' },
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const handleLogin = async (data: FormLoginValues) => {
        try {
            setLoading(true);
            const res: any = await signInWithEmailAndPassword(auth, data.username, data.password);
            Cookies.set('token', res.user.accessToken)
            router.push('/')
        } catch (error: any) {
            toast.error('Tài khoản hoặc mật khẩu không chính xác');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithFacebook = async () => {
        try {
            const { user, _tokenResponse }: any = await signInWithPopup(auth, facebookProvider);
            Cookies.set('token', user.accessToken)
            router.push('/')
            const isNewUser = _tokenResponse?.isNewUser;
            if (isNewUser) {
                await addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: _tokenResponse.providerId,
                });
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại');
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            const { user, _tokenResponse }: any = await signInWithPopup(auth, googleProvider);
            const isNewUser = _tokenResponse?.isNewUser;
            Cookies.set('token', user.accessToken)
            router.push('/')
            if (isNewUser) {
                await addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: _tokenResponse.providerId,
                });
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại');
        }
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
                    <Button primary disabled={loading} onClick={handleSubmit(handleLogin)} className="w-full">
                        {loading ? <Loading /> : 'Đăng nhập'}
                    </Button>
                </div>
            </form>
            <div className="flex items-center gap-3 mt-2">
                <hr className="w-full bg-gray-200" />
                <p className="text-center font-medium">Hoặc</p>
                <hr className="w-full bg-gray-200" />
            </div>
            <div className="w-full flex items-center justify-center gap-3">
                <div
                    onClick={handleLoginWithFacebook}
                    className="w-12 h-12 rounded-full border border-primary flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-all"
                >
                    <Image
                        src="/images/brands/facebook.png"
                        alt="facebook"
                        width={36}
                        height={36}
                        className="object-cover"
                    />
                </div>
                <div
                    onClick={handleLoginWithGoogle}
                    className="w-12 h-12 rounded-full border border-primary flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-all"
                >
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
