import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from '../assets/logo.png'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
        setMenuOpen(false)
    }

    return (
        <nav className="bg-primary text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/shops" className="flex items-center gap-2 hover:text-accent">
                    <img src={logo} alt="Repairo logo" className="h-8 w-8" />
                    <span className="text-lg font-bold">Repairo</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/shops" className="hover:text-accent transition">Browse Shops</Link>

                    {token && role === "customer" && (
                        <>
                            <Link to="/vehicles/mine" className="hover:text-accent">My Vehicles</Link>
                            <Link to="/bookings/mine" className="hover:text-accent">My Bookings</Link>
                        </>
                    )}

                    {token && role === "shopOwner" && (
                        <Link to="/shops/mine" className="hover:text-accent">My Shops</Link>
                    )}

                    {!token && location.pathname !== "/login" && (
                        <Link to="/login" className="hover:text-accent">Login</Link>
                    )}
                    {!token && location.pathname !== "/register" && (
                        <Link to="/register" className="hover:text-accent">Register</Link>
                    )}
                    {token && <Link to="/profile" className="hover:text-accent">Profile</Link>}
                    {token && (
                        <button onClick={handleLogout} className="bg-accent px-4 py-2 rounded hover:opacity-90 active:scale-[0.98] transition">
                            Logout
                        </button>
                    )}
                </div>

            
                <button
                    className="md:hidden text-2xl hover:text-accent transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

        
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
                    <Link to="/shops" onClick={() => setMenuOpen(false)} className="hover:text-accent transition">Browse Shops</Link>

                    {token && role === "customer" && (
                        <>
                            <Link to="/vehicles/mine" onClick={() => setMenuOpen(false)} className="hover:text-accent">My Vehicles</Link>
                            <Link to="/bookings/mine" onClick={() => setMenuOpen(false)} className="hover:text-accent">My Bookings</Link>
                        </>
                    )}

                    {token && role === "shopOwner" && (
                        <Link to="/shops/mine" onClick={() => setMenuOpen(false)} className="hover:text-accent">My Shops</Link>
                    )}

                    {!token && location.pathname !== "/login" && (
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-accent">Login</Link>
                    )}
                    {!token && location.pathname !== "/register" && (
                        <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-accent">Register</Link>
                    )}
                    {token && <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-accent">Profile</Link>}
                    {token && (
                        <button onClick={handleLogout} className="bg-accent px-4 py-2 rounded hover:opacity-90 active:scale-[0.98] transition">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar