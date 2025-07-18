import axios from "axios";
import { useEffect, useState } from "react";

export function LeaderBoard(){

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:3030/leaderboard")
            .then(response => {
                console.log("Leaderboard response:", response.data);
                setUsers(response.data);
            })
            .catch(err => {
                console.error("Error fetching leaderboard:", err);
                setError("Could not load leaderboard.");
            });
    }, []);

    return(
        <div>
            <div style={{marginLeft:'100px',marginRight:'100px',marginTop:'40px',textAlign:'center',backgroundColor:'gold',color:'#ffffff',borderRadius:'10px',paddingTop:'10px',paddingBottom:'10px'}}>
                <h3>Leaderboard</h3>
            </div>
            <div style={{marginLeft:'100px',marginRight:'100px',marginTop:'30px'}}>
                {error ? (
                    <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
                ) : users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={user._id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '15px 20px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }}>
                            <div>
                                #{index + 1} &nbsp; {user.username}
                            </div>
                            <div style={{ color: '#007b00' }}>
                                {user.totalpoints} points
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center' }}>No users found.</div>
                )}
            </div>
        </div>
    )
}