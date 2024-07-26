const editEmployeeForm = [
    {
        formFields: [
            {
                "label": "Employee Name",
                "name": "employeeName",
                "inputType": "text",
                "required": true
            },
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
                "label": "Branch Name",
                "name": "branchName",
                "inputType": "text",
            },
        ]
    },
    {
        formFields: [
            {
                "label": "Contact Number",
                "name": "contactNo",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Bank Name",
                "name": "bankName",
                "inputType": "text",
            },
            {
                "label": "IFSC Code",
                "name": "ifscCode",
                "inputType": "text",
                "required": true
            },
        ]
    }
]
const employeeForm = [
    {
        formFields: [
            {
                "label": "User Name",
                "name": "userName",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Employee Name",
                "name": "employeeName",
                "inputType": "text",
                "required": true
            },
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
                "label": "Branch Name",
                "name": "branchName",
                "inputType": "text",
            },
        ]
    },
    {
        formFields: [
            {
                "label": "Password",
                "name": "password",
                "inputType": "password",
                "required": true
            },
            {
                "label": "Contact Number",
                "name": "contactNo",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Bank Name",
                "name": "bankName",
                "inputType": "text",
            },
            {
                "label": "IFSC Code",
                "name": "ifscCode",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    employeeForm,
    editEmployeeForm
};