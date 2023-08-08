import { registerUser } from '@/actions/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state:any) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    marketingAccept: false,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isValidEmail = (email:any) => {
    // Biểu thức chính quy kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của email trước khi đăng ký
    

    // Kiểm tra tính hợp lệ của mật khẩu trước khi đăng ký
    
    
    if (formData.firstName == "") {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập tên của bạn.');
      return;
    }
    if (formData.lastName == "") {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập Họ của bạn.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }
    if (formData.password.length < 6) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (formData.password !==  formData.passwordConfirmation) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Xác nhận mật khẩu không chính xác.');
      return;
    }

    // Gửi thông tin đăng ký lên server nếu không có lỗi
    dispatch(registerUser(formData));
  };

  const [errorMessage, setErrorMessage] = useState(''); 

  return (
    <div>
<section className="bg-white bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section
      className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="Night"
        src="data:image/jpeg;base64,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"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="/">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
            href="/"
          >
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Tên đệm
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Nhập tên của bạn"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Họ
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nhập họ của bạn"
            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập password của bạn"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Nhập passwordConfirmation của bạn"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="marketingAccept" className="flex items-center">
            <input
              type="checkbox"
              id="marketingAccept"
              name="marketingAccept"
              checked={formData.marketingAccept}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              Tôi muốn nhận email về các sự kiện, cập nhật sản phẩm và thông báo của công ty.
            </span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </div>
        {errorMessage && (
      <div className="text-red-500">
        <p>{errorMessage}</p>
      </div>
    )}
    {user && (
      <div className="text-green-500">
        <p>
          Đăng ký thành công! Chào mừng {user.firstName} {user.lastName}!
        </p>
      </div>
    )}
      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
             Bạn đã có tài khoản?
              <a href="signin" className="text-gray-700 underline"> Đăng nhập</a>.
            </p>
      </form>
      </div>
    </main>
  </div>
</section>
    </div>
  );
};

export default SignUp;

