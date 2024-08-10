import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransportSettings, createTransportSettings, updateTransportSettings } from "../../api/TransportSettingsApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { transportSettingsForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const TransportSettings = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',')

  const getTransportSettingsSuccess = useSelector((state) => state.transportSettingsReducer.getTransportSettingsSuccess);
  const getTransportSettingsList = useSelector((state) => state.transportSettingsReducer.getTransportSettingsList);
  const getTransportSettingsFailure = useSelector((state) => state.transportSettingsReducer.getTransportSettingsFailure);

  const createTransportSettingsSuccess = useSelector((state) => state.transportSettingsReducer.createTransportSettingsSuccess);
  const createTransportSettingsData = useSelector((state) => state.transportSettingsReducer.createTransportSettingsData);
  const createTransportSettingsFailure = useSelector((state) => state.transportSettingsReducer.createTransportSettingsFailure);

  const updateTransportSettingsSuccess = useSelector((state) => state.transportSettingsReducer.updateTransportSettingsSuccess);
  const updateTransportSettingsData = useSelector((state) => state.transportSettingsReducer.updateTransportSettingsData);
  const updateTransportSettingsFailure = useSelector((state) => state.transportSettingsReducer.updateTransportSettingsFailure);

  const transportSettingsErrorMessage = useSelector((state) => state.transportSettingsReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Per-Km Price",
      dataIndex: "perKmPrice",
      key: "perKmPrice"
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
    dispatch(getTransportSettings(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getTransportSettingsSuccess) {
      setParentList(getTransportSettingsList)
      dispatch({ type: "RESET_GET_TRANSPORT_SETTINGS" })
    } else if (getTransportSettingsFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_TRANSPORT_SETTINGS" })
    }
  }, [getTransportSettingsSuccess, getTransportSettingsFailure]);

  useEffect(() => {
    if (createTransportSettingsSuccess) {
      const temp_state = [createTransportSettingsData[0]];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_TRANSPORT_SETTINGS" })
    } else if (createTransportSettingsFailure) {
      dispatch({ type: "RESET_CREATE_TRANSPORT_SETTINGS" })
    }
  }, [createTransportSettingsSuccess, createTransportSettingsFailure]);

  useEffect(() => {
    if (updateTransportSettingsSuccess) {
      updateTable(updateTransportSettingsData[0])
      dispatch({ type: "RESET_UPDATE_TRANSPORT_SETTINGS" })
    } else if (updateTransportSettingsFailure) {
      dispatch({ type: "RESET_UPDATE_TRANSPORT_SETTINGS" })
    }
  }, [updateTransportSettingsSuccess, updateTransportSettingsFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.transportSettingsId != selectedItem.transportSettingsId;
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
      perKmPrice: ""
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
      perKmPrice: data?.perKmPrice || ""
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
      perKmPrice: perKmPrice
    }
    if (editData) {
      dispatch(updateTransportSettings(request, selectedItem.transportSettingsId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateTransportSettings(deleteRequest, selectedItem.transportSettingsId))
    } else {
      dispatch(createTransportSettings(request))
    }
  }

  const {
    perKmPrice,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} TransportSettings`}>
        <FormLayout ref={errorHandles} dynamicForm={transportSettingsForm} noOfColumns={1} defaultState={state} setDefaultState={setState} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete TransportSettings`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Transport Settings List"} onClickForm={onCreateForm} uniqueKey={"transportSettingsId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default TransportSettings;