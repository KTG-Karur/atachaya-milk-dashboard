const feedEntryForm = [
    {
        formFields: [
            {
                "label": "Feed Entry Date",
                "name": "feedEntryDate",
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
                "label": "Quantity",
                "name": "quantity",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Amount",
                "name": "amount",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    feedEntryForm,
};