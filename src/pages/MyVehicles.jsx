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
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-text-primary">My Vehicles</h1>
                    <button
                        onClick={()=>navigate(`/vehicles/add`)}
                        className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 active:scale-[0.98] transition font-medium"
                    >
                        + Add Vehicle
                    </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {vehicles.map((vehicle)=>(
                        <div key={vehicle._id} className="bg-surface rounded-lg hover:shadow-xl transition shadow-md p-5">
                            <p className="text-lg font-semibold text-text-primary capitalize">{vehicle.type}</p>
                            <p className="text-text-secondary">{vehicle.color} · {vehicle.year}</p>
                            <p className="text-text-secondary mb-4">{vehicle.plateNumber}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={()=>navigate(`/vehicles/${vehicle._id}/edit`)}
                                    className="flex-1 bg-primary-light text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(vehicle._id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 active:scale-[0.98] transition text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyVehicles