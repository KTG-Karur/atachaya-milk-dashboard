const paymentEntryForm = [
    {
        formFields: [
            {
                "label": "Payment Date",
                "name": "paymentDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "Supplier",
                "name": "supplierId",
                "inputType": "select",
                "optionList": "supplierList",
                "displayKey": "supplierName",
                "uniqueKey": "supplierId",
                "onChange": "onHandleSupplier",
                "required": true,
                 "classStyle": "col-12"
            },  
            {
                "label": "Advance Amount",
                "name": "advanceAmount",
                "inputType": "text",
                 "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Pending Amount",
                "name": "pendingAmount",
                "inputType": "text",
                "required": true,
                 "classStyle": "col-6"
            },
            {
                "label": "Balance Amount",
                "name": "balanceAmount",
                "inputType": "text",
                "required": true,
                 "classStyle": "col-6"
            },
            {
                "label": "Current Payment",
                "name": "payment",
                "inputType": "text",
                "required": true,
                 "classStyle": "col-6"
            },
        ]
    }
]

export {
    paymentEntryForm,
};