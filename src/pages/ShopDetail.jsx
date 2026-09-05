import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"

function ShopDetail(){
    const {id}= useParams()
    const navigate=useNavigate()
    const [shop,setShop]=useState(null)
    const [services,setServices]=useState([])
    const [reviews,setReviews]=useState([])
    const [error,setError]=useState(null)
    const role = localStorage.getItem('role')
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/shops/${id}`)
        .then(response=>response.json())
        .then (data=>setShop(data))
        .catch (err=> setError("couldnot load shop detail"))

        fetch(`${import.meta.env.VITE_API_URL}/api/services/shop/${id}`)
        .then(response=>response.json())
        .then (data=>setServices(data))
        .catch (err=> setError("couldnot load services"))

        fetch(`${import.meta.env.VITE_API_URL}/api/reviews/shop/${id}`)
        .then(response=>response.json())
        .then (data=>setReviews(data))
        .catch (err=> setError("couldnot load reviews"))
    },[id])

    
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
            <div className="bg-surface rounded-lg shadow-md p-6">

                 <h1 className="text-2xl font-bold text-text-primary mb-4 ">Shop Detail</h1>
        
            {error && <p className="text-red-500 mb-4">{error}</p> }
                {shop && (
                <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-text-primary ">Shop Name: {shop.name}</p>
            <p className="text-sm  text-text-secondary">Shop Location: {shop.location}</p>
            </div>)}
            
             {services.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                    <h2 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">Services</h2>
                    <div className="space-y-2">
            {services.map((service)=>(
                <div key={service._id} 
                className="border border-gray-200 rounded p-3 text-sm text-text-secondary">
                <p className="font-medium text-text-primary">Service Name: {service.name}</p>
                <p>Service price: {service.price}</p>
                <p>Service duration: {service.duration}</p>
                </div>
            ))}
        </div>
                </div>
            )}    
           
           {reviews.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">Reviews</h2>
                    <div className="space-y-2">
            {reviews.map((review)=>(
                <div 
                key={review._id}
                className="text-sm text-text-secondary">
                    <p className="font-medium text-text-primary">Rating: {review.rating} ⭐</p>
                    <p>Comment: {review.comment}</p>
                </div>
            ))}
          </div>
                </div>
            )}
    
            
            {role === 'customer' && (
                <button 
                onClick={() => navigate(`/shop/${id}/book`)}
                className="w-full bg-accent text-white py-2 rounded hover:opacity-90 transition text-sm font-medium">
                 Book Appointment</button>
            )}
            </div>
            
        </div>
        </div>
    )
}

export default ShopDetail

