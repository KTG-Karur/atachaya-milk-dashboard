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