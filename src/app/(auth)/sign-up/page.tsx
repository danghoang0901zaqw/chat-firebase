'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { auth, db } from '@/firebase/config';
import signUpSchema, { FormSignUpValues } from '@/validation/auth/signUp';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
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
    const router=useRouter()

    const handleSignUp = async (data: FormSignUpValues) => {
        try {
            const defaultAvatar =
                'https://firebasestorage.googleapis.com/v0/b/testting-8959c.appspot.com/o/user.png?alt=media&token=89159008-9028-4ed7-9ae3-b44fb7b4e97d';
            setLoading(true);
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            try {
                await addDoc(collection(db, 'users'), {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: defaultAvatar,
                    uid: user.uid,
                    providerId: user.providerId,
                    active: serverTimestamp(),
                });
                setLoading(false);
                router.push('/login')
            } catch (error) {
                setLoading(false);
            }
        } catch (error) {
            toast.error('Đăng ký tài khoản thất bại');
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
                        {loading ? <Loading/>:'Đăng ký'}
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
