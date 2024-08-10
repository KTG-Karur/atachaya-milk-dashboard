import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransportDriver, createTransportDriver, updateTransportDriver } from "../../api/TransportDriverApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { transportDriverForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const TransportDriver = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getTransportDriverSuccess = useSelector((state) => state.transportDriverReducer.getTransportDriverSuccess);
  const getTransportDriverList = useSelector((state) => state.transportDriverReducer.getTransportDriverList);
  const getTransportDriverFailure = useSelector((state) => state.transportDriverReducer.getTransportDriverFailure);

  const createTransportDriverSuccess = useSelector((state) => state.transportDriverReducer.createTransportDriverSuccess);
  const createTransportDriverData = useSelector((state) => state.transportDriverReducer.createTransportDriverData);
  const createTransportDriverFailure = useSelector((state) => state.transportDriverReducer.createTransportDriverFailure);

  const updateTransportDriverSuccess = useSelector((state) => state.transportDriverReducer.updateTransportDriverSuccess);
  const updateTransportDriverData = useSelector((state) => state.transportDriverReducer.updateTransportDriverData);
  const updateTransportDriverFailure = useSelector((state) => state.transportDriverReducer.updateTransportDriverFailure);

  const transportDriverErrorMessage = useSelector((state) => state.transportDriverReducer.errorMessage);

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
      sorter: (a, b) => a.driverName.length - b.driverName.length,
    },
    {
      title: "Contact Name",
      dataIndex: "contactNo",
      key: "contactNo"
    },
    {
      title: "Vechile N0",
      dataIndex: "vechileNo",
      key: "vechileNo",
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
    dispatch(getTransportDriver(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getTransportDriverSuccess) {
      setParentList(getTransportDriverList)
      dispatch({ type: "RESET_GET_TRANSPORT_DRIVER" })
    } else if (getTransportDriverFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_TRANSPORT_DRIVER" })
    }
  }, [getTransportDriverSuccess, getTransportDriverFailure]);

  useEffect(() => {
    if (createTransportDriverSuccess) {
      const temp_state = [createTransportDriverData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_TRANSPORT_DRIVER" })
    } else if (createTransportDriverFailure) {
      dispatch({ type: "RESET_CREATE_TRANSPORT_DRIVER" })
    }
  }, [createTransportDriverSuccess, createTransportDriverFailure]);

  useEffect(() => {
    if (updateTransportDriverSuccess) {
      updateTable(updateTransportDriverData[0])
      dispatch({ type: "RESET_UPDATE_TRANSPORT_DRIVER" })
    } else if (updateTransportDriverFailure) {
      dispatch({ type: "RESET_UPDATE_TRANSPORT_DRIVER" })
    }
  }, [updateTransportDriverSuccess, updateTransportDriverFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.transportDriverId != selectedItem.transportDriverId;
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
      driverName: "",
      contactNo: "",
      vechileNo: "",
      branchName: "",
      address: "",
      bankName: "",
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
    setState({
      ...state,
      driverName: data?.driverName || "",
      contactNo: data?.contactNo || "",
      vechileNo: data?.vechileNo || "",
      branchName: data?.branchName || "",
      address: data?.address || "",
      bankName: data?.bankName || "",
      accountNo: data?.accountNo || "",
      ifsc: data?.ifsc || "",
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
      driverName: driverName,
      contactNo: contactNo,
      vechileNo: vechileNo,
      branchName: branchName,
      address: address,
      bankName: bankName,
      ifsc: ifsc,
      accountNo: accountNo,
    }
    if (editData) {
      dispatch(updateTransportDriver(request, selectedItem.transportDriverId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateTransportDriver(deleteRequest, selectedItem.transportDriverId))
    } else {
      dispatch(createTransportDriver(request))
    }
  }

  const {
    ifsc,
    vechileNo,
    bankName,
    accountNo,
    contactNo,
    address,
    branchName,
    driverName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} TransportDriver`}>
        <FormLayout dynamicForm={transportDriverForm} noOfColumns={2} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete TransportDriver`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Driver List"} onClickForm={onCreateForm} uniqueKey={"transportDriverId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default TransportDriver;