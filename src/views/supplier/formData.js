const supplierForm = [
    {
        formFields: [
            {
                "label": "Supplier Name",
                "name": "supplierName",
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
    {
        formFields: [
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
                "name": "ifscCode",
                "inputType": "text",
                "required": true
            },           
        ]
    },
    
]

export {
    supplierForm,
};