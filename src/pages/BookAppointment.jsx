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
        <div>
        <form onSubmit={handleSubmit}><br></br>
            {error && <p>{error}</p>}
                <select name="serviceId" 
                value={form.serviceId} 
                onChange={handleInputChange}>
                    <option value="">-- Select a service --</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                        {service.name} — Rs {service.price} — {service.duration} min
                    </option>
                ))}
                </select>
                <br></br><br></br>

                <select name="vehicleId" 
                value={form.vehicleId}
                onChange={handleInputChange}>
                   <option value="">-- Select a vehicle --</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.type} —  {vehicle.color} —  {vehicle.plateNumber} 
                    </option>
                ))}
                </select>
                <br></br><br></br>

                <label htmlFor="date">date</label><br></br>
                <input placeholder="enter date and time"
                type="datetime-local"
                value={form.date}
                onChange={handleInputChange}
                id="date"
                name="date"></input>
                <br></br><br></br>

                <button disabled={isSubmitting}>{isSubmitting? "Saving" : "Submit"}
                </button>  
            </form>
        </div>
        
    )
}

export default BookAppointment