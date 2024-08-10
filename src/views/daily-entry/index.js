import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntry, createEntry, updateEntry } from "../../api/EntryApi";
import _ from "lodash";
import { MdAddTask, MdCloudUpload, MdDelete, MdEdit, MdSwapHorizontalCircle } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { dailyEntryForm, editByCustomerForm } from "./formData";
import { dateConversionNormal, filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import TempView from "../../components/Atom/TempView";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { Button, Form, Input, Popconfirm, Space, Table, Typography } from "antd";
import { getCustomer } from "../../api/CustomerApi";
import { getCenter } from "../../api/CenterApi";
import moment from "moment";
import { getEntryDetails, updateEntryDetails } from "../../api/EntryDetailsApi";
// import { Text } from "antd/Typography";

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

const DailyEntry = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const fileInputRef = useRef(null);

  const getEntrySuccess = useSelector((state) => state.entryReducer.getEntrySuccess);
  const getEntryList = useSelector((state) => state.entryReducer.getEntryList);
  const getEntryFailure = useSelector((state) => state.entryReducer.getEntryFailure);

  const getEntryDetailsSuccess = useSelector((state) => state.entryDetailsReducer.getEntryDetailsSuccess);
  const getEntryDetailsList = useSelector((state) => state.entryDetailsReducer.getEntryDetailsList);
  const getEntryDetailsFailure = useSelector((state) => state.entryDetailsReducer.getEntryDetailsFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const createEntrySuccess = useSelector((state) => state.entryReducer.createEntrySuccess);
  const createEntryData = useSelector((state) => state.entryReducer.createEntryData);
  const createEntryFailure = useSelector((state) => state.entryReducer.createEntryFailure);

  const getCustomerSuccess = useSelector((state) => state.customerReducer.getCustomerSuccess);
  const getCustomerList = useSelector((state) => state.customerReducer.getCustomerList);
  const getCustomerFailure = useSelector((state) => state.customerReducer.getCustomerFailure);

  const updateEntrySuccess = useSelector((state) => state.entryReducer.updateEntrySuccess);
  const updateEntryData = useSelector((state) => state.entryReducer.updateEntryData);
  const updateEntryFailure = useSelector((state) => state.entryReducer.updateEntryFailure);

  const entryErrorMessage = useSelector((state) => state.entryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
      sorter: (a, b) => a.centerName.length - b.centerName.length,
    },
    {
      title: "Upload Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (record, item, index) => {
        return dateConversionNormal(record, "DD-MM-YYYY")}
    },
    {
      title: "Action",
      key: "Action",
      render: (record, item, index) => (
        <>
          <div >
            <MdSwapHorizontalCircle
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onCustomerEdit(record, index)} />
            <MdEdit
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onEditForm(record, index)}
            ></MdEdit>
            <MdDelete
              className="text-danger cursor-pointer"
              size={18}
              onClick={() => showConfirmationDialog(
                "You won't be able to revert this!",
                () => onDeleteItem(record, index),
                "Yes, Delete it!"
              )}
            ></MdDelete>
          </div>
        </>
      ),
    },
  ];

  const onCustomerEdit = (data, index) => {
    const request = {
      centerId: data.centerId
    }
    dispatch(getCustomer(request))
    // alert(JSON.stringify(request))
    setSelectedItem(data)
    setSelectedIndex(index)
  }

  const sharedOnCell = (_, index) => {
    /*  if (index === 1) {
       return {
         colSpan: 0,
       };
     } */
    return {};
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
          onCell: sharedOnCell,
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
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'இதரசத்து',
          dataIndex: 'snf',
          key: 'snf',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'அளவு',
          dataIndex: 'qty',
          key: 'qty',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'விலை',
          dataIndex: 'rate',
          key: 'rate',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'தொகை',
          dataIndex: 'amount',
          key: 'amount',
          editable: true,
          onCell: sharedOnCell,
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
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'இதரசத்து',
          dataIndex: 'Esnf',
          key: 'Esnf',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'அளவு',
          dataIndex: 'Eqty',
          key: 'Eqty',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'விலை',
          dataIndex: 'Erate',
          key: 'Erate',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },
        {
          title: 'தொகை',
          dataIndex: 'Eamount',
          key: 'Eamount',
          editable: true,
          onCell: sharedOnCell,
          width: '5%',
        },

      ],
    },


  ];


  const [state, setState] = useState({})
  const [dataSource, setDataSource] = useState([]);
  const [parentList, setParentList] = useState([])
  const [createModule, setCreateModule] = useState(false)
  const [getViewModule, setGetViewModule] = useState(true)
  const [customerDataView, setCustomerDataView] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [editByCustomer, setEditByCustomer] = useState(false)
  const [show, setShow] = useState(false);


  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getEntry(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getEntrySuccess) {
      setParentList(getEntryList)
      dispatch({ type: "RESET_GET_ENTRY" })
    } else if (getEntryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_ENTRY" })
    }
  }, [getEntrySuccess, getEntryFailure]);

  useEffect(() => {
    if (createEntrySuccess) {
      const temp_state = [createEntryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_ENTRY" })
    } else if (createEntryFailure) {
      dispatch({ type: "RESET_CREATE_ENTRY" })
    }
  }, [createEntrySuccess, createEntryFailure]);

  useEffect(() => {
    if (getCustomerSuccess) {
      setState({
        ...state,
        customerId: "",
        customerList: getCustomerList
      })
      setEditByCustomer(true)
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
    if (getEntryDetailsSuccess) {
      setEditByCustomer(false)
      setGetViewModule(false)
      setCustomerDataView(true)
      setDataSource(getEntryDetailsList)
      dispatch({ type: "RESET_GET_ENTRY_DETAILS" })
    } else if (getEntryDetailsFailure) {
      setDataSource([])
      dispatch({ type: "RESET_GET_ENTRY_DETAILS" })
    }
  }, [getEntryDetailsSuccess, getEntryDetailsFailure]);

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

  useEffect(() => {
    if (updateEntrySuccess) {
      updateTable(updateEntryData[0])
      dispatch({ type: "RESET_UPDATE_ENTRY" })
    } else if (updateEntryFailure) {
      dispatch({ type: "RESET_UPDATE_ENTRY" })
    }
  }, [updateEntrySuccess, updateEntryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.entryId != selectedItem.entryId;
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

  const closeModule = () => {
    setCreateModule(false)
    setCustomerDataView(false)
    setGetViewModule(true)
    setDeleteModule(false)
    editData = false
  }

  const clearState = () => {
    setState({
      ...state,
      entryName: "",
      contactNo: "",
      bankName: "",
      ifscCode: "",
      branchName: "",
      centerId: "",
      userName: "",
      password: "",
    })
  }

  const onDeleteItem = (data, index) => {
    setSelectedIndex(index)
    setSelectedItem(data)
    setDeleteModule(true)
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    // setGetViewModule(false)
    setCreateModule(true)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
      
        try {
          /* Parse data */
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });

          /* Get first worksheet */
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          /* Convert to JSON with headers */
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Use the first row for headers
          const headers = jsonData[0];
          const dataWithHeaders = jsonData.slice(1).map(row => {
            let rowData = {};
            row.forEach((cell, index) => {
              // Convert Excel date serial number to formatted date for 'date' column
              if (headers[index] === 'date') {
                const date = moment(new Date((cell - 25569) * 86400 * 1000));
                const dateData = date
                rowData['date'] = moment(dateData, "DD-MM-YYYY").format("YYYY-MM-DD")
              } else if (headers[index] === 'shift') {
                const dateData = cell == 'M' ? 1 : 2;
                rowData['shiftId'] = dateData
              }else if (headers[index] === 'centerCode') {
                rowData['centerId'] = cell
              }else if (headers[index] === 'customerCode') {
                rowData['customerId'] = cell
              } else {
                rowData[headers[index]] = cell;
              }
            });
            console.log(rowData)
            return rowData;
          });
          const maxDate = _.maxBy(dataWithHeaders, 'date');
          const minDate = _.minBy(dataWithHeaders, 'date');
          setState({
            ...state,
            entryDetails: dataWithHeaders,
            fromDate : minDate.date,
            toDate : maxDate.date
          })
        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const onEditForm = (data, index) => {
    setGetViewModule(false)
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    setState({
      ...state,
      centerId: selectedCenterObj[0] || {},
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
    const request = {
      centerId: centerId.centerId,
      fromDate : state.fromDate,
      toDate : state.toDate,
      entryDetails : state.entryDetails
    }
    if (editData) {
      dispatch(updateEntry(request, selectedItem.entryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateEntry(deleteRequest, selectedItem.entryId))
    } else {
      dispatch(createEntry(request))
    }
  }

  const {
    centerId,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"
  const data = []

  
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const onSearchCustomer = ()=>{
   const request = {
    customerId : state.customerId.customerId
    }
    dispatch(getEntryDetails(request))
  }

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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

  const onUpdateCustomerRecord = ()=>{
    let request =[]
    dataSource.map((item,index)=>{
      let eveningObject = {}
      let morningObj = {}
      eveningObject = _.mapKeys(_.pickBy(item, (value, key) => key.startsWith('E')), (value, key) => key.replace(/^E/, ''));
      eveningObject.entryDate = item.entryDate
      eveningObject.entryId = item.entryId
      eveningObject.centerId = item.centerId
      request.push(eveningObject)
      morningObj = _.omitBy(item, (value, key) => key.startsWith('E'));
      request.push(morningObj)
    })
    dispatch(updateEntryDetails(request))
  }

  return (
    <>
     { customerDataView && <TempView title={`Customer Entry`} closeModule={() => closeModule()}>
        <div className="mt-3 mb-5">
          <Table
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
              pageData.forEach(({ snf, qty, fat, rate,amount, Esnf, Eqty, Efat, Erate, Eamount  }) => {
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
                    <Table.Summary.Cell index={0} > <b>{state?.customerId.customerId || "-"} </b></Table.Summary.Cell>
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
          />
           <div className="d-flex justify-content-end mt-3 mx-3">
           <Link className="btn btn-primary" onClick={onUpdateCustomerRecord}>
            <i
              className="fa fa-check me-2"
              aria-hidden="true"
            />
            Submit
          </Link>
           </div>
        </div>
      </TempView>}
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onSubmitForm} title={`${modelHeaderTitle} Daily Entry`}>
        <FormLayout dynamicForm={dailyEntryForm} ref={errorHandles} noOfColumns={1} defaultState={state} setDefaultState={setState} onSubmit={onSubmitForm} ></FormLayout>
        <div className="d-flex justify-content-center mt-3">
          <Link className="btn btn-primary" onClick={handleButtonClick}>
            <i
              className="fa fa-upload me-2"
              aria-hidden="true"
            />
            Upload File
          </Link>
        </div>
        <div className="text-center mt-3">
          File Name :
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </ModalViewBox>

      <ModalViewBox show={editByCustomer} size="sm" savetitle={"Search"} setshow={setEditByCustomer} onSubmit={onSearchCustomer} title={`Select Customer`}>
        <FormLayout dynamicForm={editByCustomerForm} ref={errorHandles} noOfColumns={1} defaultState={state} setDefaultState={setState} onSubmit={onSearchCustomer} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Entry`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      {getViewModule && <TemplateCustomTable tableName={"Daily Entry List"} onClickForm={onCreateForm} uniqueKey={"entryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />}

    </>
  );
}

export default DailyEntry;