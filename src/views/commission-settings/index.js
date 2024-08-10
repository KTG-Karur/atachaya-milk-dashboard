import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommissionSettings, createCommissionSettings, updateCommissionSettings } from "../../api/CommissionSettingsApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { commissionSettingsForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getCommissionType } from "../../api/CommissionTypeApi";

let editData = false;

const CommissionSettings = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /* const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getCommissionSettingsSuccess = useSelector((state) => state.commissionSettingsReducer.getCommissionSettingsSuccess);
  const getCommissionSettingsList = useSelector((state) => state.commissionSettingsReducer.getCommissionSettingsList);
  const getCommissionSettingsFailure = useSelector((state) => state.commissionSettingsReducer.getCommissionSettingsFailure);

  const getCommissionTypeSuccess = useSelector((state) => state.commissionTypeReducer.getCommissionTypeSuccess);
  const getCommissionTypeList = useSelector((state) => state.commissionTypeReducer.getCommissionTypeList);
  const getCommissionTypeFailure = useSelector((state) => state.commissionTypeReducer.getCommissionTypeFailure);

  const createCommissionSettingsSuccess = useSelector((state) => state.commissionSettingsReducer.createCommissionSettingsSuccess);
  const createCommissionSettingsData = useSelector((state) => state.commissionSettingsReducer.createCommissionSettingsData);
  const createCommissionSettingsFailure = useSelector((state) => state.commissionSettingsReducer.createCommissionSettingsFailure);

  const updateCommissionSettingsSuccess = useSelector((state) => state.commissionSettingsReducer.updateCommissionSettingsSuccess);
  const updateCommissionSettingsData = useSelector((state) => state.commissionSettingsReducer.updateCommissionSettingsData);
  const updateCommissionSettingsFailure = useSelector((state) => state.commissionSettingsReducer.updateCommissionSettingsFailure);

  const commissionSettingsErrorMessage = useSelector((state) => state.commissionSettingsReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Commission Type",
      dataIndex: "commissionTypeName",
      key: "commissionTypeName",
    },
    {
      title: "Commission Amount",
      dataIndex: "amount",
      key: "amount",
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
    dispatch(getCommissionSettings(requestData))
    dispatch(getCommissionType(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCommissionSettingsSuccess) {
      setParentList(getCommissionSettingsList)
      dispatch({ type: "RESET_GET_COMMISSION_SETTINGS" })
    } else if (getCommissionSettingsFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_COMMISSION_SETTINGS" })
    }
  }, [getCommissionSettingsSuccess, getCommissionSettingsFailure]);

  useEffect(() => {
    if (getCommissionTypeSuccess) {
      setState({
        ...state,
        commissionTypeList: getCommissionTypeList
      })
      dispatch({ type: "RESET_GET_COMMISSION_TYPE" })
    } else if (getCommissionTypeFailure) {
      setState({
        ...state,
        commissionTypeList: []
      })
      dispatch({ type: "RESET_GET_COMMISSION_TYPE" })
    }
  }, [getCommissionTypeSuccess, getCommissionTypeFailure]);

  useEffect(() => {
    if (createCommissionSettingsSuccess) {
      const temp_state = [createCommissionSettingsData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_COMMISSION_SETTINGS" })
    } else if (createCommissionSettingsFailure) {
      showMessage('warning',"Commission Type Should Not be Same...!")
      dispatch({ type: "RESET_CREATE_COMMISSION_SETTINGS" })
    }
  }, [createCommissionSettingsSuccess, createCommissionSettingsFailure]);

  useEffect(() => {
    if (updateCommissionSettingsSuccess) {
      updateTable(updateCommissionSettingsData[0])
      dispatch({ type: "RESET_UPDATE_COMMISSION_SETTINGS" })
    } else if (updateCommissionSettingsFailure) {
      showMessage('warning',"Commission Type Should Not be Same...!")
      dispatch({ type: "RESET_UPDATE_COMMISSION_SETTINGS" })
    }
  }, [updateCommissionSettingsSuccess, updateCommissionSettingsFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.commissionSettingsId != selectedItem.commissionSettingsId;
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
    setDeleteModule(false)
    editData = false
  }

  const clearState = () => {
    setState({
      ...state,
      commissionTypeId: "",
      amount: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedCommissionTypeObj = filterArray(state.commissionTypeList, "commissionTypeId", data.commissionTypeId)
    setState({
      ...state,
      amount: data?.amount || "",
      commissionTypeId: selectedCommissionTypeObj[0] || "",
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
      commissionTypeId: commissionTypeId.commissionTypeId,
      amount: amount,
    }
    if (editData) {
      dispatch(updateCommissionSettings(request, selectedItem.commissionSettingsId))
    }else {
      dispatch(createCommissionSettings(request))
    }
  }

  const {
    amount,
    commissionTypeId,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Commission Settings`}>
        <FormLayout dynamicForm={commissionSettingsForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Commission Settings List"} onClickForm={onCreateForm} uniqueKey={"commissionSettingsId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CommissionSettings;