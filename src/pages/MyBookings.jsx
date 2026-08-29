import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
function MyBookings(){
    const navigate=useNavigate()
    const [error,setError]=useState(null)
    const [bookings,setBookings]=useState([])

    useEffect(() => {
    fetchBookings()
    }, [])

    const fetchBookings = () => {
    const token = localStorage.getItem("token")
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/mine`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(err => setError("couldn't load bookings"))
    } 

    const handleDelete = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?")
    if (!confirmed) return
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (response.ok) {
            fetchBookings()
        } else {
            setError('Failed to delete booking')
        }
    } catch (err) {
        setError('Something went wrong')
    }
}

    return (
        <div>
            <h1>My Bookings</h1>
            <br></br><br></br>
            {error && <p>{error}</p> }
            {bookings.map((booking)=>(
                <div key={booking._id}>
                    <p>shop: {booking.shopId?.name}</p>
                    <p>vehicle: {booking.vehicleId?.type} — {booking.vehicleId?.plateNumber}</p>
                    <p>service: {booking.serviceId?.name}</p>
                    <p>status: {booking.status}</p>
                    <p>date: {booking.date}</p>
                    <p>price:{booking.totalPrice}</p>
                    <br></br>
                    {booking.status === "completed" && (
                        <button onClick={() => navigate(`/bookings/${booking._id}/review`)}>
                        Leave Review
                    </button>
            )}
            <br></br>
            {booking.status==="pending" &&(
                <button onClick={() => handleDelete(booking._id)}>
                    Delete Booking
                    </button>)}
                 
                </div>))}
            </div>
    )
}

export default MyBookings

