const productQuotationForm = [
    {
        formFields: [
            {
                "label": "",
                "name": "selectedProduct",
                "inputType": "select",
                "optionList": "productList",
                "displayKey": "productName",
                "uniqueKey": "productId",
                "onChange": "onHandleProduct"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "selectedColor",
                "inputType": "select",
                "optionList": "colorList",
                "displayKey": "colorName",
                "uniqueKey": "colorId"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "description",
                "inputType": "text",
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "valueTypeId",
                "inputType": "select",
                "optionList": "valueTypeList",
                "displayKey": "valueTypeName",
                "uniqueKey": "valueTypeId",
                "onChange": "onCalculate"
            },

        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "lengthData",
                "inputType": "text",
                "onChange": "onCalculate"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "numbers",
                "inputType": "text",
                "onChange": "onCalculate"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "quantity",
                "inputType": "text",
                "onChange": "onCalculate"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "rate",
                "inputType": "text",
                "onChange": "onCalculate"
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "amount",
                "inputType": "text",
            },
        ]
    },
    {
        formFields: [
            {
                "label": "",
                "name": "iconpress",
                "inputType": "icondelete",
            },
        ]
    },
]
const quotationForm = [
    {
        formFields: [
            {
                "label": "Customer",
                "name": "selectedCustomer",
                "inputType": "select",
                "optionList": "customerList",
                "displayKey": "customerName",
                "uniqueKey": "customerId",
                "onChange": "onSelectCustomer",
                "required": true
            },

        ]
    },
    {
        formFields: [
            {
                "label": "Appointment Date",
                "name": "appointmentDate",
                "inputType": "date",
            },
        ]
    },
]
const filterForm = [
    {
        formFields: [
            {
                "label": "Previous",
                "inputType": "button",
            },
            {
                "label": "Today",
                "inputType": "button",
            },
            {
                "label": "Tommorrow",
                "inputType": "button",
            },
            {
                "label": "Clear",
                "inputType": "button",
            },

        ]
    },
]
const updateStatusForm = [
    {
        formFields: [
            {
                "label": "Quotation Status",
                "name": "quotationStatusId",
                "inputType": "select",
                "optionList": "quotationStatusList",
                "displayKey": "quotationStatusName",
                "uniqueKey": "quotationStatusId"
            },
        ]
    },
]

export {
    quotationForm,
    productQuotationForm,
    filterForm,
    updateStatusForm
};