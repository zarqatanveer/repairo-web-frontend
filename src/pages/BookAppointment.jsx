import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"

function BookAppointment(){
    const navigate=useNavigate()
    const {shopId}=useParams()
    const [form,setForm] = useState({
        serviceId:"",
        vehicleId:"",
        date:""
    })
    const [error,setError]=useState(null)
    const [services,setServices]=useState([])
    const [vehicles,setVehicles]=useState([])
    const [isSubmitting,setIsSubmitting]=useState(false)

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/services/shop/${shopId}`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response=>response.json())
        .then (data=>setServices(data))
        .catch (err=> setError("couldnot load services"))

        fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/mine`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response=>response.json())
        .then (data=>setVehicles(data))
        .catch (err=> setError("couldnot load vehicles"))

    },[shopId])

     const handleInputChange=(event)=>{
        const {name,value}=event.target
        setForm(prev=>({...prev,[name]:value}))
    } 

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        try{
            const response=await fetch (
                `${import.meta.env.VITE_API_URL}/api/bookings`,{
                    method:'POST',
                    headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify({ ...form, shopId })
                }
            )

            if (response.ok) {
                navigate(`/bookings/mine`)
            } else {
                setError("Failed to save appointment")
                setIsSubmitting(false)
            }
        }
        catch(err){
            setError("something went wrong check your connection")
            setIsSubmitting(false)
        }
    }   
    return(
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <form onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
            <h1 className="text-2xl font-bold text-text-primary mb-6">
                    Book Appointment
                </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <label htmlFor="serviceId" className="block text-sm font-medium text-text-secondary mb-1">Service</label>
                <select name="serviceId" 
                value={form.serviceId} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition">
                    <option value="">-- Select a service --</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                        {service.name} — Rs {service.price} — {service.duration} min
                    </option>
                ))}
                </select>

<label htmlFor="vehicleId" className="block text-sm font-medium text-text-secondary mb-1">Service</label>
                <select name="vehicleId" 
                value={form.vehicleId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition">
                   <option value="">-- Select a vehicle --</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.type} —  {vehicle.color} —  {vehicle.plateNumber} 
                    </option>
                ))}
                </select>
            

                <label htmlFor="date"
                className="block text-sm font-medium text-text-secondary mb-1">Date</label>
                <input placeholder="enter date and time"
                type="datetime-local"
                value={form.date}
                onChange={handleInputChange}
                id="date"
                name="date"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition">   
                </input>
                

                <button 
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90 active:scale-[0.98] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition">
                    {isSubmitting? "Saving" : "Submit"}
                </button>  
            </form>
        </div>
        
    )
}

export default BookAppointment