const customerPaymentForm = [
    {
        formFields: [
            {
                "label": "From Date",
                "name": "fromDate",
                "inputType": "date",
                "classStyle": "col-3",
            },
            {
                "label": "To Date",
                "name": "toDate",
                "inputType": "date",
                "classStyle": "col-3",
            },
            {
                "label": "Center",
                "name": "centerId",
                "inputType": "select",
                "optionList": "centerList",
                "displayKey": "centerName",
                "uniqueKey": "centerId",
                "onChange" : "onHandleCustomer",
                "classStyle": "col-3",
            },
            {
                "label": "Customer",
                "name": "customerId",
                "inputType": "select",
                "optionList": "customerList",
                "displayKey": "customerName",
                "uniqueKey": "customerId",
                "classStyle": "col-3",
            },
        ]
    }
]

export {
    customerPaymentForm,
};