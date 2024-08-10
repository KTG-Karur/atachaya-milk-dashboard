export const navigationMenu = [
    {
        "title": "Main",
        "pageName": "Dashboard",
        "icon": "pie-chart",
        "path": "/index",
    },
    {
        title: "Entry",
        icon: "printer",
        submenu: [
            {
                title: "Daily Entry",
                path: "/daily-entry",
                icon: "edit"
            },
            {
                title: "Feed Entry",
                path: "/feed-entry",
                icon: "edit-2"
            },
            {
                title: "Expensive",
                path: "/expensive",
                 icon: "credit-card"
            },
            {
                title: "Stock Transfer",
                path: "/stock-transfer",
                icon: "database"
            },
        ],
    },
    {
        title: "Customer",
        icon: "user-plus",
        submenu: [
            {
                title: "Customer Payment",
                path: "/customer-payment",
                icon: "users"
            },
            {
                title: "Customers",
                path: "/customer",
                icon: "users"
            },
            {
                title: "Advance Entry",
                path: "/customer-advance",
                icon: "fast-forward"
            },
        ],
    },
    {
        title: "Employee",
        icon: "users",
        submenu: [
            {
                title: "Salary",
                path: "/center-salary",
                icon: "dollar-sign"
            },
            {
                title: "Employee",
                path: "/employee",
                icon: "users"
            },
            {
                title: "Role",
                path: "/role",
                icon: "aperture"
            },
        ],
    },
    {
        title: "Supplier",
        icon: "user-check",
        submenu: [
            {
                title: "Payment Entry",
                path: "/payment-entry",
                icon: "airplay"
            },
            {
                title: "Advance Entry",
                path: "/advance",
                icon: "book-open"
            },
            {
                title: "Purchase",
                path: "/purchase",
                icon: "shopping-cart"
            },
            {
                title: "Supplier",
                path: "/supplier",
                icon: "truck"
            },
        ],
    },
    {
        title: "Transport",
        icon: "truck",
        submenu: [
            {
                title: "Transport Entry",
                path: "/transport-entry",
                icon: "truck"
            },
            {
                title: "Driver",
                path: "/transport-driver",
                icon: "user-check"
            },
        ],
    },
    {
        title: "Tanker",
        icon: "map-pin",
        submenu: [
            {
                title: "Tanker Entry",
                path: "/tanker-entry",
                icon: "truck"
            },
            {
                title: "Tanker Supplier",
                path: "/tanker-supplier",
                icon: "user-check"
            },
        ],
    },
    {
        title: "Master",
        icon: "menu",
        submenu: [
            {
                title: "Payment Mode",
                path: "/payment-mode",
                icon: "cast"
            },
            {
                title: "Commission Type",
                path: "/commission-type",
                icon: "sliders"
            },
            {
                title: "Shift",
                path: "/shift",
                icon: "clock"
            },
            {
                title: "Product",
                path: "/product",
                icon: "shopping-bag"
            },
        ],
    },
    {
        title: "Settings",
        icon: "settings",
        submenu: [
            {
                title: "Commission",
                path: "/commission-settings",
                icon: "tool"
            },
            {
                title: "Transport",
                path: "/transport-settings",
                icon: "settings"
            },
        ],
    },
]