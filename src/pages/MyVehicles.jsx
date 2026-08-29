import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyVehicles(){
    const navigate = useNavigate();
    const [vehicles,setVehicles]=useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
    fetchVehicles()
    }, [])

    const fetchVehicles = () => {
    const token = localStorage.getItem("token")
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/mine`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => setVehicles(data))
        .catch(err => setError("couldn't load vehicles"))
    } 

    const handleDelete = async (vehicleId) => {
    const confirmed = window.confirm("Are you sure you want to delete this vehicle?")
    if (!confirmed) return

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (response.ok) {
            fetchVehicles()
        } else {
            setError('Failed to delete vehicle')
        }
    } catch (err) {
        setError('Something went wrong')
    }
}


    return(
        <div>
            <h1>My Vehicles</h1>
            {error && <p>{error}</p>}
            <br></br>
            {vehicles.map((vehicle)=>(
                <div key={vehicle._id}>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.color}</p>
                    <p>{vehicle.year}</p>
                    <p>{vehicle.plateNumber}</p> 
            <button onClick={()=>navigate(`/vehicles/${vehicle._id}/edit`)}>Edit Vehicle</button><br></br>
            <button onClick={() => handleDelete(vehicle._id)}>Delete Vehicle</button>
            <br></br><br></br>
                </div>
            ))}
          <button onClick={()=>navigate(`/vehicles/add`)}>Add Vehicle</button>  
            </div>
    )
}

export default MyVehicles
                
                    
            
            