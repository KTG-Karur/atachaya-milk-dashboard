import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerAdvance, createCustomerAdvance, updateCustomerAdvance } from "../../api/CustomerAdvanceApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { customerAdvanceForm } from "./formData";
import { dateConversion, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi";
import { getCustomer } from "../../api/CustomerApi";
import moment from "moment";

let editData = false;

const CustomerAdvance = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*   const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)
    let pageAccessData = filterArray(localData.pages, "pageId", 4)
    let accessIds = pageAccessData[0].access.split(',') */

  const getCustomerAdvanceSuccess = useSelector((state) => state.customerAdvanceReducer.getCustomerAdvanceSuccess);
  const getCustomerAdvanceList = useSelector((state) => state.customerAdvanceReducer.getCustomerAdvanceList);
  const getCustomerAdvanceFailure = useSelector((state) => state.customerAdvanceReducer.getCustomerAdvanceFailure);

  const getCustomerSuccess = useSelector((state) => state.customerReducer.getCustomerSuccess);
  const getCustomerList = useSelector((state) => state.customerReducer.getCustomerList);
  const getCustomerFailure = useSelector((state) => state.customerReducer.getCustomerFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const createCustomerAdvanceSuccess = useSelector((state) => state.customerAdvanceReducer.createCustomerAdvanceSuccess);
  const createCustomerAdvanceData = useSelector((state) => state.customerAdvanceReducer.createCustomerAdvanceData);
  const createCustomerAdvanceFailure = useSelector((state) => state.customerAdvanceReducer.createCustomerAdvanceFailure);

  const updateCustomerAdvanceSuccess = useSelector((state) => state.customerAdvanceReducer.updateCustomerAdvanceSuccess);
  const updateCustomerAdvanceData = useSelector((state) => state.customerAdvanceReducer.updateCustomerAdvanceData);
  const updateCustomerAdvanceFailure = useSelector((state) => state.customerAdvanceReducer.updateCustomerAdvanceFailure);

  const customerAdvanceErrorMessage = useSelector((state) => state.customerAdvanceReducer.errorMessage);

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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Advance",
      dataIndex: "advanceAmt",
      key: "advanceAmt",
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
              onClick={() => customerDataFilter(record, index)}
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
  ].filter(Boolean);

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
    dispatch(getCustomerAdvance(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerAdvanceSuccess) {
      setParentList(getCustomerAdvanceList)
      dispatch({ type: "RESET_GET_CUSTOMER_ADVANCE" })
    } else if (getCustomerAdvanceFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_CUSTOMER_ADVANCE" })
    }
  }, [getCustomerAdvanceSuccess, getCustomerAdvanceFailure]);

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

  useEffect(() => {
    if (createCustomerAdvanceSuccess) {
      const selectedCustomerId = createCustomerAdvanceData[0].customerId
      const checkExistingCustomer = _.findIndex(parentList, { customerId: selectedCustomerId });
      alert(checkExistingCustomer)
      if(checkExistingCustomer >= 0){
        const temp_state = [...parentList];
        temp_state[checkExistingCustomer] = createCustomerAdvanceData[0];
        setParentList(temp_state)
      }else{
        const temp_state = [createCustomerAdvanceData[0], ...parentList];
        setParentList(temp_state)
        showMessage("success", "Created Successfully...!")
      }
      
      closeModule()
      dispatch({ type: "RESET_CREATE_CUSTOMER_ADVANCE" })
    } else if (createCustomerAdvanceFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER_ADVANCE" })
    }
  }, [createCustomerAdvanceSuccess, createCustomerAdvanceFailure]);

  useEffect(() => {
    if (updateCustomerAdvanceSuccess) {
      updateTable(updateCustomerAdvanceData[0])
      dispatch({ type: "RESET_UPDATE_CUSTOMER_ADVANCE" })
    } else if (updateCustomerAdvanceFailure) {
      dispatch({ type: "RESET_UPDATE_CUSTOMER_ADVANCE" })
    }
  }, [updateCustomerAdvanceSuccess, updateCustomerAdvanceFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerAdvanceId != selectedItem.customerAdvanceId;
      });
      setParentList(remainingData)
      showMessage("success", "Deleted Successfully...!")
    } else {
      console.log(selectedIndex)
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
      centerId: "",
      customerId: "",
      paymentDate: "",
      reason: "",
      advanceAmt: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const customerDataFilter = (data, index)=>{
    editData = true
    setSelectedIndex(index)
    setSelectedItem(data)
    const req={centerId : data.centerId}
    dispatch(getCustomer(req))
  }

  useEffect(() => {
    if (editData) {
      const data = selectedItem
      const index = selectedIndex
      const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
      const selectedCustomerObj = filterArray(state.customerList, "customerId", data.customerId)
      setState({
        ...state,
        centerId: selectedCenterObj[0] || "",
        customerId: selectedCustomerObj[0] || "",
        advanceAmt: data?.advanceAmt || "",
        perviousAdvanceAmt : data?.advanceAmt || "",
        paymentDate: data.lastPaymentDate ? updateDateConversion(data.lastPaymentDate, "DD-MM-YYYY") : "",
        perviousDate : data.lastPaymentDate ? updateDateConversion(data.lastPaymentDate, "DD-MM-YYYY") : "",
        reason : data?.lastUpdateReason
      })
      setCreateModule(true)
    } 
  }, [state.customerList]);

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitForm = () => {
    const dateChecker = state.paymentDate._i && state.paymentDate._i == state.perviousDate._i ? moment(state.paymentDate).add(1, 'days').format('YYYY-MM-DD') : dateConversion(state.paymentDate, "YYYY-MM-DD")
    const request = {
      centerId: centerId?.centerId || "",
      customerId: customerId?.customerId || "",
      advanceAmt: advanceAmt || "",
      lastUpdateReason : reason,
      lastPaymentDate : dateChecker,
      advanceHistoryDetails: {
        centerId: centerId?.centerId || "",
        customerId: customerId?.customerId || "",
        advanceAmount: parseInt(advanceAmt) - parseInt(state?.perviousAdvanceAmt || 0) || "",
        paymentDate: dateChecker || "",
        reason: reason || "",
      }
    }
    if (editData) {
      dispatch(updateCustomerAdvance(request, selectedItem.customerAdvanceId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomerAdvance(deleteRequest, selectedItem.customerAdvanceId))
    } else {
      dispatch(createCustomerAdvance(request))
    }
  }

  const {
    centerId,
    customerId,
    reason,
    perviousAdvanceAmt,
    advanceAmt,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

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

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Customer Advance`}>
        <FormLayout dynamicForm={customerAdvanceForm} onChangeCallBack={{ "onHandleCustomer": onHandleCustomer }} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Customer Advance`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Customer Advance List"} onClickForm={onCreateForm} uniqueKey={"customerAdvanceId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CustomerAdvance;