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
const handlePaymentStatusChange = async (bookingId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/payment`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.ok) {
            fetchBookings()
        } else {
            setError('Failed to update payment status')
        }
    } catch (err) {
        setError('Something went wrong')
    }
}

     return(
        <div className="min-h-screen bg-bg px-6 py-10">
            <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-text-primary">Shop Bookings</h1>
            </div>
            
            {error && <p className="text-red-500 mb-4">{error}</p> }
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {bookings.map((booking)=>(
                <div 
                key={booking._id}
                className="bg-surface rounded-xl shadow-lg transition p-5 flex flex-col justify-between">
                    <p className="text-lg font-bold text-text-primary mb-3">owner: {booking.carOwnerId?.name}</p>
                    <div className="space-y-1 text-sm text-text-secondary">
                        <p>vehicle: {booking.vehicleId?.type} — {booking.vehicleId?.plateNumber}</p>
                    <p>service: {booking.serviceId?.name}</p>
                    <p>status: {booking.status}</p>
                    <p>date: {new Date(booking.date).toLocaleString()}</p>
                    <p>price: Rs {booking.totalPrice}</p>
                    </div>
                    
                    <p className=" text-sm text-text-secondary mb-4">payment: <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${
                        booking.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                        {booking.paymentStatus}
                         </span></p>
                    <div className="flex gap-2 mb-4">
                        <button 
                        onClick={() => handleStatusChange(booking._id, 'confirmed')}
                        className="flex-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold py-2 rounded hover:bg-green-500 hover:text-white hover:border-green-500 active:scale-[0.98] transition">
                            Confirm</button>
                    <button onClick={() => handleStatusChange(booking._id, 'completed')}
                        className="flex-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold py-2 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 active:scale-[0.98] transition">
                        Complete</button>
                    <button onClick={() => handleStatusChange(booking._id, 'cancelled')}
                        className="flex-1 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold py-2 rounded hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-[0.98] transition">
                        Cancel</button>
                    </div>
                    <button 
                    onClick={() => handlePaymentStatusChange(booking._id)}
                    className="w-full bg-accent text-white py-2 rounded hover:opacity-90 active:scale-[0.98] transition text-sm font-medium">
                        Mark as Paid</button>
                
                </div>
                
            ))}
           </div>
            </div>
        </div>
     )
    
}

export default ShopBookings






