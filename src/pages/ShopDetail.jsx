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
        <div>
            <h1>Shop Detail</h1>
            <br></br>
            {error && <p>{error}</p> }
            {shop && (
                <div>
            <p>Shop Name: {shop.name}</p>
            <p>Shop Location: {shop.location}</p>
            </div>)}
            
            {services.map((service)=>(
                <div key={service._id}>
                <p>Service Name: {service.name}</p>
                <p>Service price: {service.price}</p>
                <p>Service duration: {service.duration}</p>
                </div>
            ))}
            <br></br>
            {reviews.map((review)=>(
                <div key={review._id}>
                    <p>Rating: {review.rating}</p>
                    <p>Comment: {review.comment}</p>
                </div>
            ))}
            <br></br>
            {role === 'customer' && (
                <button onClick={() => navigate(`/shop/${id}/book`)}>Book Appointment</button>
            )}
        </div>
    )
}

export default ShopDetail