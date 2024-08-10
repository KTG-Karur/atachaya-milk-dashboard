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
                "label": "Role",
                "name": "roleId",
                "inputType": "select",
                "optionList": "roleList",
                "displayKey": "roleName",
                "uniqueKey": "roleId",
                "required": true
            },
            {
                "label": "Contact Number",
                "name": "contactNo",
                "inputType": "text",
                "required": true
            }, 
        ]
    },
    {
        formFields: [
            {
                "label": "Bank Name",
                "name": "bankName",
                "inputType": "text",
            },
            {
                "label": "Branch Name",
                "name": "branchName",
                "inputType": "text",
            },
            {
                "label": "Account Number",
                "name": "accountNo",
                "inputType": "text",
                "required": true
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
                "label": "Role",
                "name": "roleId",
                "inputType": "select",
                "optionList": "roleList",
                "displayKey": "roleName",
                "uniqueKey": "roleId",
                "required": true
            },
            {
                "label": "Contact Number",
                "name": "contactNo",
                "inputType": "text",
                "required": true
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
                "label": "Bank Name",
                "name": "bankName",
                "inputType": "text",
            },
            {
                "label": "Branch Name",
                "name": "branchName",
                "inputType": "text",
            },
            {
                "label": "Account Number",
                "name": "accountNo",
                "inputType": "text",
                "required": true
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