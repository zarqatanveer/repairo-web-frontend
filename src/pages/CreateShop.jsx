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
        <div>
            <form onSubmit={handleSubmit}>
                 {error && <p>{error}</p>}
                <label htmlFor="name">Name</label><br></br>
                <input placeholder="enter name"
                type="text"
                value={form.name}
                onChange={handleInputChange}
                id="name"
                name="name"></input>
                <br></br><br></br>

                <label htmlFor="location">Location</label><br></br>
                <input placeholder="enter location"
                type="text"
                value={form.location}
                onChange={handleInputChange}
                id="location"
                name="location"></input>

                <br></br><br></br>
                <button disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Submit'}
                 </button>
            </form>
        </div>
    )
}

export default CreateShop




   




    