const salaryForm = [
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
                "classStyle": "col-12",
            },
            {
                "label": "Month",
                "name": "selectMonth",
                "inputType": "date",
                "pickerFormat" : "month",
                "format": "MM",
                "required": true,
                "classStyle": "col-6",
            },
            {
                "label": "Year",
                "name": "selectYear",
                "inputType": "date",
                "pickerFormat" : "year",
                "format": "YYYY",
                "required": true,
                "classStyle": "col-6",
            },
        ]
    },
]

const salaryDataForm = [
    {
        formFields: [
            {
                "label": "Entry Date",
                "name": "entryDate",
                "inputType": "date",
                "required": true,
                "classStyle": "col-12",
            },
            {
                "label": "Total Liter",
                "name": "totalLit",
                "inputType": "text",
                "disable" : true,
                "required": true,
                "classStyle": "col-6",
            },
            {
                "label": "Milk Commission",
                "name": "milkCommission",
                "inputType": "text",
                "disable" : true,
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Total Feed",
                "name": "totalFeed",
                "inputType": "text",
                "disable" : true,
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Feed Commission",
                "name": "feedCommission",
                "inputType": "text",
                "disable" : true,
                "classStyle": "col-6",
                "required": true
            },
        ]
    },
]

export {
    salaryForm,
    salaryDataForm
};