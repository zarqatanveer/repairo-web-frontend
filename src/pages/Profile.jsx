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
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <form onSubmit={handleSubmit}
            className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary mb-6">My Profile</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
                <p className="text-sm text-text-secondary">Email</p>
                <p className="text-text-primary">{form.email}</p>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-text-secondary">Role</p>
                <p className="text-text-primary capitalize">{form.role}</p>
            </div>

            <label 
            htmlFor="name" 
            className="block text-sm font-medium text-text-secondary mb-1"> name </label>
            <input 
            placeholder="enter name"
            value={form.name}
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
            </input>

            <label 
            htmlFor="phone"
            className="block text-sm font-medium text-text-secondary mb-1">phone </label>
            <input
            placeholder="enter phone"
            value={form.phone}
            onChange={handleInputChange}
            type="text"
            id="phone"
            name="phone"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
            </input>

            <button className="w-full bg-primary text-white py-2 rounded hover:opacity-90 font-medium active:scale-[0.98] transition"
            >Save Changes</button>
        </form>
        </div>
    )
}

export default Profile

