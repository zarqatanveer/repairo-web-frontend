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
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Browse Shops</h1>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {shops.map((shop)=>(
                <div 
                key={shop._id} className="bg-surface rounded-lg shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between">
                    <p className="text-lg font-semibold text-text-primary mb-1" >{shop.name}</p>
                    <p className="text-text-secondary mb-4 capitalize">{shop.location}</p>
                    <button 
                    onClick={()=>navigate(`/shops/${shop._id}`)}
                    className="w-full bg-primary-light text-white py-2 rounded hover:opacity-90 text-sm font-medium active:scale-[0.98] transition"
                        >View Shop </button>
                </div>
            ))}
            </div>
            
        </div>
        
        </div>
        
    )
}

export default BrowseShop

   