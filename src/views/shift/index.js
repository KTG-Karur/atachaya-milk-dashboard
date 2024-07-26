import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShift, createShift, updateShift } from "../../api/ShiftApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { shiftForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const Shift = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
 /*  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getShiftSuccess = useSelector((state) => state.shiftReducer.getShiftSuccess);
  const getShiftList = useSelector((state) => state.shiftReducer.getShiftList);
  const getShiftFailure = useSelector((state) => state.shiftReducer.getShiftFailure);

  const createShiftSuccess = useSelector((state) => state.shiftReducer.createShiftSuccess);
  const createShiftData = useSelector((state) => state.shiftReducer.createShiftData);
  const createShiftFailure = useSelector((state) => state.shiftReducer.createShiftFailure);

  const updateShiftSuccess = useSelector((state) => state.shiftReducer.updateShiftSuccess);
  const updateShiftData = useSelector((state) => state.shiftReducer.updateShiftData);
  const updateShiftFailure = useSelector((state) => state.shiftReducer.updateShiftFailure);

  const shiftErrorMessage = useSelector((state) => state.shiftReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
      sorter: (a, b) => a.shiftName.length - b.shiftName.length,
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
      key: "shortName",
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
    dispatch(getShift(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getShiftSuccess) {
      setParentList(getShiftList)
      dispatch({ type: "RESET_GET_SHIFT" })
    } else if (getShiftFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_SHIFT" })
    }
  }, [getShiftSuccess, getShiftFailure]);

  useEffect(() => {
    if (createShiftSuccess) {
      const temp_state = [createShiftData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_SHIFT" })
    } else if (createShiftFailure) {
      dispatch({ type: "RESET_CREATE_SHIFT" })
    }
  }, [createShiftSuccess, createShiftFailure]);

  useEffect(() => {
    if (updateShiftSuccess) {
      updateTable(updateShiftData[0])
      dispatch({ type: "RESET_UPDATE_SHIFT" })
    } else if (updateShiftFailure) {
      dispatch({ type: "RESET_UPDATE_SHIFT" })
    }
  }, [updateShiftSuccess, updateShiftFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.shiftId != selectedItem.shiftId;
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
      shiftName: "",
      shortName: "",
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
      shiftName: data?.shiftName || "",
      shortName: data?.shortName || "",
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
      shiftName: shiftName,
      shortName: shortName,
    }
    if (editData) {
      dispatch(updateShift(request, selectedItem.shiftId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateShift(deleteRequest, selectedItem.shiftId))
    } else {
      dispatch(createShift(request))
    }
  }

  const {
    shiftName,
    shortName
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Shift`}>
        <FormLayout dynamicForm={shiftForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Shift`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Shift List"} onClickForm={onCreateForm} uniqueKey={"shiftId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Shift;