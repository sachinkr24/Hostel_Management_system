import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Applywarden from "./pages/Applywarden";
import NoificationPage from "./pages/NoificationPage";
import Users from "./pages/admin/Users";
import wardens from "./pages/admin/wardens";
import Profile from "./pages/warden/Profile"
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import wardenAppointments from "./pages/warden/wardenAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-warden"
              element={
                <ProtectedRoute>
                  <Applywarden />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/warden/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
              }
            />

<Route
              path="/warden/book-appointment/:wardenId"
              element={
                <ProtectedRoute>
                  <BookingPage/>
                </ProtectedRoute>
              }
            /> 

            <Route
              path="/admin/wardens"
              element={
                <ProtectedRoute>
                  <wardens />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NoificationPage />
                </ProtectedRoute>
              }
            
            />

             <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

<Route
              path="/warden-appointments"
              element={
                <ProtectedRoute>
                  <wardenAppointments />
                </ProtectedRoute>
              }
            />


            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;