import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, createEmployee, updateEmployee } from "../../api/EmployeeApi";
import _ from "lodash";
import { MdAddTask, MdCloudUpload, MdDelete, MdEdit, MdSwapHorizontalCircle } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { dailyEntryForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import TempView from "../../components/Atom/TempView";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { Button, Form, Input, Popconfirm, Space, Table, Typography } from "antd";
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

  const getEmployeeSuccess = useSelector((state) => state.employeeReducer.getEmployeeSuccess);
  const getEmployeeList = useSelector((state) => state.employeeReducer.getEmployeeList);
  const getEmployeeFailure = useSelector((state) => state.employeeReducer.getEmployeeFailure);

  const createEmployeeSuccess = useSelector((state) => state.employeeReducer.createEmployeeSuccess);
  const createEmployeeData = useSelector((state) => state.employeeReducer.createEmployeeData);
  const createEmployeeFailure = useSelector((state) => state.employeeReducer.createEmployeeFailure);

  const updateEmployeeSuccess = useSelector((state) => state.employeeReducer.updateEmployeeSuccess);
  const updateEmployeeData = useSelector((state) => state.employeeReducer.updateEmployeeData);
  const updateEmployeeFailure = useSelector((state) => state.employeeReducer.updateEmployeeFailure);

  const employeeErrorMessage = useSelector((state) => state.employeeReducer.errorMessage);

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

  const onCustomerEdit = (data, index)=>{
    selectedItem(data)
    selectedIndex(index)
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
          dataIndex: 'date',
          key: 'date',
          width: '5%',
          onCell: sharedOnCell,
          render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>,
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
   

  ];


  const [state, setState] = useState({
    centerList: [
      {
        "centerId": 1,
        "centerName": "VengamPatty"
      },
      {
        "centerId": 2,
        "centerName": "MettuPatty"
      },
      {
        "centerId": 3,
        "centerName": "Varagur"
      },
    ]
  })
  const [parentList, setParentList] = useState([
    {
      centerId : "1",
      centerName: "VengamPatty",
      createdOn: "12-07-2023",
    },
    {
      centerId : "2",
      centerName: "MettuPatty",
      createdOn: "14-07-2023",
    },
    {
      centerId : "3",
      centerName: "Varagur",
      createdOn: "16-07-2023",
    },
  ])
  const [createModule, setCreateModule] = useState(false)
  const [getViewModule, setGetViewModule] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);


  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    // dispatch(getEmployee(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getEmployeeSuccess) {
      setParentList(getEmployeeList)
      dispatch({ type: "RESET_GET_EMPLOYEE" })
    } else if (getEmployeeFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_EMPLOYEE" })
    }
  }, [getEmployeeSuccess, getEmployeeFailure]);

  useEffect(() => {
    if (createEmployeeSuccess) {
      const temp_state = [createEmployeeData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_EMPLOYEE" })
    } else if (createEmployeeFailure) {
      dispatch({ type: "RESET_CREATE_EMPLOYEE" })
    }
  }, [createEmployeeSuccess, createEmployeeFailure]);

  useEffect(() => {
    if (updateEmployeeSuccess) {
      updateTable(updateEmployeeData[0])
      dispatch({ type: "RESET_UPDATE_EMPLOYEE" })
    } else if (updateEmployeeFailure) {
      dispatch({ type: "RESET_UPDATE_EMPLOYEE" })
    }
  }, [updateEmployeeSuccess, updateEmployeeFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.employeeId != selectedItem.employeeId;
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
    setGetViewModule(true)
    setDeleteModule(false)
    editData = false
  }

  const clearState = () => {
    setState({
      ...state,
      employeeName: "",
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
    setGetViewModule(false)
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

          // Remove the first row (header row) from data
          const dataWithHeaders = jsonData.slice(1).map(row => {
            let rowData = {};
            row.forEach((cell, index) => {
              // Convert Excel date serial number to formatted date for 'date' column
              if (headers[index] === 'date') {
                rowData['date'] = convertExcelDateToFormattedDate(cell);
              } else {
                rowData[headers[index]] = cell;
              }
            });
            return rowData;
          });

          // Function to convert Excel date serial number to formatted date (DD/MM/YYYY)
          function excelDateToJsDate(excelDate) {
            var millisecondsInDay = 86400000;
            var startDate = new Date("1899-12-30T00:00:00");
            startDate.setMilliseconds(startDate.getMilliseconds() + (excelDate * millisecondsInDay));
            return startDate;
          }

          function convertExcelDateToFormattedDate(excelDate) {
            var jsDate = excelDateToJsDate(excelDate);
            var day = jsDate.getDate();
            var month = jsDate.getMonth() + 1;
            var year = jsDate.getFullYear();
            return day + "/" + month + "/" + year;
          }

          let groupedByFarmer = _.groupBy(dataWithHeaders, (entry) => entry.FarmerName.trim());
          // console.log(JSON.stringify(groupedByFarmer));

          let renamedGroupedByFarmer = {};
          let farmerIndex = 1;

          for (let key in groupedByFarmer) {
            renamedGroupedByFarmer[`farmer${farmerIndex}`] = groupedByFarmer[key];
            farmerIndex++;
          }

          // console.log(JSON.stringify(renamedGroupedByFarmer));
          const countLength = Object.keys(renamedGroupedByFarmer).length
          // console.log(countLength)

        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      };

      // Read the file as binary
      reader.readAsBinaryString(file);
    }
  };

  const onEditForm = (data, index) => {
    setGetViewModule(false)
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    setState({
      ...state,
      // centerId: data?.centerId || "",
      /* password: data?.password || "",
      centerId: data?.centerId || "",
      employeeName: data?.employeeName || "",
      contactNo: data?.contactNo || "",
      bankName: data?.bankName || "",
      ifscCode: data?.ifscCode || "",
      branchName: data?.branchName || "", */
      centerId: selectedCenterObj || {},
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
      employeeName: employeeName,
      contactNo: contactNo,
      bankName: bankName,
      ifscCode: ifscCode,
      branchName: branchName,
      centerId: centerId,
      userName: userName,
      password: password,
    }
    if (editData) {
      delete request.userName;
      delete request.password;
      dispatch(updateEmployee(request, selectedItem.employeeId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateEmployee(deleteRequest, selectedItem.employeeId))
    } else {
      dispatch(createEmployee(request))
    }
  }

  const {
    employeeName,
    contactNo,
    bankName,
    ifscCode,
    branchName,
    centerId,
    userName,
    password,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"
  const data = []

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      date: '11-7-2022',
      snf: '32',
      qty: '14',
      fat: '14',
      rate: '340',
    },
    {
      key: '1',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
    {
      key: '2',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
    {
      key: '3',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
    {
      key: '4',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
    {
      key: '5',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
    {
      key: '6',
      date: '12-7-2022',
      snf: '32',
      fat: '14',
      qty: '22',
      rate: '340',
    },
  ]);
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
    console.log("data------>")
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

  console.log(JSON.stringify(columnsData))

  return (
    <>
      <TempView>
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
              pageData.forEach(({ snf, qty, fat, rate }) => {
                totalsnf += parseInt(snf);
                totalqty += parseInt(qty);
                totalFat += parseInt(fat);
                totalRate += parseInt(rate);
                totalAmount += parseInt(rate);
              });
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}> <b>3 Total</b></Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>{totalFat}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalsnf}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalqty}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalRate}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalRate}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text><b>{totalFat}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalsnf}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalqty}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalRate}</b></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell >
                      <Text><b>{totalRate}</b></Text>
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
                      <Text><b>2000</b></Text>
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
            size = "small"
          />
        </div>
      </TempView>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Daily Entry`}>
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

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Employee`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>
      <TemplateCustomTable tableName={"Daily Entry List"} onClickForm={onCreateForm} uniqueKey={"employeeId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />

    </>
  );
}

export default DailyEntry;