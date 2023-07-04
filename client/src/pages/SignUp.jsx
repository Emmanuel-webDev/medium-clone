import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { signup, reset } from '../features/Authentication/userSlice';


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const { fullname, email, password } = formData;

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



  const signUpUser = (e) => {
    e.preventDefault();

    const userData = {
      fullname,
      email,
      password
    }

    dispatch(signup(userData));

    // console.log("Hello");
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

      <form className='signup flex  flex-col text-center justify-center items-center gap-4 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[50vh] md:h-[65vh]  lg:h-[65vh] shadow-blue-900 shadow'

        onSubmit={signUpUser}
      >
        {/* Fullname,email,password */}

        <h3 className='text-gray-500 font-bold'>Sign up to tell your stories and interact with blog posts!</h3>

        <div >

          <input
            type="text"
            name="fullname"
            className='text-center font-semibold p-1 border-gray-500 border-[1px] rounded-md w-[70vw] md:w-[50vw] lg:w-[30vw]'

            placeholder='Enter Your Name'
            onChange={handleChange}
            value={formData.fullname}
          />
        </div>

        <div>

          <input
            type="email"
            name="email"
            className='text-center font-semibold border-gray-500 border-[1px] rounded-md p-1 w-[70vw] md:w-[50vw] lg:w-[30vw]'

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

        {/* Signup */}
        <div>
          <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-xl w-[12rem]'>Sign Up</button>
        </div>

      </form>
    </div>
  )
}

export default SignUp
