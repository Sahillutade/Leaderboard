import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


export function UserSelector()
{
    const [users, setUsers] = useState([]);

    let navigate = useNavigate();

    function handleUsers(){
        axios.get(`http://127.0.0.1:3030/user-list`)
        .then(response => {
            setUsers(response.data);
        });
    }

    function handleClaimHistory(uId){
        navigate(`/History/${uId}`);
    }

    function handleClaim(u){
        axios.post(`http://127.0.0.1:3030/claim/${u}`);
        alert(`Points have been credited to you!`);
    }

    useEffect(() => {
        handleUsers();
    },[])
    return(
        <div>
            <div style={{marginLeft:'100px',marginRight:'100px',marginTop:'40px',textAlign:'center',backgroundColor:'gold',color:'#ffffff',borderRadius:'10px',paddingTop:'10px',paddingBottom:'10px'}}>
                <h3>Users</h3>
            </div>
            <div style={{marginLeft:'100px',marginRight:'100px',marginTop:'30px'}}>
                {
                    users.map(uname => 
                        <div key={uname._id} style={{display:'flex',marginBottom:'20px',justifyContent:'space-between'}}>
                            <div style={{fontSize:'22px',fontWeight:'bold'}}>
                                <span>{uname.username}</span>
                            </div>
                            <div style={{display:'flex'}}>
                                <div style={{marginRight:'50px'}}>
                                    <button key={uname._id} value={uname._id} style={{width:'150px',border:'none',backgroundColor:'yellow',height:'40px',borderRadius:'10px'}} onClick={() => handleClaimHistory(uname._id)}>Claim History</button>
                                </div>
                                <div>
                                    <button key={uname._id} value={uname._id} style={{width:'150px',border:'none',backgroundColor:'#00cc00',height:'40px',borderRadius:'10px'}} onClick={() => handleClaim(uname._id)}>Claim</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}