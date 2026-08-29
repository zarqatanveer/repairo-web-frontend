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
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label><br />
            <input
                placeholder="enter email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
                name="email"
            />

            <br /><br />
            <label htmlFor="password">Password</label><br />
            <input
                placeholder="enter password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                id="password"
                name="password"
            />

            <br /><br />
            <button>Submit</button>

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
}

export default Login;