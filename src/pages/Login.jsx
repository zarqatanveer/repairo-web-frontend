import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    useEffect(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }, [])
    const handleInputChange = (event) => {
        setFormData((currData) => {
            return {
                ...currData,
                [event.target.name]: event.target.value
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok){
              localStorage.setItem("token",data.token)
              localStorage.setItem('role', data.user.role)
              console.log("login successful,token saved")
              if (data.user.role === 'customer') {
                navigate('/vehicles/mine')
              } else if (data.user.role === 'shopOwner') {
                navigate('/shops/mine')
              }
              else {
               console.log('Unknown role:', data.user.role)
              }
            }
            else {
              console.log("login failed:",data)
            }
          
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-bold text-text-primary mb-6">Login</h1>

            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label><br />
            <input
                placeholder="enter email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label><br />
            <input
                placeholder="enter password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <button className="w-full bg-primary text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition font-medium">Submit</button>

            <p className="text-sm text-text-secondary mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-primary-light hover:underline transition">Register</Link>
            </p>
            
        </form>
        </div>
        
    );
}

export default Login;