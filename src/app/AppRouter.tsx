import AddItem from "@/features/admin/pages/AddItem";
import ManageBooks from "@/features/admin/pages/ManageBooks";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Account from "@/features/dashboard/user/Account";
import { AdminRoute } from "@/routes/AdminRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/add-item" element={<AddItem />} />
          <Route path="/admin/manage-books" element={<ManageBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
