import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"

function CreateShop(){
    const navigate= useNavigate()
    const {id}=useParams()
    const isEditMode = Boolean(id)
    const [error,setError]=useState(null)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [form,setForm]=useState({
        name:"",
        location:""
    })

    useEffect(()=>{
       if (isEditMode){
        fetch(`${import.meta.env.VITE_API_URL}/api/shops/${id}`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>res.json())
        .then(data=>setForm(data))
    }
       } ,[id])

    const handleInputChange=(event)=>{
         const {name,value}=event.target
         setForm(prev=>({...prev,[name]:value}))
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        try{
            let response
            if(isEditMode){
                response=await fetch(
                `${import.meta.env.VITE_API_URL}/api/shops/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(form)
                }
            )}
            else{ response=await fetch(
                `${import.meta.env.VITE_API_URL}/api/shops`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(form)
                }
            )}
        
            if (response.ok) {
                navigate('/shops/mine')
            } else {
                setError("Failed to save shop")
                setIsSubmitting(false)
            }
        }
        catch(err){
            setError("something went wrong check your connection")
            setIsSubmitting(false)
        }
        
    }

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary mb-6">
                    {isEditMode ? 'Edit Shop Info' : 'Add Shop'}
                </h1>

                 {error && <p className="text-red-500 mb-4">{error}</p>}

                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label><br></br>
                <input placeholder="enter name"
                type="text"
                value={form.name}
                onChange={handleInputChange}
                id="name"
                name="name"
                 className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"></input>

                <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                <input placeholder="enter location"
                type="text"
                value={form.location}
                onChange={handleInputChange}
                id="location"
                name="location"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"></input>

            
                <button disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90 active:scale-[0.98] font-medium disabled:opacity-50 transition">
                {isSubmitting ? 'Saving...' : 'Submit'}
                 </button>
            </form>
        </div>
    )
}

export default CreateShop




   




    