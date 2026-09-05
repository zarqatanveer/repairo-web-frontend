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
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary mb-6">
                    {isEditMode ? 'Edit Vehicle' : 'Add Vehicle'}
                </h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                <input
                    placeholder="enter type"
                    type="text"
                    value={form.type}
                    onChange={handleInputChange}
                    id="type"
                    name="type"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="color" className="block text-sm font-medium text-text-secondary mb-1">Color</label>
                <input
                    placeholder="enter color"
                    type="text"
                    value={form.color}
                    onChange={handleInputChange}
                    id="color"
                    name="color"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="year" className="block text-sm font-medium text-text-secondary mb-1">Year</label>
                <input
                    placeholder="enter year"
                    type="number"
                    value={form.year}
                    onChange={handleInputChange}
                    id="year"
                    name="year"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="plateNumber" className="block text-sm font-medium text-text-secondary mb-1">Plate Number</label>
                <input
                    placeholder="enter plateNumber"
                    type="text"
                    value={form.plateNumber}
                    onChange={handleInputChange}
                    id="plateNumber"
                    name="plateNumber"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <button
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-2 rounded hover:opacity-90 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {isSubmitting ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default CreateVehicle