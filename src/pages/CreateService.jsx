import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"

function CreateService(){
    const navigate=useNavigate()
    const {shopId,id}=useParams()
    const isEditMode = Boolean(id)
    const [error,setError]=useState(null)
    const [isSubmitting,setIsSubmitting]=useState(false)

    const [form,setForm]=useState({
        name:"",
        price:"",
        duration:""
    })

    useEffect(()=>{
       if (isEditMode){
        fetch(`${import.meta.env.VITE_API_URL}/api/services/${id}`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>res.json())
        .then(data=>setForm(data))
    }} ,[id])

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
           if (isEditMode){
            response=await fetch (
                `${import.meta.env.VITE_API_URL}/api/services/${id}`,{
                    method:'PATCH',
                    headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(form)
                }
            )}
            else{ response=await fetch(
                `${import.meta.env.VITE_API_URL}/api/services`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({...form,shopId})
                }
            )}
        
            if (response.ok) {
                navigate(`/shop/${form.shopId || shopId}/services`)
            } else {
                setError("Failed to save service")
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
                <label htmlFor="name">Name</label><br></br>
                <input placeholder="enter service name"
                type="text"
                value={form.name}
                onChange={handleInputChange}
                id="name"
                name="name"></input>
                <br></br><br></br>

                <label htmlFor="price">Price</label><br></br>
                <input placeholder="enter price"
                type="number"
                value={form.price}
                onChange={handleInputChange}
                id="price"
                name="price"></input>
                <br></br><br></br>

                <label htmlFor="duration">Duration(minutes)</label><br></br>
                <input placeholder=""
                type="number"
                value={form.duration}
                onChange={handleInputChange}
                id="duration"
                name="duration"></input>
                <br></br><br></br>

                <button disabled={isSubmitting}>{isSubmitting? "Saving" : "Submit"}
                </button>   
        </form>
        </div>
    )       
}
    
       
export default CreateService