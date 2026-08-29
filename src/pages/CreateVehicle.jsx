import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"

function CreateVehicle(){
    const {id}=useParams()
    const navigate= useNavigate()
    const isEditMode = Boolean(id);

    const [form,setForm]= useState({
        type:"",
        color:"",
        year:"",
        plateNumber:""
    })
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (isEditMode) {
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setForm(data))
    }
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }
    
    
    const handleSubmit=async (event)=>{
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        try {
            let response
            if (isEditMode){
           response=await fetch(
            `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(form)
                }
            )
        }
        else{
           response= await fetch(
            `${import.meta.env.VITE_API_URL}/api/vehicles`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(form)
            }
        )
        }
        
        if (response.ok) {
        navigate('/vehicles/mine')
    } else {
        setError("Failed to save vehicle")
        setIsSubmitting(false)
        }

        }
        catch(err){setError("something went wrong check your connection")
            setIsSubmitting(false)
        }
    }

    
    return(
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label htmlFor="type">Type</label><br />
            <input
                placeholder="enter type"
                type="text"
                value={form.type}
                onChange={handleInputChange}
                id="type"
                name="type"
            />

            <br /><br />
            <label htmlFor="color">Color</label><br />
            <input
                placeholder="enter color"
                type="text"
                value={form.color}
                onChange={handleInputChange}
                id="color"
                name="color"
            />

            <br /><br />
            <label htmlFor="year">Year</label><br />
            <input
                placeholder="enter year"
                type="number"
                value={form.year}
                onChange={handleInputChange}
                id="year"
                name="year"
            />

            <br /><br />
            <label htmlFor="plateNumber">PlateNumber</label><br />
            <input
                placeholder="enter plateNumber"
                type="text"
                value={form.plateNumber}
                onChange={handleInputChange}
                id="plateNumber"
                name="plateNumber"
            />
              
            <br></br>
            <button disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Submit'}
            </button>


        </form>
    )
}

export default CreateVehicle