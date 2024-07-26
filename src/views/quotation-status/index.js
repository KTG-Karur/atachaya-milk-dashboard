import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuotationStatus, createQuotationStatus, updateQuotationStatus } from "../../api/QuotationStatusApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { quotationStatusForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const QuotationStatus = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 12)
  let accessIds = pageAccessData[0].access.split(',')

  const getQuotationStatusSuccess = useSelector((state) => state.quotationStatusReducer.getQuotationStatusSuccess);
  const getQuotationStatusList = useSelector((state) => state.quotationStatusReducer.getQuotationStatusList);
  const getQuotationStatusFailure = useSelector((state) => state.quotationStatusReducer.getQuotationStatusFailure);

  const createQuotationStatusSuccess = useSelector((state) => state.quotationStatusReducer.createQuotationStatusSuccess);
  const createQuotationStatusData = useSelector((state) => state.quotationStatusReducer.createQuotationStatusData);
  const createQuotationStatusFailure = useSelector((state) => state.quotationStatusReducer.createQuotationStatusFailure);

  const updateQuotationStatusSuccess = useSelector((state) => state.quotationStatusReducer.updateQuotationStatusSuccess);
  const updateQuotationStatusData = useSelector((state) => state.quotationStatusReducer.updateQuotationStatusData);
  const updateQuotationStatusFailure = useSelector((state) => state.quotationStatusReducer.updateQuotationStatusFailure);

  const quotationStatusErrorMessage = useSelector((state) => state.quotationStatusReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Quotation Status",
      dataIndex: "quotationStatusName",
      key: "quotationStatusName",
      sorter: (a, b) => a.quotationStatusName.length - b.quotationStatusName.length,
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
            {_.includes(accessIds, '2') && <MdEdit
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onEditForm(record, index)}
            ></MdEdit>}
            {_.includes(accessIds, '3')&& <MdDelete
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
    dispatch(getQuotationStatus(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getQuotationStatusSuccess) {
      setParentList(getQuotationStatusList)
      dispatch({ type: "RESET_GET_QUOTATION_STATUS" })
    } else if (getQuotationStatusFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_QUOTATION_STATUS" })
    }
  }, [getQuotationStatusSuccess, getQuotationStatusFailure]);

  useEffect(() => {
    if (createQuotationStatusSuccess) {
      const temp_state = [createQuotationStatusData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_QUOTATION_STATUS" })
    } else if (createQuotationStatusFailure) {
      dispatch({ type: "RESET_CREATE_QUOTATION_STATUS" })
    }
  }, [createQuotationStatusSuccess, createQuotationStatusFailure]);

  useEffect(() => {
    if (updateQuotationStatusSuccess) {
      updateTable(updateQuotationStatusData[0])
      dispatch({ type: "RESET_UPDATE_QUOTATION_STATUS" })
    } else if (updateQuotationStatusFailure) {
      dispatch({ type: "RESET_UPDATE_QUOTATION_STATUS" })
    }
  }, [updateQuotationStatusSuccess, updateQuotationStatusFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.quotationStatusId != selectedItem.quotationStatusId;
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
      quotationStatusName : ""
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onDeleteItem = (data,index)=>{
    setSelectedIndex(index)
    setSelectedItem(data)
    setDeleteModule(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      quotationStatusName: data?.quotationStatusName || ""
    })
    editData= true
    setCreateModule(true)
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitForm = () => {
    const request = {
      quotationStatusName: quotationStatusName
    }
    if (editData) {
      dispatch(updateQuotationStatus(request, selectedItem.quotationStatusId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateQuotationStatus(deleteRequest, selectedItem.quotationStatusId))
    } else {
      dispatch(createQuotationStatus(request))
    }
  }

  const {
    quotationStatusName
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Quotation Status`}>
        <FormLayout dynamicForm={quotationStatusForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Quotation Status`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Quotation Status List"} uniqueKey={"quotationStatusId"} onClickForm={_.includes(accessIds, '1') && onCreateForm} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default QuotationStatus;