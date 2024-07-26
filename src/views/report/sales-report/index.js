import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { MdVisibility } from "react-icons/md";
import { getQuotation, getQuotationDetails } from "../../../api/QuotationApi";
import { dateConversionNormal, filterArray, numberFormat } from "../../../utils/applicationFun";
import moment from "moment";
import TempView from "../../../components/Atom/TempView";
import InvoiceFiveprint from "../../quotation/invoiceTemplate";
import { getQuotationReport, getSalesReport } from "../../../api/QuotationReportApi";
import TemplateCustomTable from "../../../components/TemplateComponent.js/TemplateTable";

const SalesReport = ({ navigation }) => {

    const dispatch = useDispatch();

    const getQuotationSuccess = useSelector((state) => state.quotationReducer.getQuotationSuccess);
    const getQuotationList = useSelector((state) => state.quotationReducer.getQuotationList);
    const getQuotationFailure = useSelector((state) => state.quotationReducer.getQuotationFailure);

    const getQuotationDetailsSuccess = useSelector((state) => state.quotationReducer.getQuotationDetailsSuccess);
    const getQuotationDetailsList = useSelector((state) => state.quotationReducer.getQuotationDetailsList);
    const getQuotationDetailsFailure = useSelector((state) => state.quotationReducer.getQuotationDetailsFailure);

    const getSalesReportSuccess = useSelector((state) => state.quotationReportReducer.getSalesReportSuccess);
    const getSalesReportList = useSelector((state) => state.quotationReportReducer.getSalesReportList);
    const getSalesReportFailure = useSelector((state) => state.quotationReportReducer.getSalesReportFailure);

    const employeeErrorMessage = useSelector((state) => state.employeeReducer.errorMessage);

    const columns = [
        {
            title: "#",
            dataIndex: "Id",
            render: (value, item, index) => (index + 1),
        },
        {
            title: "Employee Name",
            classStyle: "text-start fs-5 mb-2",
            key: "employeeName",
            render: (record) => (
                <span className="badge badge-pill bg-primary-light">{record?.employeeName}</span>
            ),
        },
        {
            title: "Contact Number",
            dataIndex: "contactNo",
            key: "contactNo",
        },
        {
            title: "Total Count",
            render: (record) => (
                numberFormat(record.pending)
            )
        },
        {
            title: "Confirm Count",
            render: (record) => (
                numberFormat(record.confirmCount)
            )
        },
        {
            title: "Cancel Count",
            render: (record) => (
                numberFormat(record.CancelCount)
            )
        },
        {
            title: "Action",
            classStyle: "text-end ",
            render: (record, index) => (
                <>
                    <div >
                        <MdVisibility
                            className="text-success cursor-pointer mx-2 my-2"
                            size={18}
                            onClick={() => onViewQuotation(record, index)}
                        ></MdVisibility>
                    </div>
                </>
            ),
        },
    ];

    const quotationColumns = [
        {
            title: "#",
            dataIndex: "Id",
            render: (value, item, index) => (index + 1),
        },
        {
            title: "Quotation Serial",
            dataIndex: "serialNo",
            key: "serialNo",
        },
        {
            title: "Followed By",
            dataIndex: "displayKey",
            key: "displayKey",
        },
        {
            title: "Customer",
            dataIndex: "customerName",
            key: "customerName",
            sorter: (a, b) => a.customerName.length - b.customerName.length,
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Appointment Date",
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            render: (record) => {
                const selectedDate = dateConversionNormal(record, "DD-MM-YYYY")
                const currentDate = moment().format("DD-MM-YYYY")
                const tommorrowDate = moment().add(1, 'd').format("DD-MM-YYYY")
                const yesterDayDate = moment().subtract(1, 'd').format("DD-MM-YYYY")
                const colorBackground = selectedDate == currentDate ? "bg-success-light" : selectedDate >= tommorrowDate ? "bg-primary-light" : selectedDate <= yesterDayDate ? "bg-danger-light" : ""
                return (
                    <div>
                        <span className={`badge badge-pill ${colorBackground} p-0`} style={{ fontSize: 12 }}>{selectedDate}</span>
                    </div>
                )
            }
        },
        {
            title: "Last Spoken Date",
            render: (record) => {
                const spokenDate = record.lastAppointment ? dateConversionNormal(record.lastAppointment, "DD-MM-YYYY") : null
                return (
                    <>
                        {spokenDate != null ? spokenDate : "-"}
                    </>
                )
            }
        },
        {
            title: "Status",
            render: (record) => {
                const bgColour = record?.quotationStatusName == "Confirm" ? "bg-success-light" : (record?.quotationStatusName == "Cancel") ? "bg-danger-light" : "bg-primary-light";
                return(
                    <div>
                    <span className={`badge badge-pill ${bgColour}`}>{record?.quotationStatusName}</span>
                </div>
                )
               
            },
        },
        {
            title: "Action",
            key: "Action",
            render: (record, item, index) => (
                <>
                    <div >
                        <MdVisibility
                            className="text-success cursor-pointer mx-2 my-2"
                            size={18}
                            onClick={() => onViewQuotationDetails(record, index)}
                        ></MdVisibility>
                    </div>
                </>
            ),
        },
    ]

    const [state, setState] = useState({})
    const [parentList, setParentList] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [viewModule, setViewModule] = useState(false)
    const [parentViewModule, setParentViewModule] = useState(true)
    const [quotationViewForm, setQuotationViewForm] = useState(false)
    const [quotationViewDetailsForm, setQuotationViewDetailsForm] = useState(false)
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getSalesReport())
    }, [navigation]);

    useEffect(() => {
        if (getSalesReportSuccess) {
            setParentList(getSalesReportList)
            dispatch({ type: "RESET_GET_SALES_REPORT" })
        } else if (getSalesReportFailure) {
            setParentList([])
            dispatch({ type: "RESET_GET_SALES_REPORT" })
        }
    }, [getSalesReportSuccess, getSalesReportFailure]);

    useEffect(() => {
        if (getQuotationSuccess) {
            setState({
                ...state,
                quotationList: getQuotationList
            })
            onViewQuotationForm(getQuotationList[0])
            dispatch({ type: "RESET_GET_QUOTATION" })
        } else if (getQuotationFailure) {
            setState({
                ...state,
                quotationList: []
            })
            dispatch({ type: "RESET_GET_QUOTATION" })
        }
    }, [getQuotationSuccess, getQuotationFailure]);

    useEffect(() => {
        if (getQuotationDetailsSuccess) {
            setState({
                ...state,
                quotationDetailsList: getQuotationDetailsList
            })
            onViewQuotationDetailsForm(getQuotationDetailsList[0])
            dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
        } else if (getQuotationDetailsFailure) {
            setState({
                ...state,
                quotationDetailsList: []
            })
            dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
        }
    }, [getQuotationDetailsSuccess, getQuotationDetailsFailure]);

    const onViewQuotation = (data, index) => {
        setSelectedItem(data)
        const request = {
            isActive: 1,
            createdBy: data.employeeId
        }
        dispatch(getQuotation(request))
    }

    const onViewQuotationForm = () => {
        setParentViewModule(!parentViewModule)
        setQuotationViewForm(!quotationViewForm)
    }

    const onViewQuotationDetails = (data, index) => {
        const request = {
            isActive: 1,
            quotationId: data.quotationId
        }
        dispatch(getQuotationDetails(request))
    }

    const onViewQuotationDetailsForm = (data, index) => {
        setQuotationViewForm(!quotationViewForm)
        setQuotationViewDetailsForm(!quotationViewDetailsForm)
    }

    return (
        <>
            {
                quotationViewDetailsForm && <TempView title={`Download Quotations`} closeModule={() => onViewQuotationDetailsForm()}>
                    <InvoiceFiveprint data={state?.quotationDetailsList || []} />
                </TempView>
            }
            {
                quotationViewForm &&
                <TemplateCustomTable columns={quotationColumns} list={state?.quotationList || []} state={state} setState={setState} search={false} tableName={"Quotation Report"} closeModuleArrow={true} closeModule={onViewQuotationForm} />
            }
            {
                parentViewModule &&
                <TemplateCustomTable columns={columns} list={parentList} state={state} setState={setState} tableName={"Sales Quotation Report"} />
            }
        </>
    );
}

export default SalesReport;