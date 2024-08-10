const tankerEntryForm = [
    {
        formFields: [
            {
                "label": "Tanker Supplier",
                "name": "tankerSupplierId",
                "inputType": "select",
                "optionList": "tankerSupplierList",
                "displayKey": "companyName",
                "uniqueKey": "tankerSupplierId",
                "required": true,
                "classStyle": "col-12"
            },
            {
                "label": "Entry Date",
                "name": "entryDate",
                "inputType": "date",
                "required": true,
                "classStyle": "col-6"
            },
            {
                "label": "Driver Name",
                "name": "driverName",
                "inputType": "text",
                "required": true,
                "classStyle": "col-6"
            },
            {
                "label": "Quantity",
                "name": "quantity",
                "inputType": "text",
                "required": true,
                "classStyle": "col-6"
            },
            {
                "label": "Driver Contact No.",
                "name": "driverContactNo",
                "inputType": "text",
                "required": true,
                "classStyle": "col-6"
            },
            {
                "label": "Amount",
                "name": "amount",
                "inputType": "text",
                "required": true,
                "classStyle": "col-6"
            },
            {
                "label": "Vehicle No.",
                "name": "vehicleNo",
                "inputType": "text",
                "required": true,
                "classStyle": "col-6"
            },
        ]
    }
]

export {
    tankerEntryForm,
};

