import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { MdVisibility } from "react-icons/md";
import { getQuotation, getQuotationDetails } from "../../../api/QuotationApi";
import { dateConversionNormal } from "../../../utils/applicationFun";
import moment from "moment";
import TempView from "../../../components/Atom/TempView";
import InvoiceFiveprint from "../../quotation/invoiceTemplate";
import { getQuotationReport } from "../../../api/QuotationReportApi";
import TemplateCustomTable from "../../../components/TemplateComponent.js/TemplateTable";

const ConfirmReport = ({ navigation }) => {

    const dispatch = useDispatch();

    const getQuotationSuccess = useSelector((state) => state.quotationReducer.getQuotationSuccess);
    const getQuotationList = useSelector((state) => state.quotationReducer.getQuotationList);
    const getQuotationFailure = useSelector((state) => state.quotationReducer.getQuotationFailure);

    const getQuotationReportSuccess = useSelector((state) => state.quotationReportReducer.getQuotationReportSuccess);
    const getQuotationReportList = useSelector((state) => state.quotationReportReducer.getQuotationReportList);
    const getQuotationReportFailure = useSelector((state) => state.quotationReportReducer.getQuotationReportFailure);

    const getQuotationDetailsSuccess = useSelector((state) => state.quotationReducer.getQuotationDetailsSuccess);
    const getQuotationDetailsList = useSelector((state) => state.quotationReducer.getQuotationDetailsList);
    const getQuotationDetailsFailure = useSelector((state) => state.quotationReducer.getQuotationDetailsFailure);

    const columns = [
        {
            title: "#",
            dataIndex: "Id",
            render: (value, item, index) => (index + 1),
          },
        {
            title: "Serial No.",
            fieldName: "status",
            classStyle: "text-start fs-5 mb-2",
            render: (record) => (
                <div className="d-flex justify-content-between">
                    <span className="badge badge-pill bg-primary-light">{record?.serialNo}</span>
                </div>
            ),
        },
        {
            title: "Customer",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Appointment Date",
            render: (record) => {
                const selectedDate = dateConversionNormal(record.appointmentDate, "DD-MM-YYYY")
                const currentDate = moment().format("DD-MM-YYYY")
                const tommorrowDate = moment().add(1, 'd').format("DD-MM-YYYY")
                const yesterDayDate = moment().subtract(1, 'd').format("DD-MM-YYYY")
                const colorBackground = selectedDate == currentDate ? "bg-success-light" : selectedDate >= tommorrowDate ? "bg-primary-light" : selectedDate <= yesterDayDate ? "bg-danger-light" : ""
                return (
                    <div>
                        <span className={`badge badge-pill ${colorBackground} p-0`} style={{ fontSize: 14 }}>{selectedDate}</span>
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
            title: "Action",
            classStyle: "text-end ",
            render: (record, index) => (
                <>
                    <div >
                        <MdVisibility
                            className="text-success cursor-pointer mx-2 my-2"
                            size={18}
                            onClick={() => onViewDetails(record, index)}
                        ></MdVisibility>
                    </div>
                </>
            ),
        },
    ];

    const [state, setState] = useState({})
    const [parentList, setParentList] = useState([])
    const [viewModule, setViewModule] = useState(false)
    const [parentViewModule, setParentViewModule] = useState(true)
    const [show, setShow] = useState(false);

    useEffect(() => {
        const requestData = {
            quotationStatusId: 2,
            isActive: 1
        }
        dispatch(getQuotation(requestData))
       
    }, [navigation]);

    useEffect(() => {
        if (getQuotationSuccess) {
            setParentList(getQuotationList)
            setState({
                ...state,
                count: getQuotationList.length
            })
            const requestData = {
                quotationStatusId: 2,
                isActive: 1
            }
            dispatch(getQuotationReport(requestData))
            dispatch({ type: "RESET_GET_QUOTATION" })
        } else if (getQuotationFailure) {
            setParentList([])
            dispatch({ type: "RESET_GET_QUOTATION" })
        }
    }, [getQuotationSuccess, getQuotationFailure]);

    useEffect(() => {
        if (getQuotationDetailsSuccess) {
            setState({
                ...state,
                quotationDetailsList: getQuotationDetailsList
            })
            onViewForm(getQuotationDetailsList[0])
            dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
        } else if (getQuotationDetailsFailure) {
            setState({
                ...state,
                quotationDetailsList: []
            })
            dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
        }
    }, [getQuotationDetailsSuccess, getQuotationDetailsFailure]);

    useEffect(() => {
        if (getQuotationReportSuccess) {
            setState({
                ...state,
                quotationReportList: getQuotationReportList
            })
            setParentViewModule(true)
            dispatch({ type: "RESET_GET_QUOTATION_REPORT" })
        } else if (getQuotationReportFailure) {
            setState({
                ...state,
                quotationReportList: []
            })
            dispatch({ type: "RESET_GET_QUOTATION_REPORT" })
        }
    }, [getQuotationReportSuccess, getQuotationReportFailure]);

    const onViewDetails = (data, index) => {
        const request = {
            isActive: 1,
            quotationId: data.quotationId
        }
        dispatch(getQuotationDetails(request))
    }

    const onViewForm = (data, index) => {
        setViewModule(!viewModule)
        setParentViewModule(!parentViewModule)
    }

    const col = [
        {
            title: "Month",
            Key: "currentMonthCount"
        },
        {
            title: "Last Month",
            Key: "previousMonthCount"
        },
        {
            title: "Year",
            Key: "currentYearCount"
        },
        {
            title: "Last Year",
            Key: "previousYearCount"
        },
    ]

    return (
        <>
            {
                viewModule && <TempView title={`Confirm Quotations Details`} closeModule={() => onViewForm()}>
                    <InvoiceFiveprint data={state?.quotationDetailsList || []} />
                </TempView>
            }
            {
                parentViewModule &&   
                <TemplateCustomTable columns={columns} list={parentList}  state={state} setState={setState} reportCol={col} reportData={state?.quotationReportList || []} reportCount={true} countName={"Confirm Count"} count={state?.count || 0} tableName={"Confirm Quotation Report"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} />
            }
        </>
    );
}

export default ConfirmReport;