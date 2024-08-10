const commissionSettingsForm = [
    {
        formFields: [
            {
                "label": "Commission Type",
                "name": "commissionTypeId",
                "inputType": "select",
                "optionList": "commissionTypeList",
                "displayKey": "commissionTypeName",
                "uniqueKey": "commissionTypeId",
                "required": true,
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
    commissionSettingsForm,
};