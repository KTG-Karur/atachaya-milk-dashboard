import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, createDashboard, updateDashboard } from "../../api/DashboardApi";
import _ from "lodash";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { filterArray, numberFormat, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { amountFormat } from "../../common/helper";
import { Table } from "antd";

let editData = false;

const CustomDashboard = ({ navigation }) => {

    const dispatch = useDispatch();

    const getDashboardSuccess = useSelector((state) => state.dashboardReducer.getDashboardSuccess);
    const getDashboardList = useSelector((state) => state.dashboardReducer.getDashboardList);
    const getDashboardFailure = useSelector((state) => state.dashboardReducer.getDashboardFailure);

    const dashboardErrorMessage = useSelector((state) => state.dashboardReducer.errorMessage);

    const columns = [
        {
            title: "#",
            dataIndex: "Id",
            render: (value, item, index) => (index + 1),
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
            sorter: (a, b) => a.customerName.length - b.customerName.length,
        },
        {
            title: "Estimate Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
    ]

    const [state, setState] = useState({})
    const [show, setShow] = useState(false);
    const [parentList, setParentList] = useState([])
    const [countList, setCountList] = useState({})

    useEffect(() => {
        dispatch(getDashboard())
    }, [navigation]);

    useEffect(() => {
        if (getDashboardSuccess) {
            setParentList(getDashboardList.dashboardDetails)
            setCountList(getDashboardList.dashboradCount[0])
            dispatch({ type: "RESET_GET_DASHBOARD" })
        } else if (getDashboardFailure) {
            setParentList([])
            dispatch({ type: "RESET_GET_DASHBOARD" })
        }
    }, [getDashboardSuccess, getDashboardFailure]);

    const columnsData = [
        {
            fieldName: "currentAppointmentCount",
            title: "Today Appointment",
            iconName: "fa fa-calendar",
            iconBgCol: "bg-2"
        },
        {
            fieldName: "estimateCount",
            title: "Total Estimate",
            iconName: "fa fa-calculator",
            iconBgCol: "bg-1"
        },
    ]

    const columnsEstimates = [
        {
            fieldName: "requestedCount",
            title: "Requested",
            pointCol: "text-warning"
        },
        {
            fieldName: "convertedCount",
            title: "Converted",
            pointCol: "text-success"
        },
        {
            fieldName: "CancelCount",
            title: "Cancelled",
            pointCol: "text-danger"
        },
    ]

    return (
        <>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-xl-4 col-sm-6 col-12">
                            {columnsData.map((ele) => {
                                return (
                                    <>
                                    <Link
                                            to="/quotation"
                                        >
                                        <div className="card-body bg-white p-3 mx-2 mb-2" style={{ borderRadius: 15 }}>
                                            <div className="dash-widget-header">
                                                <span className={`dash-widget-icon ${ele.iconBgCol || "bg-1"}`}>
                                                    <i className={`${ele.iconName}`}></i>
                                                </span>
                                                <div className="dash-count">
                                                    <div className="dash-title">{ele.title}</div>
                                                    <div className="dash-counts">
                                                        <p>
                                                            {numberFormat(countList[ele.fieldName] || 0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                    </>
                                )
                            })}
                        </div>
                        <div className="col-xl-8 col-sm-6 col-12">
                            <div className="col-xl-12 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title">Estimates Analytics</h5>
                                                <Link
                                                    to="#"
                                                    className="btn btn-white btn-sm"
                                                    role="button"
                                                >
                                                    Monthly Data
                                                </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div id="invoice_chart"></div>
                                        <div className=" text-muted">
                                            <div className="row">
                                                {columnsEstimates.map((ele) => {
                                                    return (
                                                        <>
                                                            <div className="col-4">
                                                                <div className="mt-4 mb-3 ps-2">
                                                                    <p className="mb-2 text-truncate">
                                                                        <i className={`fas fa-circle ${ele.pointCol} me-1`}></i>
                                                                        {ele.title}
                                                                    </p>
                                                                    <h5>
                                                                        {numberFormat(countList[ele.fieldName] || 0)}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">Recent Invoices</h5>
                                    </div>
                                    <div className="col-auto">
                                        <Link
                                            to="/quotation"
                                            className="btn-right btn btn-sm btn-outline-primary"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-table">
                                <div className="card-body purchase">
                                    <div className="table-responsive table-hover">
                                        <Table
                                            columns={columns}
                                            dataSource={parentList.length > 0 ? parentList : []}
                                            rowKey={(record, index) => (index)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <TemplateCustomTable tableName={"Dashboard List"} uniqueKey={"dashboardId"} show={show} setShow={setShow} columns={columns} list={parentList} /> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CustomDashboard;