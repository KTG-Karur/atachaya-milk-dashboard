const purchaseForm = [
    {
        formFields: [ 
            {
                "label": "Advance Date",
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
            },  
            {
                "label": "Product",
                "name": "productId",
                "inputType": "select",
                "optionList": "productList",
                "displayKey": "productName",
                "uniqueKey": "productId",
                "onChange": "onHandleProduct",
                "required": true,
            }, 
            {
                "label": "Quantity",
                "name": "qty",
                "inputType": "text",
                "onChange": "onHandleQuantity",
                "required": true
            },
            {
                "label": "Current Payment",
                "name": "payment",
                "inputType": "text",
                // "required": true
            },
        ]
    },
    {
        formFields: [ 
            {
                "label": "Amount",
                "name": "amount",
                "inputType": "text",
                "disable" : true,
                "required": true
            },
            {
                "label": "Transport Charge",
                "name": "transportCharge",
                "inputType": "text",
                // "required": true
            },
            {
                "label": "Advance Amount",
                "name": "advanceAmount",
                "inputType": "text",
                // "required": true
            },
            {
                "label": "Pending Amount",
                "name": "pendingAmount",
                "inputType": "text",
                // "required": true
            },
            {
                "label": "Total Amount",
                "name": "totalAmount",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    purchaseForm,
};