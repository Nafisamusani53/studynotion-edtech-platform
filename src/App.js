import {useEffect} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from './components/common/Navbar';
import OTP from './components/core/Auth/OTP';
import Template from './components/core/Auth/Template';
import OpenRoute from './components/core/Auth/OpenRoute';
import Dashboard from './pages/Dashboard';
import Profile from './components/core/DashboardPage/Profile';
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Settings from './components/core/DashboardPage/Settings/Settings';
import EditProfile from './components/core/DashboardPage/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './services/operations/profileOperatins';





function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
  },[])
  return (
    <div className="flex min-h-screen min-w-screen flex-col bg-richblack-900 font-inter" >
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path="/about" element = {<About/>}></Route>
        <Route path="/contact" element ={<ContactUs/>}></Route>
        <Route path='/signup' element ={<OpenRoute><Signup/></OpenRoute>}></Route>
        <Route path='/login' element ={<OpenRoute><Login/></OpenRoute>}></Route>
        <Route path='/verify-email' element = {<OpenRoute><OTP/></OpenRoute>}/>
        <Route path='/template' element = {<Template/>}/>
        <Route element = {<PrivateRoute><Dashboard/></PrivateRoute>}>
          {/* open route for all user */}
          <Route path='dashboard/profile' element={<Profile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
