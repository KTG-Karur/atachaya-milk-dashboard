import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCenter, createCenter, updateCenter } from "../../api/CenterApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { centerForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const Center = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
 /*  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 8)
  let accessIds = pageAccessData[0].access.split(',') */

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const createCenterSuccess = useSelector((state) => state.centerReducer.createCenterSuccess);
  const createCenterData = useSelector((state) => state.centerReducer.createCenterData);
  const createCenterFailure = useSelector((state) => state.centerReducer.createCenterFailure);

  const updateCenterSuccess = useSelector((state) => state.centerReducer.updateCenterSuccess);
  const updateCenterData = useSelector((state) => state.centerReducer.updateCenterData);
  const updateCenterFailure = useSelector((state) => state.centerReducer.updateCenterFailure);

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
      title: "Center Code",
      dataIndex: "centerCode",
      key: "defaultWidth",
    },
    {
      title: "Commission",
      dataIndex: "commissionAmt",
      key: "commissionAmt",
    },
    {
      title: "Feed Commission",
      dataIndex: "feedCommission",
      key: "feedCommission",
    },
    {
      title: "Action",
      key: "Action",
      render: (record, item, index) => (
        <>
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
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCenterSuccess) {
      setParentList(getCenterList)
      dispatch({ type: "RESET_GET_CENTER" })
    } else if (getCenterFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_CENTER" })
    }
  }, [getCenterSuccess, getCenterFailure]);

  useEffect(() => {
    if (createCenterSuccess) {
      const temp_state = [createCenterData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_CENTER" })
    } else if (createCenterFailure) {
      dispatch({ type: "RESET_CREATE_CENTER" })
    }
  }, [createCenterSuccess, createCenterFailure]);

  useEffect(() => {
    if (updateCenterSuccess) {
      updateTable(updateCenterData[0])
      dispatch({ type: "RESET_UPDATE_CENTER" })
    } else if (updateCenterFailure) {
      dispatch({ type: "RESET_UPDATE_CENTER" })
    }
  }, [updateCenterSuccess, updateCenterFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.centerId != selectedItem.centerId;
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
      centerName: "",
      commissionAmt: "",
      feedCommission: "",
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
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      centerName: data?.centerName || "",
      commissionAmt: data?.commissionAmt || "",
      feedCommission: data?.feedCommission || "",
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
      centerName: centerName,
      commissionAmt: commissionAmt,
      feedCommission: feedCommission,      
    }
    if (editData) {
      dispatch(updateCenter(request, selectedItem.centerId))
    } else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCenter(deleteRequest, selectedItem.centerId))
    } else {
      dispatch(createCenter(request))
    }
  }

  const {
    centerName,
    commissionAmt,
    feedCommission
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Center`}>
        <FormLayout dynamicForm={centerForm} ref={errorHandles} noOfColumns={1} defaultState={state} setDefaultState={setState} onSubmit={onSubmitForm}></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Center`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Center List"} onClickForm={onCreateForm} uniqueKey={"centerId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Center;