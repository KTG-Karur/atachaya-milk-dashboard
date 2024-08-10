const transportEntryForm = [
    {
        formFields: [
            {
                "label": "Transport Issuse",
                "name": "transportIssuse",
                "inputType": "checkbox",
                "classStyle": "col-12",
                "onChange": "onHandleIssuse",
                "required": true,
            },
            {
                "label": "Driver",
                "name": "transportDriverId",
                "inputType": "select",
                "optionList": "transportDriverList",
                "displayKey": "driverName",
                "uniqueKey": "transportDriverId",
                "required": true,
                "classStyle": "col-6",
            },
            {
                "label": "Shift",
                "name": "shiftId",
                "inputType": "select",
                "optionList": "shiftList",
                "displayKey": "shiftName",
                "uniqueKey": "shiftId",
                "classStyle": "col-6",
                "required": true,
            },
            {
                "label": "Kilometer",
                "name": "km",
                "inputType": "text",
                "onChange": "onHandleKilometer",
                "required": true,
                "classStyle": "col-6",
            },
            {
                "label": "Amout",
                "name": "amount",
                "inputType": "text",
                "disable" : true,
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Deduction",
                "name": "deduction",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Deduction Reason",
                "name": "deductionReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Additional Amount",
                "name": "additionalAmt",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Additional Amount Reason",
                "name": "additionalAmtReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Penalty",
                "name": "penalty",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Penalty Reason",
                "name": "penaltyReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Total Amount",
                "name": "totalAmt",
                "classStyle": "col-12",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

const transportEntryIssuseForm = [
    {
        formFields: [
            {
                "label": "Transport Issuse",
                "name": "transportIssuse",
                "inputType": "checkbox",
                "classStyle": "col-12",
                "onChange": "onHandleIssuse",
                "required": true,
            },
            {
                "label": "Issuse Reason",
                "name": "issuseReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true,
            },
            {
                "label": "Shift",
                "name": "shiftId",
                "inputType": "select",
                "optionList": "shiftList",
                "displayKey": "shiftName",
                "uniqueKey": "shiftId",
                "classStyle": "col-6",
                "required": true,
            },
            {
                "label": "Alter Driver Name",
                "name": "alterPersonName",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true,
            },
            {
                "label": "Alter Driver Contact No.",
                "name": "alterContactNo",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true,
            },
            {
                "label": "Kilometer",
                "name": "km",
                "inputType": "text",
                "onChange": "onHandleKilometer",
                "required": true,
                "classStyle": "col-6",
            },
            {
                "label": "Amout",
                "name": "amount",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true,
                "disable" : true
            },
            {
                "label": "Deduction",
                "name": "deduction",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Deduction Reason",
                "name": "deductionReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Additional Amount",
                "name": "additionalAmt",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Additional Amount Reason",
                "name": "additionalAmtReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Penalty",
                "name": "penalty",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Penalty Reason",
                "name": "penaltyReason",
                "inputType": "text",
                "classStyle": "col-6",
                "required": true
            },
            {
                "label": "Total Amount",
                "name": "totalAmt",
                "classStyle": "col-12",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    transportEntryForm,
    transportEntryIssuseForm
};