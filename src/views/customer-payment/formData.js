const colorForm = [
    {
        formFields: [
            {
                "label": "From Date",
                "name": "fromDate",
                "inputType": "date",
            },
            {
                "label": "To Date",
                "name": "toDate",
                "inputType": "date",
            },
            {
                "label": "Center",
                "name": "centerId",
                "inputType": "select",
                "optionList": "centerList",
                "displayKey": "centerName",
                "uniqueKey": "centerId",
                "onChange" : "onHandleCustomer",
            },
            {
                "label": "Customer",
                "name": "customerId",
                "inputType": "select",
                "optionList": "customerList",
                "displayKey": "customerName",
                "uniqueKey": "customerId",
            },
        ]
    }
]

export {
    colorForm,
};