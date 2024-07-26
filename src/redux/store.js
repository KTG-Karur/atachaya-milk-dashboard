import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/api/apiSlice"; // Import the apiReducer
import CustomerCategoryReducer from "./reducer/customerCategoryReducer";
import ProductUnitReducer from "./reducer/productUnitReducer";
import QuotationStatusReducer from "./reducer/quotationStatusReducer";
import RoleReducer from "./reducer/roleReducer";
import CustomerReducer from "./reducer/customerReducer";
import EmployeeReducer from "./reducer/employeeReducer";
import ProductReducer from "./reducer/productReducer";
import QuotationReducer from "./reducer/quotationReducer";
import ValueTypeReducer from "./reducer/valueTypeReducer";
import PagesReducer from "./reducer/pagesReducer";
import RolePermissionReducer from "./reducer/rolePermissionReducer";
import UserReducer from "./reducer/userReducer";
import QuotationReportReducer from "./reducer/quotationReportReducer";
import DashboardReducer from "./reducer/dashboardReducer";
import ColorReducer from "./reducer/colorReducer";
import CenterReducer from "./reducer/centerReducer";
import PaymentModeReducer from "./reducer/paymentModeReducer";
import ExpensiveReducer from "./reducer/expensiveReducer";
import FeedEntryReducer from "./reducer/feedEntryReducer";
import AdvanceReducer from "./reducer/advanceReducer";
import PurchaseReducer from "./reducer/purchaseReducer";
import ShiftReducer from "./reducer/shiftReducer";
import SupplierReducer from "./reducer/supplierReducer";
import PaymentEntryReducer from "./reducer/paymentEntryReducer";


// Configure Redux store
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        customerCategoryReducer : CustomerCategoryReducer,
        productUnitReducer : ProductUnitReducer,
        quotationStatusReducer : QuotationStatusReducer,
        roleReducer : RoleReducer,
        productReducer : ProductReducer,
        quotationReducer : QuotationReducer,
        valueTypeReducer : ValueTypeReducer,
        pagesReducer : PagesReducer,
        rolePermissionReducer : RolePermissionReducer,
        userReducer : UserReducer,
        quotationReportReducer : QuotationReportReducer,
        dashboardReducer : DashboardReducer,
        colorReducer : ColorReducer,


        centerReducer : CenterReducer,
        paymentModeReducer : PaymentModeReducer,
        customerReducer : CustomerReducer,
        employeeReducer : EmployeeReducer,
        expensiveReducer : ExpensiveReducer,
        feedEntryReducer : FeedEntryReducer,
        advanceReducer : AdvanceReducer,
        purchaseReducer : PurchaseReducer,
        shiftReducer : ShiftReducer,
        supplierReducer : SupplierReducer,
        paymentEntryReducer : PaymentEntryReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;