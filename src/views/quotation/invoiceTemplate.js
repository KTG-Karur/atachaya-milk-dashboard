/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { InvoiceLogoWhite } from "../../common/imagepath";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { amountFormat, toTitleCase } from "../../common/helper";
import AmountToWords from "../../common/AmountToWords";
import moment from "moment";
import { dateConversionNormal } from "../../utils/applicationFun";

const InvoiceFiveprint = ({ data, invoiceLogo, currencyData, companyData }) => {
    /*  useEffect(() => {
         document.body.classList.add("darktheme");
 
         return () => {
             document.body.classList.remove("darktheme");
         };
     }, []); */

    //   const dataSources = data.items;

    const dataSources = data[0].orderProductDetails

    const columns = [
        {
            title: "S.No",
            dataIndex: "Id",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Items",
            // dataIndex: "productName",
            render: (value, item, index) => {
                const description = item.description ? `( ${item.description} )` :""
                return `${item.productName} ${description}`
            },
        },
        {
            title: "Length",
            dataIndex: "length",
        },
        //////naveen 07.06.2024//////
        {
            title: "Description",
            dataIndex: "description",
        },
         //////naveen 07.06.2024//////
        {
            title: "Numbers",
            dataIndex: "numbers",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Rate",
            dataIndex: "rate",
            render: (text, record) => (
                <>
                    {currencyData ? currencyData : "₹"}
                    {Number(record?.rate).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </>
            ),
        },
        {
            title: "Unit",
            dataIndex: "unitName",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (text, record) => (
                <>
                    {currencyData ? currencyData : "₹"}
                    {Number(record?.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </>
            ),
        }
    ];

    return (
        <>
            <div className="main-wrapper index-five" id="element-to-download-as-pdf" >
                <div className="container">
                    <div className="invoice-wrapper" style={{ backgroundColor: "#fcfafa" }}>
                        <div className="inv-content" style={{ backgroundColor: "#fcfafa" }}>
                            <div className="invoiceten-header">
                                <div className="d-flex justify-content-center" style={{ backgroundColor: "#d6d6d6" }}>
                                    <div style={{ fontWeight: 700, fontSize: 22, color: "#363636", padding: "5px" }}>QUOTATION</div>
                                </div>
                                <div className="company-details"  >
                                    <span className="company-name invoice-title" >
                                        {/* {toTitleCase(companyData?.companyName)} */}
                                    </span>
                                    <div className="company-content">
                                        <div className="company-content-left">
                                            <div className="company-info">
                                                <div className="gst-details me-0">
                                                    Serial No. <span style={{ color: "#363636", fontWeight: 600 }} className="mt-1">{data[0]?.serialNo || ""}</span>
                                                </div>
                                            </div>
                                            <div className="gst-details company-address mb-0 me-0">
                                                Quotation Date:{" "}
                                                <span style={{ color: "#363636", fontWeight: 600 }} className="mt-1">
                                                    {dateConversionNormal(data[0]?.createdOn, "DD-MM-YYYY") || ""}
                                                </span>
                                            </div>
                                        </div>
                                        {/*    <div className="inv-header-right">
                                            <div className="inv-details">
                                                <div className="inv-date">
                                                    Invoice No: <span>{data?.invoiceNumber}</span>
                                                </div>
                                                <div className="inv-date mb-0">
                                                    Invoice Date:{" "}
                                                    <span>
                                                        {moment(data?.invoiceDate).format("DD-MM-YYYY")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-address">
                                <div className="invoice-to">
                                    <span>Bill To:</span>
                                    <div className="inv-to-address">
                                        <div style={{ fontSize: "20px", color: "#363636", fontWeight: 600 }}>
                                            {data[0]?.customerName || ""}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#363636", fontWeight: 500 }} className="mx-2 mt-2">
                                            {`${data[0]?.customerContactNumber || ""}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-to">
                                    <span>Ship To:</span>
                                    <div className="inv-to-address">
                                        <div style={{ fontSize: "20px", color: "#363636", fontWeight: 600 }}>
                                            {data[0]?.customerName || ""}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#363636", fontWeight: 500 }} className="mx-2 mt-2">
                                            {`${data[0]?.customerContactNumber || ""}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-table">
                                <div className="table-responsive" style={{color: 'black'}}>
                                    <Table
                                        bordered
                                        dataSource={dataSources}
                                        columns={columns}
                                        pagination={{
                                            position: ["none", "none"],
                                        }}
                                        rowClassName="text-black"
                                        rowKey={(record) => record?.orderProductId}
                                    />
                                </div>
                            </div>
                            <div className="invoice-table-footer">
                                <div className="table-footer-left notes">
                                    {/* <span>Important Note:</span>{" "}
                                    <div className="delivery-notes">{data?.notes}</div> */}
                                </div>
                                <div className="text-end table-footer-right">
                                    <table>
                                        <tbody>
                                           {/*  <tr>
                                                <td style={{ color: "#363636", fontWeight: 600 }} >Amount</td>
                                                <td style={{ textAlign: "left", color: "#363636", fontWeight: 600, fontSize: "15px" }}>
                                                    {currencyData ? currencyData : "₹"}
                                                    {Number("200000").toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>
                                            </tr> */}

                                            <tr>
                                                <td className="text-nowrap" style={{ color: "#363636", fontWeight: 600 }}>Transport Charge </td>
                                                <td className="text-nowrap" style={{ textAlign: "left", color: "#363636", fontWeight: 600 }}>
                                                    {" "}
                                                    {"₹"}
                                                    {Number(data[0]?.transportCharge || 0).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="invoice-table-footer totalamount-footer">
                                <div className="table-footer-left">
                                    {/* <p className="total-info" style={{color: "#363636", fontWeight: 600}}> */}
                                    {/* Total Items :  {dataSources?.length} */}
                                    {/*   {Number(data?.TotalAmount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} */}
                                    {/* </p> */}
                                </div>
                                <div className="table-footer-right">
                                    <table className="totalamt-table">
                                        <tbody>
                                            <tr>
                                                <td style={{ color: "#363636", fontWeight: 600, fontSize: '22px' }}>Total</td>
                                                <td style={{ color: "#363636", fontWeight: 600, fontSize: '22px', textAlign: "left" }}>
                                                    {" "}&nbsp;&nbsp;&nbsp;
                                                    {currencyData ? currencyData : "₹"}
                                                    {Number(data[0].totalAmount).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="thanks-msg text-center">
                                Thanks for your Business
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceFiveprint;
