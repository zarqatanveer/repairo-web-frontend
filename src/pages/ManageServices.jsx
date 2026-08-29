import {  useEffect, useState} from "react"
import { useNavigate,useParams } from "react-router-dom"

function ManageServices(){
    const {id}=useParams()
    const navigate= useNavigate()
    const [services,setServices]=useState([])
    const [error,setError]=useState(null)

    useEffect(() => {
    fetchServices()
    }, [id])

    const fetchServices = () => {
    const token = localStorage.getItem("token")
    fetch(`${import.meta.env.VITE_API_URL}/api/services/shop/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => setServices(data))
        .catch(err => setError("couldn't load services"))
    } 

    const handleDelete = async (serviceId) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?")
    if (!confirmed) return
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services/${serviceId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (response.ok) {
            fetchServices()
        } else {
            setError('Failed to delete service')
        }
    } catch (err) {
        setError('Something went wrong')
    }
}
    return(
        <div>
            <h1>Service</h1>
            {error && <p>{error}</p>}
            {services.map((service)=>(
                <div key={service._id}>
                    <br></br>
                    <p>{service.name}</p>
                    <p>{service.price}</p>
                    <p>{service.duration}min</p>
                    <button onClick={()=>navigate(`/services/${service._id}/edit`)}>Edit Service</button>
                    <br></br>
                    <button onClick={() => handleDelete(service._id)}>Delete Service</button>
                    <br></br>
                </div>
            ))}
            <br></br>
             <button onClick={()=>navigate(`/shop/${id}/services/add`)}>Add Service</button>
        </div>
    )
}               
export default ManageServices


                
                    
            
            