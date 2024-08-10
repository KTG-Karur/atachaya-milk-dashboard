import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommissionType, createCommissionType, updateCommissionType } from "../../api/CommissionTypeApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { commissionTypeForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const CommissionType = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getCommissionTypeSuccess = useSelector((state) => state.commissionTypeReducer.getCommissionTypeSuccess);
  const getCommissionTypeList = useSelector((state) => state.commissionTypeReducer.getCommissionTypeList);
  const getCommissionTypeFailure = useSelector((state) => state.commissionTypeReducer.getCommissionTypeFailure);

  const createCommissionTypeSuccess = useSelector((state) => state.commissionTypeReducer.createCommissionTypeSuccess);
  const createCommissionTypeData = useSelector((state) => state.commissionTypeReducer.createCommissionTypeData);
  const createCommissionTypeFailure = useSelector((state) => state.commissionTypeReducer.createCommissionTypeFailure);

  const updateCommissionTypeSuccess = useSelector((state) => state.commissionTypeReducer.updateCommissionTypeSuccess);
  const updateCommissionTypeData = useSelector((state) => state.commissionTypeReducer.updateCommissionTypeData);
  const updateCommissionTypeFailure = useSelector((state) => state.commissionTypeReducer.updateCommissionTypeFailure);

  const commissionTypeErrorMessage = useSelector((state) => state.commissionTypeReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Commission Type Name",
      dataIndex: "commissionTypeName",
      key: "commissionTypeName",
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
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getCommissionType(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCommissionTypeSuccess) {
      setParentList(getCommissionTypeList)
      dispatch({ type: "RESET_GET_COMMISSION_TYPE" })
    } else if (getCommissionTypeFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_COMMISSION_TYPE" })
    }
  }, [getCommissionTypeSuccess, getCommissionTypeFailure]);

  useEffect(() => {
    if (createCommissionTypeSuccess) {
      const temp_state = [createCommissionTypeData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_COMMISSION_TYPE" })
    } else if (createCommissionTypeFailure) {
      dispatch({ type: "RESET_CREATE_COMMISSION_TYPE" })
    }
  }, [createCommissionTypeSuccess, createCommissionTypeFailure]);

  useEffect(() => {
    if (updateCommissionTypeSuccess) {
      updateTable(updateCommissionTypeData[0])
      dispatch({ type: "RESET_UPDATE_COMMISSION_TYPE" })
    } else if (updateCommissionTypeFailure) {
      dispatch({ type: "RESET_UPDATE_COMMISSION_TYPE" })
    }
  }, [updateCommissionTypeSuccess, updateCommissionTypeFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.commissionTypeId != selectedItem.commissionTypeId;
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
      commissionTypeName: ""
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
      commissionTypeName: data?.commissionTypeName || ""
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
      commissionTypeName: commissionTypeName
    }
    if (editData) {
      dispatch(updateCommissionType(request, selectedItem.commissionTypeId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCommissionType(deleteRequest, selectedItem.commissionTypeId))
    } else {
      dispatch(createCommissionType(request))
    }
  }

  const {
    commissionTypeName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Commission Type`}>
        <FormLayout dynamicForm={commissionTypeForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Commission Type`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Commission Type List"} onClickForm={onCreateForm} uniqueKey={"commissionTypeId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CommissionType;