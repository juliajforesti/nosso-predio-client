import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoutes = ({component: Component, user, ...rest}) => {

  console.log(user)
  return (
    <Route {...rest} render={(props) => {
      if (user) {
        return <Component {...props} user={user} />
      } else {
        return <Redirect to={{pathname:'/login', state:{from:props.location}}} />
      }
    }} />
  )
}

export default ProtectedRoutes;