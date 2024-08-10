import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransportEntry, createTransportEntry, updateTransportEntry } from "../../api/TransportEntryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { transportEntryForm, transportEntryIssuseForm } from "./formData";
import { filterArray, removeNullKeyFromObj, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getTransportDriver } from "../../api/TransportDriverApi";
import { getShift } from "../../api/ShiftApi";
import { getTransportSettings } from "../../api/TransportSettingsApi";

let editData = false;

const TransportEntry = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*  const userDetails = localStorage.getItem("userDetails")
   const localData = JSON.parse(userDetails)
   let pageAccessData = filterArray(localData.pages, "pageId", 4)
   let accessIds = pageAccessData[0].access.split(',') */

  const getTransportDriverSuccess = useSelector((state) => state.transportDriverReducer.getTransportDriverSuccess);
  const getTransportDriverList = useSelector((state) => state.transportDriverReducer.getTransportDriverList);
  const getTransportDriverFailure = useSelector((state) => state.transportDriverReducer.getTransportDriverFailure);

  const getShiftSuccess = useSelector((state) => state.shiftReducer.getShiftSuccess);
  const getShiftList = useSelector((state) => state.shiftReducer.getShiftList);
  const getShiftFailure = useSelector((state) => state.shiftReducer.getShiftFailure);

  const getTransportSettingsSuccess = useSelector((state) => state.transportSettingsReducer.getTransportSettingsSuccess);
  const getTransportSettingsList = useSelector((state) => state.transportSettingsReducer.getTransportSettingsList);
  const getTransportSettingsFailure = useSelector((state) => state.transportSettingsReducer.getTransportSettingsFailure);

  const getTransportEntrySuccess = useSelector((state) => state.transportEntryReducer.getTransportEntrySuccess);
  const getTransportEntryList = useSelector((state) => state.transportEntryReducer.getTransportEntryList);
  const getTransportEntryFailure = useSelector((state) => state.transportEntryReducer.getTransportEntryFailure);

  const createTransportEntrySuccess = useSelector((state) => state.transportEntryReducer.createTransportEntrySuccess);
  const createTransportEntryData = useSelector((state) => state.transportEntryReducer.createTransportEntryData);
  const createTransportEntryFailure = useSelector((state) => state.transportEntryReducer.createTransportEntryFailure);

  const updateTransportEntrySuccess = useSelector((state) => state.transportEntryReducer.updateTransportEntrySuccess);
  const updateTransportEntryData = useSelector((state) => state.transportEntryReducer.updateTransportEntryData);
  const updateTransportEntryFailure = useSelector((state) => state.transportEntryReducer.updateTransportEntryFailure);

  const transportEntryErrorMessage = useSelector((state) => state.transportEntryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Shift",
      dataIndex: "shiftId",
      key: "shiftId",
      render: (value, item, index) => (value == 1 ? "Morning" : "Evening"),
    },
    {
      title: "Kilometer",
      dataIndex: "km",
      key: "km"
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      key: "totalAmt"
    },
    {
      title: "Status",
      key: "transportIssuse",
      render: (record) => (
        <div>
          {record?.transportIssuse ? (
            <span className="badge badge-pill bg-danger-light">Issuse</span>
          ) : (
            <span className="badge badge-pill bg-success-light">Non-Issuse</span>
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
  ].filter(Boolean);

  const [state, setState] = useState({
    deduction : 0,
    additionalAmt : 0,
    amount : null
  })
  const [parentList, setParentList] = useState([])
  const [formDataArr, setFormDataArr] = useState(transportEntryForm)
  const [createModule, setCreateModule] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getTransportEntry(requestData))
    dispatch(getTransportDriver(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getTransportEntrySuccess) {
      setParentList(getTransportEntryList)
      dispatch({ type: "RESET_GET_TRANSPORT_ENTRY" })
    } else if (getTransportEntryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_TRANSPORT_ENTRY" })
    }
  }, [getTransportEntrySuccess, getTransportEntryFailure]);

  useEffect(() => {
    if (getTransportDriverSuccess) {
      setState({
        ...state,
        transportDriverList: getTransportDriverList
      })
      const req = {
        isActive: 1
      }
      dispatch(getShift(req))
      dispatch({ type: "RESET_GET_TRANSPORT_DRIVER" })
    } else if (getTransportDriverFailure) {
      setState({
        ...state,
        transportDriverList: []
      })
      dispatch({ type: "RESET_GET_TRANSPORT_DRIVER" })
    }
  }, [getTransportDriverSuccess, getTransportDriverFailure]);
 
  useEffect(() => {
    if (getTransportSettingsSuccess) {
      setState({
        ...state,
        transportSettingsList: getTransportSettingsList,
        perKmPrice : getTransportSettingsList[0].perKmPrice
      })
      dispatch({ type: "RESET_GET_TRANSPORT_SETTINGS" })
    } else if (getTransportSettingsFailure) {
      setState({
        ...state,
        transportSettingsList: []
      })
      dispatch({ type: "RESET_GET_TRANSPORT_SETTINGS" })
    }
  }, [getTransportSettingsSuccess, getTransportSettingsFailure]);

  useEffect(() => {
    if (getShiftSuccess) {
      setState({
        ...state,
        shiftList: getShiftList
      })
      const req = {
        isActive: 1
      }
      dispatch(getTransportSettings(req))
      dispatch({ type: "RESET_GET_SHIFT" })
    } else if (getShiftFailure) {
      setState({
        ...state,
        shiftList: []
      })
      dispatch({ type: "RESET_GET_SHIFT" })
    }
  }, [getShiftSuccess, getShiftFailure]);

  useEffect(() => {
    if (createTransportEntrySuccess) {
      const temp_state = [createTransportEntryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_TRANSPORT_ENTRY" })
    } else if (createTransportEntryFailure) {
      dispatch({ type: "RESET_CREATE_TRANSPORT_ENTRY" })
    }
  }, [createTransportEntrySuccess, createTransportEntryFailure]);

  useEffect(() => {
    if (updateTransportEntrySuccess) {
      updateTable(updateTransportEntryData[0])
      dispatch({ type: "RESET_UPDATE_TRANSPORT_ENTRY" })
    } else if (updateTransportEntryFailure) {
      dispatch({ type: "RESET_UPDATE_TRANSPORT_ENTRY" })
    }
  }, [updateTransportEntrySuccess, updateTransportEntryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.transportEntryId != selectedItem.transportEntryId;
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

  useEffect(() => {
    if(state.amount != null){
     const totalValue = parseFloat(state?.amount || 0) -parseFloat(state?.penalty || 0) - parseFloat(state?.deduction || 0) + parseFloat(state?.additionalAmt || 0)
     setState({
       ...state,
       totalAmt : totalValue
     })
    }
   }, [state.amount, state.deduction, state.additionalAmt, state.penalty]);

   const onHandleIssuse = (event) => {
    formFields(event.target.checked)
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const formFields = (val)=>{
    if (val == true) {
      setFormDataArr(transportEntryIssuseForm)
    } else {
      setFormDataArr(transportEntryForm)
    }
  } 

  const onHandleKilometer = (event) => {
    const value = event.target.value != "" ? event.target.value : 0
    const amt = parseFloat(value) * parseFloat(state.perKmPrice)
    setState({
      ...state,
      [event.target.name]: event.target.value,
      amount : amt.toFixed(2)
    })
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
      transportDriverId: "",
      issuseReason: "",
      transportIssuse: "",
      alterPersonName: "",
      alterContactNo: "",
      penaltyReason: "",
      km: "",
      amount : "",
      penalty: 0,
      additionalAmt: 0,
      shiftId: "",
      deduction: 0,
      totalAmt: "",
      additionalAmtReason: "",
      deductionReason: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedtransportDriverObj = filterArray(state.transportDriverList, "driverId", data.transportDriverId)
    const selectedShiftObj = filterArray(state.shiftList, "shiftId", data.shiftId)
    const checkboxVal = data?.transportIssuse == 1 ? true : false
    formFields(checkboxVal)
    setState({
      ...state,
      transportDriverId: selectedtransportDriverObj[0] || "",
      shiftId: selectedShiftObj[0] || "",
      km: data?.km || "",
      amount: data?.amount || "",
      deduction: data?.deduction || 0,
      deductionReason: data?.deductionReason || "",
      additionalAmt: data?.additionalAmt || 0,
      additionalAmtReason: data?.additionalAmtReason || "",
      penalty: data?.penalty || 0,
      penaltyReason: data?.penaltyReason || "",
      totalAmt: data?.totalAmt || "",
      transportIssuse: checkboxVal || "",
      alterPersonName: data?.alterPersonName || "",
      alterContactNo: data?.alterContactNo || "",
      issuseReason: data?.issuseReason || "",
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
    let request = {
      km: state?.km || null,
      amount: state?.amount || null,
      deduction: state?.deduction || null,
      deductionReason: state?.deductionReason || null,
      additionalAmt: state?.additionalAmt || null,
      additionalAmtReason: state?.additionalAmtReason || null,
      penalty: state?.penalty || null,
      penaltyReason: state?.penaltyReason || null,
      totalAmt: state?.totalAmt || null,
      transportIssuse: state?.transportIssuse == true ? 1 : 0,
      shiftId: state?.shiftId.shiftId || null,
    }
    if(state?.transportIssuse == ""){
      request.driverId = state?.transportDriverId?.transportDriverId || null,
      request.alterPersonName = ""
      request.alterContactNo = ""
      request.issuseReason = ""
    }else{
      request.driverId = "",
      request.alterPersonName = state?.alterPersonName || null
      request.alterContactNo = state?.alterPersonName || null
      request.issuseReason = state?.issuseReason || null
    }
    if (editData) {
      dispatch(updateTransportEntry(request, selectedItem.transportEntryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateTransportEntry(deleteRequest, selectedItem.transportEntryId))
    } else {
      dispatch(createTransportEntry(request))
    }
  }

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"  

  return (
    <>
      <ModalViewBox show={createModule} size="lg" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onSubmitForm} title={`${modelHeaderTitle} Transport Entry`}>
        <FormLayout dynamicForm={formDataArr} customAlign={true} onChangeCallBack={{ "onHandleIssuse": onHandleIssuse, "onHandleKilometer": onHandleKilometer }} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Transport Entry`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Transport Entry List"} onClickForm={onCreateForm} uniqueKey={"transportEntryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default TransportEntry;