const colorForm = [
    {
        formFields: [
            {
                "label": "Center",
                "name": "centerId",
                "inputType": "select",
                "optionList": "centerList",
                "displayKey": "centerName",
                "uniqueKey": "centerId",
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
                "error" : false,
            },
            {
                "label": "From Date",
                "name": "fromDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "To Date",
                "name": "toDate",
                "inputType": "date",
                "required": true
            },
            {
                "label": "Total Ltr",
                "name": "totalLiter",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Amount",
                "name": "amount",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Advance",
                "name": "advance",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Feed Amount",
                "name": "feedAmount",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Bonus",
                "name": "bonus",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Pending Amount",
                "name": "pendingAmount",
                "inputType": "text",
                "required": true
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
    colorForm,
};