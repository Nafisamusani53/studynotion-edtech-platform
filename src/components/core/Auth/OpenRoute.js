import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom';

const OpenRoute = ({children}) => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  if(token === null ){
    return children;
  }
  else{
    return (<Navigate to={"/dashboard/profile"}/>)
  }
}

export default OpenRoute
