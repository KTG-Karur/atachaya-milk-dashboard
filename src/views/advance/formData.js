const advanceForm = [
    {
        formFields: [
            {
                "label": "Supplier",
                "name": "supplierId",
                "inputType": "select",
                "optionList": "supplierList",
                "displayKey": "supplierName",
                "uniqueKey": "supplierId",
                "required": true,
            },
            {
                "label": "Advance Date",
                "name": "paymentDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "Advance Amount",
                "name": "advanceAmount",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Reason",
                "name": "reason",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    advanceForm,
};