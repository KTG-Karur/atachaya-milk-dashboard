const expensiveForm = [
    {
        formFields: [
            {
                "label": "Expensive Name",
                "name": "expensiveName",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Description",
                "name": "description",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Tax",
                "name": "tax",
                "inputType": "checkbox"
            },
            {
                "label": "Amount",
                "name": "amount",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Billing Date",
                "name": "billingDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "Employee",
                "name": "employeeId",
                "inputType": "select",
                "optionList": "employeeList",
                "displayKey": "employeeName",
                "uniqueKey": "employeeId",
                "required": true
            },
            {
                "label": "Mode Payment",
                "name": "modePaymentId",
                "inputType": "select",
                "optionList": "paymentModeList",
                "displayKey": "modeName",
                "uniqueKey": "paymentModeId",
                "required": true
            },
        ]
    }
]

export {
    expensiveForm,
};