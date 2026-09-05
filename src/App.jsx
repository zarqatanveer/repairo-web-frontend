import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MyVehicles from './pages/MyVehicles.jsx'
import CreateVehicle from './pages/CreateVehicle.jsx'
import MyShops from './pages/MyShops.jsx'
import CreateShop from './pages/CreateShop.jsx'
import ShopDetail from './pages/ShopDetail.jsx'
import BrowseShop from './pages/BrowseShop.jsx'
import ManageServices from './pages/ManageServices.jsx'
import CreateService from './pages/CreateService.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import ShopBookings from './pages/ShopBookings.jsx'
import MyBookings from './pages/MyBookings.jsx'
import CreateReview from './pages/CreateReview.jsx'
import Profile from './pages/Profile.jsx'

  function App() {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/shops" element={<BrowseShop/>}/>
             
            <Route path="/vehicles/mine" element={
            <ProtectedRoute allowedRoles={["customer"]}><MyVehicles /></ProtectedRoute>} />
            <Route path="/vehicles/add" element={
            <ProtectedRoute allowedRoles={["customer"]}><CreateVehicle/></ProtectedRoute>} />
            <Route path="/vehicles/:id/edit" element={
            <ProtectedRoute allowedRoles={["customer"]}><CreateVehicle/></ProtectedRoute>} />
            
            <Route path="/shops/mine" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><MyShops /></ProtectedRoute>} />
            <Route path="/shops/add" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><CreateShop /></ProtectedRoute>} />
            <Route path="/shops/:id/edit" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><CreateShop /></ProtectedRoute>} />
            <Route path="/shop/:id/services" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><ManageServices /></ProtectedRoute>} />
            <Route path="/shops/:id" element={<ShopDetail/>}/>
            <Route path="/shop/:shopId/services/add" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><CreateService /></ProtectedRoute>} />
            <Route path="/services/:id/edit" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><CreateService /></ProtectedRoute>} />

            <Route path="/shop/:shopId/book" element={
            <ProtectedRoute allowedRoles={["customer"]}><BookAppointment /></ProtectedRoute>} />
            <Route path="/shop/:shopId/bookings" element={
            <ProtectedRoute allowedRoles={["shopOwner"]}><ShopBookings /></ProtectedRoute>} />
            <Route path="/bookings/mine" element={
            <ProtectedRoute allowedRoles={["customer"]}><MyBookings /></ProtectedRoute>} />

            <Route path="/bookings/:bookingId/review" element={
            <ProtectedRoute allowedRoles={["customer"]}><CreateReview /></ProtectedRoute>} />

   
            <Route path="/profile" element={
            <ProtectedRoute allowedRoles={["customer","shopOwner"]}><Profile /></ProtectedRoute>} />
            
            
        

        </Routes>
    </BrowserRouter>

  )
}



export default App
