import React from 'react'

const Profile = ()=>{
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1551712702-4b7335dd8706?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>Uththara Himansi</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>191 Posts</h6>
                        <h6>1000 Followers</h6>
                        <h6>762 Following</h6>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            </div>
        </div>
    )
}

export default Profile