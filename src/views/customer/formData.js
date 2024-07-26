const customerForm = [
    {
        formFields: [
            {
                "label": "Center",
                "name": "centerId",
                "inputType": "select",
                "optionList": "centerList",
                "displayKey": "centerName",
                "uniqueKey": "centerId",
                "required": true
            },
            {
                "label": "Contact Number",
                "name": "contactNo",
                "inputType": "text",
                "inputTypeField": "number",
                "required": true
            },
            {
                "label": "Branch Name",
                "name": "branchName",
                "inputType": "text",
                "required": true
            },
            {
                "label": "IFSC",
                "name": "ifsc",
                "inputType": "text",
                "required": true
            },
        ]
    },
    {
        formFields: [
            {
                "label": "Customer Name",
                "name": "customerName",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Bank Name",
                "name": "bankName",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Account No.",
                "name": "accountNo",
                "inputType": "text",
                "required": true
            },
        ]
    },
]

export {
    customerForm,
};