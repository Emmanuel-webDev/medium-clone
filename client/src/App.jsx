import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import Write from './pages/Write';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Error from './pages/Error';
import Layout from './components/Layout';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>} >
            <Route path='/' element={<Home/>} />
            <Route path='newstory' element={<Write/>} />
            <Route path='signup' element={<SignUp/>} />
            <Route path='LogIn' element={<LogIn/>} />
            <Route path='*' element={<Error/>} />
          </Route>
        </Routes>
      </BrowserRouter>

      <div className='flex justify-center items-center'>

        <ToastContainer className='text-center w-[100px] h-[50px]'/>
      </div>
    </>
  )
}

export default App
