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
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
            
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-text-primary">Services</h1>
             <button 
             onClick={()=>navigate(`/shop/${id}/services/add`)}
             className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 active:scale-[0.98] transition font-medium">
                + Add Service</button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service)=>(
                <div 
                key={service._id}
                className="bg-surface rounded-lg hover:shadow-xl transition shadow-md p-5">
                    <p className="text-lg font-semibold text-text-primary capitalize">{service.name}</p>
                    <p className="text-text-secondary">Rs {service.price}</p>
                    <p className="text-text-secondary mb-4">{service.duration} min</p>

                    <div className="flex gap-3">
                    <button 
                    onClick={()=>navigate(`/services/${service._id}/edit`)}
                    className="flex-1 bg-primary-light text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition text-sm font-medium">
                    Edit Service</button>
                
                    <button 
                    onClick={() => handleDelete(service._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 active:scale-[0.98] transition text-sm font-medium">
                    Delete Service</button>
                    </div> 
                </div>
            ))}
            </div>
            
            
        </div>
        </div>
        
    )
}               
export default ManageServices


        
            
                   

                
                

                
                    
            
            