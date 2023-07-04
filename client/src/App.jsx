import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import Write from './pages/Write';
import SignUp from './pages/SignUp'


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='write' element={<Write/>} />
          <Route path='signup' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
    </>
  )
}

export default App
