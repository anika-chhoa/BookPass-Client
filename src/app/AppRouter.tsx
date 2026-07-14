import AddItem from "@/features/admin/pages/AddItem";
import AdminBookings from "@/features/admin/pages/AdminBookings";
import AdminOverview from "@/features/admin/pages/AdminOverview";
import AdminPayments from "@/features/admin/pages/AdminPayments";
import AdminUsers from "@/features/admin/pages/AdminUsers";
import ManageBooks from "@/features/admin/pages/ManageBooks";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import BookDetails from "@/features/books/pages/BookDetails";
import Browse from "@/features/books/pages/Browse";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import MyBookings from "@/features/dashboard/MyBookings";
import CheckoutSuccess from "@/features/dashboard/pages/CheckoutSuccess";
import Overview from "@/features/dashboard/pages/Overview";
import Profile from "@/features/dashboard/pages/Profile";
import Favorites from "@/features/dashboard/user/Favorites";
import Pricing from "@/features/subscriptions/pages/Pricing";
import { AdminRoute } from "@/routes/AdminRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { UserOnlyRoute } from "@/routes/UserOnlyRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Browse />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route element={<UserOnlyRoute />}>
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="/admin/add-item" element={<AddItem />} />
            <Route path="/admin/manage-books" element={<ManageBooks />} />
            <Route path="/dashboard/users" element={<AdminUsers />} />
            <Route path="/dashboard/bookings" element={<AdminBookings />} />
            <Route path="/dashboard/payments" element={<AdminPayments />} />
          </Route>
        </Route>

        <Route path="/account" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
