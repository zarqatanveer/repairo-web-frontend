import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Pencil } from 'lucide-react'

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
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-text-primary">My Shops</h1>
               <button 
               onClick={()=>navigate(`/shops/add`)}
               className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 active:scale-[0.98] transition font-medium">
               + Add Shop</button> 
            </div> 
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {shops.map((shop)=>(
                <div key={shop._id}
                className="bg-surface rounded-lg hover:shadow-xl transition shadow-md p-5 relative">
                    <button 
                    onClick={()=>navigate(`/shops/${shop._id}/edit`)}
                    className="absolute top-4 right-4 text-text-secondary hover:text-primary transition text-sm">
                    <Pencil size={14} /></button>
                    
                
                    <p className="text-lg font-semibold text-text-primary capitalize truncate pr-10">{shop.name}</p>
                    <p className="text-text-secondary capitalize mb-4">{shop.location}</p>
                    <div className="flex gap-2">
                        
                    <button 
                    onClick={()=>navigate(`/shop/${shop._id}/services`)}
                    className="flex-1 border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white active:scale-[0.98] transition text-sm font-medium">
                    Manage Services</button>
                    
                    <button 
                    onClick={()=>navigate(`/shop/${shop._id}/bookings`)}
                    className="flex-1 bg-accent text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition text-sm font-medium">
                        See Appointments</button>
                    </div>
                </div>
            ))}
             </div>
           </div>
              
        </div>
    )
}
export default MyShops


                
                    
            
            