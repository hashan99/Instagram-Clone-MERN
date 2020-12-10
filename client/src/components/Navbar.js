import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext) //state is details of user
    const renderList = ()=>{
      if(state){
        return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create">Create Post</Link></li>
        ]
      }
      else{
        return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
        ]
      }
    }

    return(
      <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper white" style={{color:"Black"}}>
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        </nav>
      </div>
    )
}

export default NavBar