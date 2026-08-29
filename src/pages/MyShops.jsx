import { useState,useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function MyShops(){
    const [shops,setShops]=useState([])
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem("token")
        fetch(`${import.meta.env.VITE_API_URL}/api/shops/mine`,{
            headers:{"Authorization": `Bearer ${token}`}
        })
        .then(response=>response.json())
        .then(data=>setShops(data))
        .catch(err=>setError("Couldnot load shops"))
    },[])
    return (
        <div>
            <h1>My Shops</h1>
            {error && <p>{error}</p>}
            <br></br>
            {shops.map((shop)=>(
                <div key={shop._id}>
                    <br></br>
                    <p>{shop.name}</p>
                    <p>{shop.location}</p>
                    <button onClick={()=>navigate(`/shops/${shop._id}/edit`)}>Edit Shop</button>
                    <br></br>
                    <button onClick={()=>navigate(`/shop/${shop._id}/services`)}>Manages Services</button>
                    <br></br>
                    <button onClick={()=>navigate(`/shop/${shop._id}/bookings`)}>See Appointment</button>
                </div>
            ))}
             <br></br>
              <button onClick={()=>navigate(`/shops/add`)}>Add Shop</button>  
              <br></br>
        </div>
    )
}
export default MyShops


                
                    
            
            