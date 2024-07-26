import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColor, createColor, updateColor } from "../../api/ColorApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { colorForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const Color = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',')

  const getColorSuccess = useSelector((state) => state.colorReducer.getColorSuccess);
  const getColorList = useSelector((state) => state.colorReducer.getColorList);
  const getColorFailure = useSelector((state) => state.colorReducer.getColorFailure);

  const createColorSuccess = useSelector((state) => state.colorReducer.createColorSuccess);
  const createColorData = useSelector((state) => state.colorReducer.createColorData);
  const createColorFailure = useSelector((state) => state.colorReducer.createColorFailure);

  const updateColorSuccess = useSelector((state) => state.colorReducer.updateColorSuccess);
  const updateColorData = useSelector((state) => state.colorReducer.updateColorData);
  const updateColorFailure = useSelector((state) => state.colorReducer.updateColorFailure);

  const colorErrorMessage = useSelector((state) => state.colorReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Color Name",
      dataIndex: "colorName",
      key: "colorName",
      sorter: (a, b) => a.colorName.length - b.colorName.length,
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
            {_.includes(accessIds, '2') &&  <MdEdit
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onEditForm(record, index)}
            ></MdEdit>}
            {_.includes(accessIds, '3') &&<MdDelete
              className="text-danger cursor-pointer"
              size={18}
              onClick={() => showConfirmationDialog(
                "You won't be able to revert this!",
                () => onDeleteItem(record, index),
                "Yes, Delete it!"
              )}
            ></MdDelete>}
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
    dispatch(getColor(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getColorSuccess) {
      setParentList(getColorList)
      dispatch({ type: "RESET_GET_COLOR" })
    } else if (getColorFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_COLOR" })
    }
  }, [getColorSuccess, getColorFailure]);

  useEffect(() => {
    if (createColorSuccess) {
      const temp_state = [createColorData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_COLOR" })
    } else if (createColorFailure) {
      dispatch({ type: "RESET_CREATE_COLOR" })
    }
  }, [createColorSuccess, createColorFailure]);

  useEffect(() => {
    if (updateColorSuccess) {
      updateTable(updateColorData[0])
      dispatch({ type: "RESET_UPDATE_COLOR" })
    } else if (updateColorFailure) {
      dispatch({ type: "RESET_UPDATE_COLOR" })
    }
  }, [updateColorSuccess, updateColorFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.colorId != selectedItem.colorId;
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
      colorName: ""
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
      colorName: data?.colorName || ""
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
      colorName: colorName
    }
    if (editData) {
      dispatch(updateColor(request, selectedItem.colorId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateColor(deleteRequest, selectedItem.colorId))
    } else {
      dispatch(createColor(request))
    }
  }

  const {
    colorName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Color`}>
        <FormLayout dynamicForm={colorForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Color`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Color List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} uniqueKey={"colorId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Color;