import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoutes = ({component: Component, user, getUser, ...rest}) => {

  return (
    <Route {...rest} render={(props) => {
      if (user) {
        return <Component {...props} user={user} getUser={getUser}/>
      } else {
        return <Redirect to={{pathname:'/login', state:{from:props.location}}} />
      }
    }} />
  )
}

export default ProtectedRoutes;