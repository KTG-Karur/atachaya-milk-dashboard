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

export {
    dailyEntryForm,
};