import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext) //state is details of user
    const history = useHistory()
    const renderList = ()=>{
      if(state){
        return [
          <li><Link to="/profile">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608644600/logos/Profile_vd3snf.ico" 
                weight="30px" height="30px"
            ></img>
            {/* Profile */}
          </Link></li>,

          <li><Link to="/create">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608645252/logos/Create_xm963o.png" 
                weight="30px" height="30px"
            ></img>
            {/* Create Post */}
          </Link></li>,

          <li><Link to="/myfollowingpost">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608645772/logos/MyFollowing_iqz6sz.ico" 
                weight="30px" height="30px"
            ></img>
            {/* My Following Posts */}
          </Link></li>,
          <li>
            {/* <button className="btn #c62828 red darken-3" 
                onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }
            }> */}
              <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608643733/logos/Logout_wjo3i7.ico" 
                weight="30px" height="30px"
                onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }
            }
              ></img>
              {/* Logout */}
            {/* </button> */}
          </li>
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
          <Link to={state?"/":"/signin"} className="brand-logo left"> 
          <img class="brand-icon" src="https://res.cloudinary.com/db957qd0z/image/upload/v1608642945/logos/SpreadIn_mngm54.ico" 
              weight="40px" height="40px"
          ></img>
          {/* SpreadIn   */}
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        </nav>
      </div>
    )
}

export default NavBar