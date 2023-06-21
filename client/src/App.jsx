import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='write' element={<Write/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
