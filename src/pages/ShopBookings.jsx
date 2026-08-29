import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"

function ShopBookings(){
    const {shopId}= useParams()
    const [error,setError]=useState(null)
    const [bookings,setBookings]=useState([])

    const fetchBookings = () => {
    const token = localStorage.getItem("token")
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/shop/${shopId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(err => setError("couldn't load bookings"))
    } 

   useEffect(() => {
    fetchBookings()
    }, [shopId])


    const handleStatusChange = async (bookingId, newStatus) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ status: newStatus })
        })

        if (response.ok) {
            fetchBookings()   
        } else {
            setError('Failed to update status')
        }
    } catch (err) {
        setError('Something went wrong')
    }
}

     return(
        <div>
            <h1>Shop Bookings</h1>
            <br></br><br></br>
            {error && <p>{error}</p> }
            {bookings.map((booking)=>(
                <div key={booking._id}>
                    <p>owner: {booking.carOwnerId?.name}</p>
                    <p>vehicle: {booking.vehicleId?.type} — {booking.vehicleId?.plateNumber}</p>
                    <p>service: {booking.serviceId?.name}</p>
                    <p>status: {booking.status}</p>
                    <p>date: {booking.date}</p>
                    <p>price: {booking.totalPrice}</p>
                    <button onClick={() => handleStatusChange(booking._id, 'confirmed')}>Confirm</button><br></br>
                    <button onClick={() => handleStatusChange(booking._id, 'completed')}>Complete</button><br></br>
                    <button onClick={() => handleStatusChange(booking._id, 'cancelled')}>Cancel</button><br></br>
                    <br></br><br></br>
                </div>
            ))}
            
        </div>
     )
    
}

export default ShopBookings






