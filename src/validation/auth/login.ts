import * as yup from 'yup';

export interface FormLoginValues {
    username: string;
    password: string;
}

const loginSchema: yup.ObjectSchema<FormLoginValues> = yup.object().shape({
  username: yup
      .string()
      .required('Vui lòng điền tên đăng nhập')
      .test('regex-email', 'Email không đúng định dạng', (value: string) => {
          const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return regexEmail.test(value);
      }),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});
export default loginSchema