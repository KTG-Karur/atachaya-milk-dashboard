import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, createCustomer, updateCustomer } from "../../api/CustomerApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { customerForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getCustomerCategory } from "../../api/CustomerCategoryApi";
import { getCenter } from "../../api/CenterApi";

let editData = false;

const Customer = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getCustomerSuccess = useSelector((state) => state.customerReducer.getCustomerSuccess);
  const getCustomerList = useSelector((state) => state.customerReducer.getCustomerList);
  const getCustomerFailure = useSelector((state) => state.customerReducer.getCustomerFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const createCustomerSuccess = useSelector((state) => state.customerReducer.createCustomerSuccess);
  const createCustomerData = useSelector((state) => state.customerReducer.createCustomerData);
  const createCustomerFailure = useSelector((state) => state.customerReducer.createCustomerFailure);

  const updateCustomerSuccess = useSelector((state) => state.customerReducer.updateCustomerSuccess);
  const updateCustomerData = useSelector((state) => state.customerReducer.updateCustomerData);
  const updateCustomerFailure = useSelector((state) => state.customerReducer.updateCustomerFailure);

  const customerErrorMessage = useSelector((state) => state.customerReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Customer Code",
      dataIndex: "customerCode",
      key: "customerCode",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
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
  ]

  const [state, setState] = useState({})

  const [parentList, setParentList] = useState([])
  const [createModule, setCreateModule] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [statusModule, setStatusModule] = useState(false)
  const [editModule, setEditModule] = useState(false)
  const [appointmentModule, setAppointmentModule] = useState(false)
  const [viewModule, setViewModule] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getCustomer(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerSuccess) {
      setParentList(getCustomerList)
      dispatch({ type: "RESET_GET_CUSTOMER" })
    } else if (getCustomerFailure) {
      setParentList([])
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

  useEffect(() => {
    if (createCustomerSuccess) {
      const temp_state = [createCustomerData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_CUSTOMER" })
    } else if (createCustomerFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER" })
    }
  }, [createCustomerSuccess, createCustomerFailure]);

  useEffect(() => {
    if (updateCustomerSuccess) {
      updateTable(updateCustomerData[0])
      dispatch({ type: "RESET_UPDATE_CUSTOMER" })
    } else if (updateCustomerFailure) {
      dispatch({ type: "RESET_UPDATE_CUSTOMER" })
    }
  }, [updateCustomerSuccess, updateCustomerFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerId != selectedItem.customerId;
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
      customerName: "",
      centerId: "",
      contactNo: "",
      bankName: "",
      branchName: "",
      accountNo: "",
      ifsc: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    setState({
      ...state,
      customerName: data?.customerName || "",
      contactNo: data?.contactNo || "",
      bankName: data?.bankName || "",
      branchName: data?.branchName || "",
      accountNo: data?.accountNo || "",
      ifsc: data?.ifsc || "",
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
      customerName: customerName,
      contactNo: contactNo,
      bankName: bankName,
      branchName: branchName,
      accountNo: accountNo,
      ifsc: ifsc,
      centerId: centerId?.centerId || ""
    }
    if (editData) {
      dispatch(updateCustomer(request, selectedItem.customerId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomer(deleteRequest, selectedItem.customerId))
    } else {
      dispatch(createCustomer(request))
    }
  }

  const {
    customerName,
    contactNo,
    bankName,
    branchName,
    accountNo,
    ifsc,
    centerId,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="lg" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Customer`}>
        <FormLayout dynamicForm={customerForm} noOfColumns={2} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Customer`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Customer List"} onClickForm={ onCreateForm} uniqueKey={"customerId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Customer;