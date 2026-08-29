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
        <div>
            <form onSubmit={handleSubmit}><br></br>
            {error && <p>{error}</p>}
                <label htmlFor="rating">Choose a rating:</label>
                <select 
                id="rating" 
                name="rating"
                value={form.rating} 
                onChange={handleInputChange}>
                    <option value="">-- Select a rating --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="comment">Comment</label><br></br>
                <input placeholder="enter comment"
                type="text"
                value={form.comment}
                onChange={handleInputChange}
                id="comment"
                name="comment"></input>
                <br></br><br></br>

                <button disabled={isSubmitting}>{isSubmitting? "Saving" : "Submit"}
                </button>   
        </form>
        </div>
    )   
    } 
    
    
       
export default CreateReview