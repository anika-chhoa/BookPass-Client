import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import Home from "@/features/home/pages/Home";
import About from "@/features/pages/About";
import Blog from "@/features/pages/Blog";
import Contact from "@/features/pages/Contact";
import Privacy from "@/features/pages/Privacy";
import Unauthorized from "@/features/pages/Unauthorized";
import Pricing from "@/features/subscriptions/pages/Pricing";
import { AdminRoute } from "@/routes/AdminRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { UserOnlyRoute } from "@/routes/UserOnlyRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Browse />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

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
            <Route path="/items/add" element={<AddItem />} />
            <Route path="/items/manage" element={<ManageBooks />} />
            <Route path="/dashboard/users" element={<AdminUsers />} />
            <Route path="/dashboard/bookings" element={<AdminBookings />} />
            <Route path="/dashboard/payments" element={<AdminPayments />} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/account" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
