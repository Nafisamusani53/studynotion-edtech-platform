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
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './services/operations/profileOperatins';
import { ACCOUNT_TYPE } from './utils/constant';
import Settings from './components/core/DashboardPage/Settings';
import CreateCourse from './components/core/DashboardPage/CreateCourse';
import { getAllCategories } from './services/operations/categoriesOperation';
import MyCourse from './components/core/DashboardPage/MyCourse/MyCourse';
import EditCourse from './components/core/DashboardPage/EditCourse';
import Catalog from './pages/Catalog';





function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile)

  useEffect(()=>{
    dispatch(getAllCategories());
    
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
        <Route path= '/catalog/:categoryName' element = {<Catalog/>}/>
        <Route element = {<PrivateRoute><Dashboard/></PrivateRoute>}>
          {/* open route for all user */}
          <Route path='dashboard/profile' element={<Profile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>

          {/* only for instructor */}
          {
            user && user.role === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path='dashboard/create-course' element={<CreateCourse/>}/>
              <Route path='dashboard/my-courses' element={<MyCourse/>}/>
              <Route path = 'dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              </>
              
            )
          }

        </Route>
      </Routes>
    </div>
  );
}

export default App;
