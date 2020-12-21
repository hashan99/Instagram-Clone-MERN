import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId, //postId:postId
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    //homework
    // const deleteComment = (postid)=>{
    //     fetch(`/deletecomment/${postid}`,{
    //         method:"delete",
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         const newData = data.filter(item=>{
    //             return item._id !== result._id
    //         })
    //         setData(newData)
    //     })
    // }

    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <div>
                                {/* <img style={{ width: "25px", height: "25px", borderRadius: "50px", float:"left"}}
                                    src={state ? state.pic : "loading"}
                                    src={item.postedBy.pic}
                                /> */}
                                <h6 style={{ padding: "6px" }}>
                                    <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"} >{item.postedBy.name}</Link>
                                    {item.postedBy._id == state._id && <i className="material-icons" style={{ float: "right" }}
                                        onClick={() => { deletePost(item._id) }}
                                    >delete</i>}
                                </h6>
                            </div>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons"
                                        onClick={() => { unlikePost(item._id) }}
                                    >thumb_down</i>
                                    :
                                    <i className="material-icons"
                                        onClick={() => { likePost(item._id) }}
                                    >thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}
                                                <i className="material-icons" style={{ float: "right" }}
                                                // onClick={ () => { deletePost(item._id)}}
                                                >more_vert</i>
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }


            {/* <div className="card home-card">
                <h6>Uththara Himansi</h6>
                <div className="card-amage">
                    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDF8fHdhbGxwYXBlcnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                    <h6>Snow Mountain Under Stars</h6>
                    <p>A star is an astronomical object consisting of a luminous spheroid of plasma held together by its own gravity. The nearest star to Earth is the Sun.</p>
                    <input type="text" placeholder="add a comment" />
                </div>
            </div>

            <div className="card home-card">
                <h6>Shehan Sandeepa</h6>
                <div className="card-amage">
                    <img src="https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHdhbGxwYXBlcnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                    <h6>Glacier Near Body of Water</h6>
                    <p>A glacier is a persistent body of dense ice that is constantly moving under its own weight. A glacier forms where the accumulation of snow exceeds its ablation over many years, often centuries.</p>
                    <input type="text" placeholder="add a comment" />
                </div>
            </div> */}

        </div>
    )
}

export default Home