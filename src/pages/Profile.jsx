import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Profile(){
    const navigate=useNavigate()
    const [error, setError] = useState(null)
    const [form,setForm]=useState({
        name:"",
        phone:""
    })
     useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>res.json())
        .then(data=>setForm(data))
       } ,[])

    const handleInputChange=(event)=>{
        setForm((currData)=>{
            return {
                ...currData,[event.target.name]:event.target.value
            }
        })
    }

    const handleSubmit=async (event)=>{
        event.preventDefault()
        setError(null)
        try{
            const response= await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    name: form.name,
                    phone: form.phone
                })
            })
            if (response.ok){
                navigate("/profile");
            }
            else {
              setError("Filed to update profile")
            }
        }
        catch(err){
            setError("Something went wrong")
        }

    }

               
    return(
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label htmlFor="name"> name </label><br></br>
            <input 
            placeholder="enter name"
            value={form.name}
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            ></input>
            <br></br>

            <label htmlFor="phone">phone </label><br></br>
            <input
            placeholder="enter phone"
            value={form.phone}
            onChange={handleInputChange}
            type="text"
            id="phone"
            name="phone"></input>
            <br></br><br></br>

            <button>Submit</button>
        </form>
    )
}

export default Profile

    

    


