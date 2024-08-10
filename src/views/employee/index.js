import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, createEmployee, updateEmployee } from "../../api/EmployeeApi";
import _ from "lodash";
import { MdAddTask, MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { employeeForm, editEmployeeForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import TempView from "../../components/Atom/TempView";
import { Link } from "react-router-dom";
import { getCenter } from "../../api/CenterApi";
import { getRole } from "../../api/RoleApi";

let editData = false;

const Employee = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();

  const getEmployeeSuccess = useSelector((state) => state.employeeReducer.getEmployeeSuccess);
  const getEmployeeList = useSelector((state) => state.employeeReducer.getEmployeeList);
  const getEmployeeFailure = useSelector((state) => state.employeeReducer.getEmployeeFailure);

  const getRoleSuccess = useSelector((state) => state.roleReducer.getRoleSuccess);
  const getRoleList = useSelector((state) => state.roleReducer.getRoleList);
  const getRoleFailure = useSelector((state) => state.roleReducer.getRoleFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

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
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      sorter: (a, b) => a.employeeName.length - b.employeeName.length,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
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

  const [state, setState] = useState({})
  const [parentList, setParentList] = useState([])
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
    dispatch(getEmployee(requestData))
    dispatch(getCenter(requestData))
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
    if (getCenterSuccess) {
      setState({
        ...state,
        centerList: getCenterList
      })
      const requestData = {
        isActive: 1
      }
      dispatch(getRole(requestData))
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
    if (getRoleSuccess) {
      setState({
        ...state,
        roleList: getRoleList
      })
      dispatch({ type: "RESET_GET_ROLE" })
    } else if (getRoleFailure) {
      setState({
        ...state,
        roleList: []
      })
      dispatch({ type: "RESET_GET_ROLE" })
    }
  }, [getRoleSuccess, getRoleFailure]);

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
      roleId: "",
      userName: "",
      password: "",
      accountNo: "",
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

  const onEditForm = (data, index) => {
    setGetViewModule(false)
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    const selectedRoleObj = filterArray(state.roleList, "roleId", data.roleId)
    setState({
      ...state,
      userName: data?.userName || "",
      password: data?.password || "",
      employeeName: data?.employeeName || "",
      contactNo: data?.contactNo || "",
      bankName: data?.bankName || "",
      ifscCode: data?.ifscCode || "",
      branchName: data?.branchName || "",
      accountNo: data?.accountNo || "",
      centerId: selectedCenterObj[0] || {},
      roleId: selectedRoleObj[0] || {},
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
      centerId: centerId?.centerId || "",
      roleId: roleId?.roleId || "",
      accountNo: accountNo,
      userDetails :{
        userName: userName,
        password: password,
      }
    }
    if (editData) {
      delete request.userDetails;
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
    roleId,
    bankName,
    ifscCode,
    branchName,
    centerId,
    userName,
    password,
    accountNo,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"
  const modelForm = editData != true ? employeeForm : editEmployeeForm

  return (
    <>
      {/* <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Employee`}> */}
      {createModule && 
      <TempView title={`${modelHeaderTitle} Employee`} closeModule={() => closeModule()}>
        <FormLayout dynamicForm={modelForm} ref={errorHandles} noOfColumns={3} defaultState={state} setDefaultState={setState} onSubmit={onSubmitForm} ></FormLayout>
        <div className="d-flex justify-content-end">
            <Link className="btn btn-primary mt-5 mx-2" onClick={onSubmitForm}>
              <MdAddTask size={18} className="mx-2" />
              Submit &nbsp;
            </Link>
          </div>
        </TempView>
}
      {/* </ModalViewBox> */}

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Employee`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>
      {getViewModule &&
        <TemplateCustomTable tableName={"Employee List"} onClickForm={onCreateForm} uniqueKey={"employeeId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
      }
    </>
  );
}

export default Employee;