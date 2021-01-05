import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = ()=>{
    const searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
    const {state,dispatch} = useContext(UserContext) //state is details of user
    const history = useHistory()
    useEffect(()=>{
      M.Modal.init(searchModal.current)
    },[])
    const renderList = ()=>{
      if(state){
        return [
          <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>
            {/* search */}
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1609792765/logos/Search_jaeuqj.ico" 
                weight="25px" height="25px"
            ></img>
            </i>
          </li>,
          <li key="2"><Link to="/profile">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608644600/logos/Profile_vd3snf.ico" 
                weight="30px" height="30px"
            ></img>
            {/* Profile */}
          </Link></li>,

          <li key="3"><Link to="/create">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608645252/logos/Create_xm963o.png" 
                weight="30px" height="30px"
            ></img>
            {/* Create Post */}
          </Link></li>,

          <li key="4"><Link to="/myfollowingpost">
            <img class="nav-icon"
                src="https://res.cloudinary.com/db957qd0z/image/upload/v1608645772/logos/MyFollowing_iqz6sz.ico" 
                weight="30px" height="30px"
            ></img>
            {/* My Following Posts */}
          </Link></li>,
          <li key="5">
            {/* <button className="btn #c62828 red darken-3" 
                onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }
            }> */}
              <img class="nav-logout-icon"
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
          <li key="6"><Link to="/signin">Signin</Link></li>,
          <li key="7"><Link to="/signup">Signup</Link></li>
        ]
      }
    }

    const fetchUsers = (query)=>{
      setSearch(query)
      fetch('/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        setUserDetails(results.user)
      })
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
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
            <input 
              type="text" 
              placeholder="search user" 
              value={search}
              onChange={(e)=>fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map(item=>{
                return <Link to={item._id !== state._id ? "/profile/"+item._id:"/profile"} onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch('')
                }}><li className="collection-item">{item.email}</li></Link> 
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button  className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
          </div>
        </div>
        </nav>
      </div>
    )
}

export default NavBar