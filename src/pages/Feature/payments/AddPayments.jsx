import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import DatePicker from "react-datepicker";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

const AddPayment = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [date, setDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [customerOptions, setCustomerOptions] = useState([
    { id: 1, text: "Select Customer" },
    { id: 2, text: "Brian Johnson" },
    { id: 3, text: "Marie Canales" },
    { id: 4, text: "Barbara Moore" },
    { id: 5, text: "Greg Lynch" },
    { id: 6, text: "Karlene Chaidez" },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [invoiceOptions, setInvoiceOptions] = useState([
    { id: "Afganistan", text: "List Empty" },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [paymentOptions, setPaymentOptions] = useState([
    { id: "payment", text: "Select Payment mode" },
    { id: "Afganistan", text: "Cash" },
    { id: "Albania", text: "Credit" },
    { id: "Algeria", text: "Cheque" },
  ]);

  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("width-100"));
  }, []);

  const handleChange = (date) => {
    setDate(date);
  };

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Payments</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/payments">Payments</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Payments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date:</label>
                            <div className="cal-icon">
                              <DatePicker
                                selected={date}
                                onChange={handleChange}
                                className="form-control datetimepicker"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Customer:</label>
                            <Select2
                              className="w-100"
                              data={customerOptions}
                              options={{
                                placeholder: "Select Customer",
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Address:</label>
                            <textarea
                              rows="5"
                              cols="5"
                              className="form-control"
                              placeholder="Enter Address"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Amount:</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Payment Number:</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Invoice:</label>
                            <Select2
                              className="w-100"
                              data={invoiceOptions}
                              options={{
                                placeholder: "Select Status",
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Payment Mode:</label>
                            <Select2
                              className="w-100"
                              data={paymentOptions}
                              options={{
                                placeholder: "Select Status",
                              }}
                            />
                          </div>
                          <div className="text-end mt-4">
                            <button type="submit" className="btn btn-primary">
                              Add Payments
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPayment;
