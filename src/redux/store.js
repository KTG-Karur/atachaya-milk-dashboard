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
import NewPaymentEntryReducer from "./reducer/newPaymentEntryReducer";
import EntryReducer from "./reducer/entryReducer";
import EntryDetailsReducer from "./reducer/entryDetailsReducer";
import StockTransferReducer from "./reducer/stockTransferReducer";
import StockHubReducer from "./reducer/stockHubReducer";
import CommissionSettingsReducer from "./reducer/commissionSettingsReducer";
import CommissionTypeReducer from "./reducer/commissionTypeReducer";
import SalaryReducer from "./reducer/salaryReducer";
import TransportSettingsReducer from "./reducer/transportSettingsReducer";
import TransportDriverReducer from "./reducer/transportDriverReducer";
import TransportEntryReducer from "./reducer/transportEntryReducer";
import TankerSupplierReducer from "./reducer/tankerSupplierReducer";
import TankerEntryReducer from "./reducer/tankerEntryReducer";
import CustomerAdvanceReducer from "./reducer/customerAdvanceReducer";
import CustomerSalaryReducer from "./reducer/customerSalaryReducer";
import FeedEntryHistoryReducer from "./reducer/feedEntryHistoryReducer";


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
        entryReducer : EntryReducer,
        entryDetailsReducer : EntryDetailsReducer,
        stockTransferReducer : StockTransferReducer,
        stockHubReducer : StockHubReducer,
        commissionSettingsReducer : CommissionSettingsReducer,
        commissionTypeReducer : CommissionTypeReducer,
        salaryReducer : SalaryReducer,
        transportSettingsReducer : TransportSettingsReducer,
        transportDriverReducer : TransportDriverReducer,
        transportEntryReducer : TransportEntryReducer,
        tankerSupplierReducer : TankerSupplierReducer,
        tankerEntryReducer : TankerEntryReducer,
        customerAdvanceReducer : CustomerAdvanceReducer,
        customerSalaryReducer : CustomerSalaryReducer,
        feedEntryHistoryReducer : FeedEntryHistoryReducer,


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
        newPaymentEntryReducer : NewPaymentEntryReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;