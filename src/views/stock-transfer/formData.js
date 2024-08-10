const stockTransferForm = [
    {
        formFields: [
            {
                "label": "Transfer Stock Date",
                "name": "transferDate",
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
                "label": "Transfer Stock",
                "name": "transferStock",
                "inputType": "text",
                "required": true,
                "onChange": "onHandleQuantity",
            },
            {
                "label": "Balance in Hub",
                "name": "balanceHubStock",
                "inputType": "text",
                "required": true
            },
            {
                "label": "Per Qty Price",
                "name": "perQtyAmount",
                "inputType": "text",
                "required": true
            },
        ]
    }
]

export {
    stockTransferForm,
};