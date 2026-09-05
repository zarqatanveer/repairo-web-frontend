import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

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
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary mb-6">Register</h1>

                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input
                placeholder="enter name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                placeholder="enter email"
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                <input
                placeholder="enter password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                <input
                placeholder="enter phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="text"
                id="phone"
                name="phone"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <label htmlFor="role" className="block text-sm font-medium text-text-secondary mb-1">Role</label>
                <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    <option value="">-- Select role --</option>
                    <option value="customer">Customer</option>
                    <option value="shopOwner">Shop Owner</option>
                </select>

                <button className="w-full bg-primary text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition font-medium">
                    Submit
                </button>

                <p className="text-sm text-text-secondary mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-primary-light hover:underline transition">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register

            
    
    