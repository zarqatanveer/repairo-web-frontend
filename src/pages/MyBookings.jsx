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
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-text-primary">My Bookings</h1>
            </div>
            
            
            {error && <p className="text-red-500 mb-4">{error}</p> }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bookings.map((booking)=>(
                <div key={booking._id}
                className="bg-surface rounded-xl shadow-lg transition p-5 flex flex-col justify-between">
                    <p className="text-lg font-bold text-text-primary mb-3">{booking.shopId?.name}</p>

                    <div className="space-y-1 text-sm text-text-secondary mb-4">
                        <p>vehicle: {booking.vehicleId?.type} — {booking.vehicleId?.plateNumber}</p>
                        <p>service: {booking.serviceId?.name}</p>
                        <p >date: {new Date(booking.date).toLocaleString()}</p>
                        <p >price: Rs {booking.totalPrice}</p>
                    </div>
                    
                   <div className="flex gap-2 mb-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${
                            booking.status === "completed" ? "bg-green-100 text-green-700" :
                            booking.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                            booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                        }`}>
                        {booking.status}
                        </span>

                        <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${
                        booking.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                        {booking.paymentStatus}
                         </span>
                        </div>
                    
                    <div className="flex">
                        {booking.status === "completed" && (
                        <button 
                        onClick={() => navigate(`/bookings/${booking._id}/review`)}
                        className="w-full bg-primary-light text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition text-sm font-medium">
                        Leave Review
                    </button>
            )}
            
            {booking.status==="pending" &&(
                <button 
                onClick={() => handleDelete(booking._id)}
                className="w-full bg-red-500 text-white py-2 rounded hover:opacity-90 text-sm font-medium active:scale-[0.98] transition">
                    Delete Booking
                    </button>)}
                    </div>
                 
                </div>))}
            </div>
            </div>
            </div>
    )
}

export default MyBookings

