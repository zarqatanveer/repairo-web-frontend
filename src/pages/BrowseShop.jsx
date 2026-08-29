import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

function BrowseShop(){
    const [shops,setShops]=useState([])
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
            fetch (`${import.meta.env.VITE_API_URL}/api/shops`)
        .then(res =>res.json())
        .then(data=>setShops(data))
        .catch(err=>setError("Couldnot load shops"))
        
    },[])
      
    return(
        <div>
            <h1>Browse Shops</h1>
            {error && <p>{error}</p>}
            {shops.map((shop)=>(
                <div key={shop._id}>
                    <p>{shop.name}</p>
                    <p>{shop.location}</p>
                    <button onClick={()=>navigate(`/shops/${shop._id}`)}>View Shop Detail</button>
                    <br></br><br></br>
                </div>
            ))}
        </div>
    )
}

export default BrowseShop
