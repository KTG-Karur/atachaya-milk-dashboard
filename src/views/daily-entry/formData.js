const dailyEntryForm = [
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
        ]
    }
]

const editByCustomerForm = [
    {
        formFields: [
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
        ]
    }
]

export {
    dailyEntryForm,
    editByCustomerForm,
};