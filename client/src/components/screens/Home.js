import React,{useState,useEffect} from 'react'

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result=>{
            // console.log(result)
            setData(result.posts)
        })
    },[])

    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h6>{item.postedBy.name}</h6>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add a comment" />
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