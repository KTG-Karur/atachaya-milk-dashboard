import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCustomerPayment, createCustomerPayment, updateCustomerPayment } from "../../api/CustomerPaymentApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { Link } from "react-router-dom";
import { customerPaymentForm } from "./formData";
import { Button, Form, Input, Popconfirm, Space, Table, Typography } from "antd";
import { dateConversionNormal, filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi";
import TempView from "../../components/Atom/TempView";
import { getCustomer } from "../../api/CustomerApi";
import DownloadTemplate from "./downloadTemplate";
import { useReactToPrint } from 'react-to-print';

let editData = false;
const { Text } = Typography;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const CustomerPayment = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const contentToPrint = useRef();
  /* const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getCustomerSuccess = useSelector((state) => state.customerReducer.getCustomerSuccess);
  const getCustomerList = useSelector((state) => state.customerReducer.getCustomerList);
  const getCustomerFailure = useSelector((state) => state.customerReducer.getCustomerFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  /* const getCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentSuccess);
  const getCustomerPaymentList = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentList);
  const getCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentFailure);

  const createCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentSuccess);
  const createCustomerPaymentData = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentData);
  const createCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentFailure);

  const updateCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentSuccess);
  const updateCustomerPaymentData = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentData);
  const updateCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentFailure); */

  // const customerPaymentErrorMessage = useSelector((state) => state.customerPaymentReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "CustomerPayment Name",
      dataIndex: "customerPaymentName",
      key: "customerPaymentName",
      sorter: (a, b) => a.customerPaymentName.length - b.customerPaymentName.length,
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <div>
          {record?.isActive ? (
            <span className="badge badge-pill bg-success-light">Active</span>
          ) : (
            <span className="badge badge-pill bg-danger-light">Inactive</span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (record, item, index) => (
        <>
          <div >
            {_.includes(accessIds, '2') && <MdEdit
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onEditForm(record, index)}
            ></MdEdit>}
            {_.includes(accessIds, '3') && <MdDelete
              className="text-danger cursor-pointer"
              size={18}
              onClick={() => showConfirmationDialog(
                "You won't be able to revert this!",
                () => onDeleteItem(record, index),
                "Yes, Delete it!"
              )}
            ></MdDelete>}
          </div>
        </>
      ),
    },
  ];

  const [state, setState] = useState({})
  const [parentList, setParentList] = useState([])
  const [createModule, setCreateModule] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerSuccess) {
      setState({
        ...state,
        customerList: getCustomerList
      })
      dispatch({ type: "RESET_GET_CUSTOMER" })
    } else if (getCustomerFailure) {
      setState({
        ...state,
        customerList: []
      })
      dispatch({ type: "RESET_GET_CUSTOMER" })
    }
  }, [getCustomerSuccess, getCustomerFailure]);

  useEffect(() => {
    if (getCenterSuccess) {
      setState({
        ...state,
        centerList: getCenterList
      })
      dispatch({ type: "RESET_GET_CENTER" })
    } else if (getCenterFailure) {
      setState({
        ...state,
        centerList: []
      })
      dispatch({ type: "RESET_GET_CENTER" })
    }
  }, [getCenterSuccess, getCenterFailure]);

  /*   useEffect(() => {
      if (getCustomerPaymentSuccess) {
        setParentList(getCustomerPaymentList)
        dispatch({ type: "RESET_GET_CUSTOMER_PAYMENT" })
      } else if (getCustomerPaymentFailure) {
        setParentList([])
        dispatch({ type: "RESET_GET_CUSTOMER_PAYMENT" })
      }
    }, [getCustomerPaymentSuccess, getCustomerPaymentFailure]); */

  /*  useEffect(() => {
     if (createCustomerPaymentSuccess) {
       const temp_state = [createCustomerPaymentData[0], ...parentList];
       setParentList(temp_state)
       showMessage("success", "Created Successfully...!")
       closeModule()
       dispatch({ type: "RESET_CREATE_CUSTOMER_PAYMENT" })
     } else if (createCustomerPaymentFailure) {
       dispatch({ type: "RESET_CREATE_CUSTOMER_PAYMENT" })
     }
   }, [createCustomerPaymentSuccess, createCustomerPaymentFailure]);
 
   useEffect(() => {
     if (updateCustomerPaymentSuccess) {
       updateTable(updateCustomerPaymentData[0])
       dispatch({ type: "RESET_UPDATE_CUSTOMER_PAYMENT" })
     } else if (updateCustomerPaymentFailure) {
       dispatch({ type: "RESET_UPDATE_CUSTOMER_PAYMENT" })
     }
   }, [updateCustomerPaymentSuccess, updateCustomerPaymentFailure]); */

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerPaymentId != selectedItem.customerPaymentId;
      });
      setParentList(remainingData)
      showMessage("success", "Deleted Successfully...!")
    } else {
      temp_state[selectedIndex] = updatedItem;
      setParentList(temp_state)
      showMessage("success", "Updated Successfully...!")
    }
    closeModule()
  }

  const onDeleteItem = (data, index) => {
    setSelectedIndex(index)
    setSelectedItem(data)
    setDeleteModule(true)
  }

  const closeModule = () => {
    setCreateModule(false)
    setDeleteModule(false)
    editData = false
  }

  const clearState = () => {
    setState({
      ...state,
      customerPaymentName: ""
    })
  }

  const onHandleCustomer = (selectedData, index, name) => {
    const requestData = {
      centerId: selectedData.centerId
    }
    dispatch(getCustomer(requestData))
    setState({
      ...state,
      [name]: selectedData,
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      customerPaymentName: data?.customerPaymentName || ""
    })
    editData = true
    setCreateModule(true)
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitForm = () => {
    /* const request = {
      customerPaymentName: customerPaymentName
    }
    if (editData) {
      dispatch(updateCustomerPayment(request, selectedItem.customerPaymentId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomerPayment(deleteRequest, selectedItem.customerPaymentId))
    } else {
      dispatch(createCustomerPayment(request))
    } */
  }

  const onSearchCustomer = () => {
    if (state.customerId != undefined && state.centerId != undefined && state.toDate != undefined && state.fromDate != undefined) {
      alert("in-->if")
    } else {
      showMessage('warning', "Please Fill the Given Field...!")
    }
  }

  const [dataSource, setDataSource] = useState([
    {
      "entryDetailsId": 1,
      "entryDate": "2024-06-16T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "3.95",
      "fat": "4.9",
      "snf": "8.2",
      "rate": "34.7",
      "amount": "137.39",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 8,
      "EshiftId": 2,
      "Eqty": "3.97",
      "Efat": "4.9",
      "Esnf": "8.2",
      "Erate": "34.7",
      "Eamount": "137.39"
    },
    {
      "entryDetailsId": 2,
      "entryDate": "2024-06-17T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "3",
      "fat": "5.3",
      "snf": "9.1",
      "rate": "40.9",
      "amount": "227.2",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 9,
      "EshiftId": 2,
      "Eqty": "3",
      "Efat": "5.3",
      "Esnf": "9.1",
      "Erate": "40.9",
      "Eamount": "227.2"
    },
    {
      "entryDetailsId": 3,
      "entryDate": "2024-06-18T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "3.5",
      "fat": "4",
      "snf": "9.7",
      "rate": "53.88",
      "amount": "140.5",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 10,
      "EshiftId": 2,
      "Eqty": "3.5",
      "Efat": "4",
      "Esnf": "9.7",
      "Erate": "53.88",
      "Eamount": "140.5"
    },
    {
      "entryDetailsId": 4,
      "entryDate": "2024-06-19T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "4.72",
      "fat": "3.7",
      "snf": "7.8",
      "rate": "90.77",
      "amount": "320.55",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 11,
      "EshiftId": 2,
      "Eqty": "4.72",
      "Efat": "3.7",
      "Esnf": "7.8",
      "Erate": "90.77",
      "Eamount": "320.55"
    },
    {
      "entryDetailsId": 5,
      "entryDate": "2024-06-20T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "3.9",
      "fat": "3.8",
      "snf": "9.3",
      "rate": "78.9",
      "amount": "330.48",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 12,
      "EshiftId": 2,
      "Eqty": "3.9",
      "Efat": "3.8",
      "Esnf": "9.3",
      "Erate": "78.9",
      "Eamount": "330.48"
    },
    {
      "entryDetailsId": 6,
      "entryDate": "2024-06-21T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "3.54",
      "fat": "3.4",
      "snf": "8.5",
      "rate": "55.8",
      "amount": "120.99",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 13,
      "EshiftId": 2,
      "Eqty": "3.54",
      "Efat": "3.4",
      "Esnf": "8.5",
      "Erate": "55.8",
      "Eamount": "120.99"
    },
    {
      "entryDetailsId": 7,
      "entryDate": "2024-06-22T18:30:00.000Z",
      "shiftId": 1,
      "shiftName": "Evening",
      "customerId": 1,
      "qty": "4.72",
      "fat": "5.7",
      "snf": "8.4",
      "rate": "92.8",
      "amount": "315.77",
      "entryId": 1,
      "centerId": "1",
      "centerName": "karur-center",
      "isActive": 1,
      "createdOn": "2024-08-08T23:06:55.000Z",
      "updatedon": null,
      "EentryDetailsId": 14,
      "EshiftId": 2,
      "Eqty": "4.72",
      "Efat": "5.7",
      "Esnf": "8.4",
      "Erate": "92.8",
      "Eamount": "315.77"
    }
  ]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const reportColumn = [
    {
      title: '',
      children: [
        {
          title: 'உற்பத்தி யாளர் எண்',
          dataIndex: 'customerCode',
          key: 'customerCode',
          width: '5%',
          // sorter: (a, b) => a.customerCode - b.customerCode,
          /*   onCell: (_, index) => {
              if (index == 0) {
                return {
                  rowSpan: 6,
                };
              }
            }, */
        },
      ]
    },
    {
      title: '',
      children: [
        {
          title: 'தேதி',
          dataIndex: 'entryDate',
          key: 'entryDate',
          width: '5%',
          render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{dateConversionNormal(text, "DD-MM-YYYY")}</span>,
          // sorter: (a, b) => a.customerCode - b.customerCode,
        },
      ]
    },
    {
      title: 'M',
      children: [
        {
          title: 'கொழுப்பு',
          dataIndex: 'fat',
          key: 'fat',
          editable: true,
          width: '5%',
        },
        {
          title: 'இதரசத்து',
          dataIndex: 'snf',
          key: 'snf',
          editable: true,
          width: '5%',
        },
        {
          title: 'அளவு',
          dataIndex: 'qty',
          key: 'qty',
          editable: true,
          width: '5%',
        },
        {
          title: 'விலை',
          dataIndex: 'rate',
          key: 'rate',
          editable: true,
          width: '5%',
        },
        {
          title: 'தொகை',
          dataIndex: 'amount',
          key: 'amount',
          editable: true,
          width: '5%',
        },

      ],
    },
    {
      title: 'E',
      children: [
        {
          title: 'கொழுப்பு',
          dataIndex: 'Efat',
          key: 'Efat',
          editable: true,
          width: '5%',
        },
        {
          title: 'இதரசத்து',
          dataIndex: 'Esnf',
          key: 'Esnf',
          editable: true,
          width: '5%',
        },
        {
          title: 'அளவு',
          dataIndex: 'Eqty',
          key: 'Eqty',
          editable: true,
          width: '5%',
        },
        {
          title: 'விலை',
          dataIndex: 'Erate',
          key: 'Erate',
          editable: true,
          width: '5%',
        },
        {
          title: 'தொகை',
          dataIndex: 'Eamount',
          key: 'Eamount',
          editable: true,
          width: '5%',
        },

      ],
    },


  ];

  const columnsData = reportColumn.map((col) => {

    const coldata = col.children.map((item) => {
      if (!item.editable) {
        return item;
      }
      return {
        ...item,
        onCell: (record) => ({
          record,
          editable: item.editable,
          dataIndex: item.dataIndex,
          title: item.title,
          handleSave,
        }),
      };
    })
    col.children = coldata
    return col
  });

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
/* 
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
  });

  const handlePrintInNewWindow = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Content</title>
        </head>
        <body>
          ${handlePrint()}
        </body>
      </html>
    `);
    printWindow.print();
  }; */



  // const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const {
    customerPaymentName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <TempView title={`Customer Payment`} >
        <FormLayout dynamicForm={customerPaymentForm} customAlign={true} onChangeCallBack={{ "onHandleCustomer": onHandleCustomer }} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
        <div className="d-flex justify-content-end mx-3 mt-3">
          <Link className="btn btn-primary mx-4 mt-1" onClick={onSearchCustomer} >
            {`Search`}
          </Link>
        </div>
        <div className="mt-5">
        {/*   <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            rowKey={(record) => record.key}
            dataSource={dataSource}
            columns={columnsData}
            pagination={false}
            summary={(pageData) => {
              let totalFat = 0;
              let totalsnf = 0;
              let totalqty = 0;
              let totalRate = 0;
              let totalAmount = 0;
              let EtotalFat = 0;
              let Etotalsnf = 0;
              let Etotalqty = 0;
              let EtotalRate = 0;
              let EtotalAmount = 0;
              pageData.forEach(({ snf, qty, fat, rate, amount, Esnf, Eqty, Efat, Erate, Eamount }) => {
                totalsnf += parseFloat(snf);
                totalqty += parseFloat(qty);
                totalFat += parseFloat(fat);
                totalRate += parseFloat(rate);
                totalAmount += parseFloat(amount);
                Etotalsnf += parseFloat(Esnf);
                Etotalqty += parseFloat(Eqty);
                EtotalFat += parseFloat(Efat);
                EtotalRate += parseFloat(Erate);
                EtotalAmount += parseFloat(Eamount);
              });
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} > <b>{state?.customerId?.customerId || "-"} </b></Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>Total</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalFat.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalsnf.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalqty.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalRate.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalAmount.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>{EtotalFat.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{Etotalsnf.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{Etotalqty.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{EtotalRate.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{EtotalAmount.toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}> <b>ACCOUNT SUMMARY/ கணக்கு சுருக்கம்</b></Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={7}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>AMOUNT/ தொகை</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>{(EtotalAmount + totalAmount).toFixed(2)}</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={9}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>CATTLE FEED/தீவனம்</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>0</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={9}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>BONUS</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>0</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={9}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>ADVANCE</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>0</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={9}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>PENDING /நிலுவை</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text ><b>0</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={9}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text><b>நிகர தொகை</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text ><b>0</b></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
            scroll={{
              x: 100,
            }}
            size="small"
          /> */}
          <div >
          <DownloadTemplate data={dataSource || []} ref={contentToPrint} />
          
          
          {/* <div className="d-flex justify-content-end mx-3 mt-3">
            <Link className="btn btn-primary mx-4 mt-1" onClick={handlePrintInNewWindow} >
              {`Print`}
            </Link>
          </div> */}
          </div>
        </div>

        {/* <div ref={contentToPrint}>Hello Again</div> */}
      <button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        PRINT
      </button>

      </TempView>
    </>
  );
}

export default CustomerPayment;