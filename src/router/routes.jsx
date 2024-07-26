import React from "react";
import Login from "../views/login/login-index";
import Register from "../pages/authentication/Register/Reister-index";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ConfirmPassword from "../pages/authentication/ConfirmationPassword";
import Dashboard from "../pages/Feature/dashboard/Index";
import OnlinePayment from "../pages/Feature/onlinePayments/OnlinePaymnet";
import AdminLogin from "../pages/authentication/login/admin-index";
import UserLogin from "../pages/authentication/login/user-index";
import CustomerCategory from "../views/customer-category";
import ProductUnit from "../views/product-unit";
import QuotationStatus from "../views/quotation-status";
import Role from "../views/role";
import Customer from "../views/customer";
import Employee from "../views/employee";
import Product from "../views/product";
import Quotation from "../views/quotation";
import User from "../views/users";
import CancelReport from "../views/report/cancel-report";
import ConfirmReport from "../views/report/confirm-report";
import SalesReport from "../views/report/sales-report";
import CustomDashboard from "../views/dashboard";
import Color from "../views/color";
import DailyEntry from "../views/daily-entry";
import Center from "../views/center";
import PaymentMode from "../views/payment-mode";
import Expensive from "../views/expensive";
import FeedEntry from "../views/feed-entry";
import Shift from "../views/shift";
import Supplier from "../views/supplier";
import Purchase from "../views/purchase";
import Advance from "../views/advance";

export const unAuthRoutes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/user-login",
    element: <UserLogin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirmation-password",
    element: <ConfirmPassword />,
  },
  {
    path: "/online-payment",
    element: <OnlinePayment />,
  },
];

export const authRoutes = [
  {
    path: "",
    element: <CustomDashboard />,
  },
  {
    path: "/index",
    element: <CustomDashboard />,
  },
  {
    path: "/dashboard",
    element: <CustomDashboard />,
  },
  {
    path: "/custom-dashboard",
    element: <CustomDashboard />,
  },
  {
    path: "/shift",
    element: <Shift />,
  },
  {
    path: "/purchase",
    element: <Purchase />,
  },
  {
    path: "/payment-mode",
    element: <PaymentMode />,
  },
  {
    path: "/supplier",
    element: <Supplier />,
  },
  {
    path: "/advance",
    element: <Advance />,
  },
  {
    path: "/expensive",
    element: <Expensive />,
  },
  {
    path: "/feed-entry",
    element: <FeedEntry />,
  },
  {
    path: "/center",
    element: <Center />,
  },
  {
    path: "/customer-category",
    element: <CustomerCategory />, 
  },
  {
    path: "/daily-entry",
    element: <DailyEntry />, 
  },
  {
    path: "/product-unit",
    element: <ProductUnit />,
  },
  {
    path: "/quotation-status",
    element: <QuotationStatus />,
  },
  {
    path: "/role",
    element: <Role />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/quotation",
    element: <Quotation />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/cancel-report",
    element: <CancelReport />,
  },
  {
    path: "/confirm-report",
    element: <ConfirmReport />,
  },
  {
    path: "/sales-report",
    element: <SalesReport />,
  },
  {
    path: "/color",
    element: <Color />,
  },
];
