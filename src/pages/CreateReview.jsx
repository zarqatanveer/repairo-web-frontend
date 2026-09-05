import { useState } from "react"
import { useNavigate,useParams } from "react-router-dom"

function CreateReview(){
    const navigate=useNavigate()
    const {bookingId}=useParams()
    const [error,setError]=useState(null)
    const [isSubmitting,setIsSubmitting]=useState(false)

    const [form,setForm]=useState({
        rating:"",
        comment:"",
    })

     const handleInputChange=(event)=>{
        const {name,value}=event.target
        setForm(prev=>({...prev,[name]:value}))
    } 

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        try{
           const response=await fetch(
                `${import.meta.env.VITE_API_URL}/api/reviews`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({...form,bookingId})
                }
            )
        if (response.ok) {
                navigate(`/bookings/mine`)
            } else {
                setError("Failed to save review")
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

                <h1 className="text-2xl font-bold text-text-primary mb-6">Enter Review</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
                <label htmlFor="rating"
                 className="block text-sm font-medium text-text-secondary mb-1">Choose a rating:</label>
                <select 
                id="rating" 
                name="rating"
                value={form.rating} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition">
                    <option value="">-- Select a rating --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="comment"
                 className="block text-sm font-medium text-text-secondary mb-1">Comment</label>
                <input placeholder="enter comment"
                type="text"
                value={form.comment}
                onChange={handleInputChange}
                id="comment"
                name="comment"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition">
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
    
    
       
export default CreateReview
                