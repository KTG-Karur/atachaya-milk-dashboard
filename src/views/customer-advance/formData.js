const customerAdvanceForm = [
    {
        formFields: [
            {
                "label": "Payment Date",
                "name": "paymentDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "Center",
                "name": "centerId",
                "inputType": "select",
                "optionList": "centerList",
                "displayKey": "centerName",
                "uniqueKey": "centerId",
                "onChange" : "onHandleCustomer",
                "required": true,
                "error" : false,
            },
            {
                "label": "Customer",
                "name": "customerId",
                "inputType": "select",
                "optionList": "customerList",
                "displayKey": "customerName",
                "uniqueKey": "customerId",
                "required": true,
            },
            {
                "label": "Advance Amount",
                "name": "advanceAmt",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Reason",
                "name": "reason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
        ]
    }
]

export {
    customerAdvanceForm,
};