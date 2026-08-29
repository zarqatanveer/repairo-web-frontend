import { Link, useNavigate,useLocation } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const location=useLocation()
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
    }

    return (
        <nav>
            <Link to="/shops">Browse Shops</Link>&nbsp;&nbsp;&nbsp;&nbsp;

           {!token && location.pathname !== "/login" && (
                <Link to="/login">Login&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            )}

            {!token && location.pathname !== "/register" && (
                <Link to="/register">Register&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            )}

            {token && role === "customer" && (
                <>
                    <Link to="/vehicles/mine">My Vehicles</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/bookings/mine">My Bookings</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                </>
            )}

            {token && role === "shopOwner" && (
                <Link to="/shops/mine">My Shops&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            )}

            {token && (
                <button onClick={handleLogout}>Logout&nbsp;&nbsp;&nbsp;&nbsp;</button>
            )}
            {token && <Link to="/profile">Profile</Link>}
        </nav>
    )
}

export default Navbar
