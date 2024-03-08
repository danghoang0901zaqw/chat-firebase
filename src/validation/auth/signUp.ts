import * as yup from 'yup';

export interface FormSignUpValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const signUpSchema: yup.ObjectSchema<FormSignUpValues> = yup.object().shape({
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
export default signUpSchema;
