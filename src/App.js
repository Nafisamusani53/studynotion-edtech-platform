import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter" >
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path="/about" element = {<About/>}></Route>
        <Route path="/contact" element ={<ContactUs/>}></Route>
        <Route path='/signup' element ={<Signup/>}></Route>
        <Route path='/login' element ={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
