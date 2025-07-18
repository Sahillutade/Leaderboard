import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ClaimHistory() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        setHistory([]); // Reset before fetch
        setError(null); // Clear previous error

        axios.get(`https://leaderboard-1bon.onrender.com/history/${params.id}`)
            .then(response => {
                console.log("History response:", response.data);

                // Handle both possible response formats
                const claims = Array.isArray(response.data)
                    ? response.data
                    : response.data?.data || [];

                setHistory(claims);
            })
            .catch(err => {
                console.error("Error fetching claim history:", err);
                setError("Could not load claim history.");
            });
    }, [params.id]);

    return (
        <div>
            <div style={{
                margin: '40px 100px 20px 100px',
                textAlign: 'center',
                backgroundColor: 'gold',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '10px'
            }}>
                <h3>Claim History</h3>
            </div>

            <div style={{ margin: '0 100px' }}>
                <table border="1" style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Received Points</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr><td colSpan="2">{error}</td></tr>
                        ) : history.length > 0 ? (
                            history.map((claim, index) => (
                                <tr key={claim._id || index}>
                                    <td>{claim.points}</td>
                                    <td>{new Date(claim.claimedAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="2">No claim history found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
