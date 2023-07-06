import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { login, reset } from '../features/Authentication/userSlice';

const LogIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  const { userAuth, loading, error, success, message } = useSelector((store) => store.userAuth)

  useEffect(() => {

    if (error) {
      toast.error(message);
    }

    if (success) {
      navigate('/');
    }

    dispatch(reset());

  }, [userAuth, loading, error, message, success, navigate, dispatch]);

  const LoginUser = (e)=>{
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData));
  }

  if (loading) {
    
    return (
      <>
        <div className='flex gap-3'>

          <div className='animate-ping border-blue-500 border-1px '>
            <div className='w-3 h-3 bg-blue-500 rounded-[50%]'></div>
          </div>

          <div className='animate-ping border-green-500 border-1px '>
            <div className='w-3 h-3 bg-green-500 rounded-[50%]'></div>
          </div>

          <div className='animate-ping border-purple-500 border-1px '>
            <div className='w-3 h-3 bg-purple-500 rounded-[50%]'></div>
          </div>

        </div>
      </>
    )
  }

  return (
    <div className='grid place-items-center'>

      <div className="signup-image w-52 ">
        <img src="/Images/SignUp_Medium_Logo.webp" alt="signup-image-logo" />
      </div>

      {error && error.message}

      <form className='signup flex  flex-col text-center justify-center items-center gap-4 w-[80vw] md:w-[60vw] lg:w-[35vw] h-[65vh] md:h-[65vh]  lg:h-[50vh] shadow-blue-900 shadow'

        onSubmit={LoginUser}
      >
        {/* email,password */}

        <h3 className='text-gray-500 font-bold'>Login to continue to tell your stories and interact with blog posts!</h3>

        <div>

          <input
            type="email"
            name="email"
            className='text-center font-semibold border-gray-500 border-[1px] rounded-md p-1 w-[70vw] md:w-[50vw] lg:w-[30vw] focus:border-blue-500 focus:border-[1px]'

            id="email"
            placeholder='Enter an E-mail'
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div>

          <input
            type="password"
            name="password"
            className='text-center font-semibold border-gray-500 border-[1px] rounded-md p-1 w-[70vw] md:w-[50vw] lg:w-[30vw]'
            autoComplete='on'

            placeholder='Enter your password'
            onChange={handleChange}
            value={formData.password}
          />

        </div>

        {/* Login Button */}
        <div>
          <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-xl w-[12rem] mt-6'>Login</button>
        </div>

        <div>
         <span className='font-bold text-gray-500'> No Account? </span> <Link to='/signup' className='text-green-400 font-bold underline'>Create One</Link> 
        </div>

      </form>
    </div>
  )
}

export default LogIn
