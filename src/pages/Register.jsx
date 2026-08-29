import { useState } from "react"
import { Link,useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        role:""
    })

    const handleInputChange=(event)=>{
        setFormData((currData)=>{
            return {
                ...currData,[event.target.name]:event.target.value
            }
        })
    }

    const handleSubmit=async (event)=>{
        event.preventDefault()
        try{
            const response= await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    role: formData.role
                })
            })
            
        const data = await response.json();

            if (response.ok){
              console.log("Registration successful! Redirecting to login.");
                navigate("/login");
            }
            else {
              console.log("register failed:",data)
            }
        }
        catch(err){
            console.log(err)
        }

    }

               
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"> name </label><br></br>
            <input 
            placeholder="enter name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            ></input>
            <br></br><br></br><br></br>

            <label htmlFor="email"> email </label><br></br>
            <input
            placeholder="enter email"
            value={formData.email}
            onChange={handleInputChange}
            type="text"
            id="email"
            name="email"></input>
            <br></br><br></br><br></br>

            <label htmlFor="password"> password </label><br></br>
            <input
            placeholder="enter password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            id="password"
            name="password"></input>
            <br></br><br></br><br></br>

            <label htmlFor="phone">phone </label><br></br>
            <input
            placeholder="enter phone"
            value={formData.phone}
            onChange={handleInputChange}
            type="text"
            id="phone"
            name="phone"></input>
            <br></br><br></br><br></br>

            <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="">-- Select role --</option>
                <option value="customer">Customer</option>
                <option value="shopOwner">Shop Owner</option>
            </select>
            <br></br><br></br><br></br>
            <button>Submit</button>

            <p>
           Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    )
}

export default Register

    

    


