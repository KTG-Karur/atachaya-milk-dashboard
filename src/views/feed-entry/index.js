import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedEntry, createFeedEntry, updateFeedEntry } from "../../api/FeedEntryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { feedEntryForm } from "./formData";
import { dateConversionNormal, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi";
import moment from "moment";

let editData = false;

const FeedEntry = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getFeedEntrySuccess = useSelector((state) => state.feedEntryReducer.getFeedEntrySuccess);
  const getFeedEntryList = useSelector((state) => state.feedEntryReducer.getFeedEntryList);
  const getFeedEntryFailure = useSelector((state) => state.feedEntryReducer.getFeedEntryFailure);
  
  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const createFeedEntrySuccess = useSelector((state) => state.feedEntryReducer.createFeedEntrySuccess);
  const createFeedEntryData = useSelector((state) => state.feedEntryReducer.createFeedEntryData);
  const createFeedEntryFailure = useSelector((state) => state.feedEntryReducer.createFeedEntryFailure);

  const updateFeedEntrySuccess = useSelector((state) => state.feedEntryReducer.updateFeedEntrySuccess);
  const updateFeedEntryData = useSelector((state) => state.feedEntryReducer.updateFeedEntryData);
  const updateFeedEntryFailure = useSelector((state) => state.feedEntryReducer.updateFeedEntryFailure);

  const feedEntryErrorMessage = useSelector((state) => state.feedEntryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Feed Entry Date",
      dataIndex: "feedEntryDate",
      key: "feedEntryDate",
      render: (record) => {
        const selectedDate = dateConversionNormal(record, "DD-MM-YYYY")
        return (
          <div>
            <span style={{ fontSize: 12 }}>{selectedDate}</span>
          </div>
        )
      }
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
    },
    {
      title: "Amount",
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
  ]

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
    dispatch(getFeedEntry(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getFeedEntrySuccess) {
      setParentList(getFeedEntryList)
      dispatch({ type: "RESET_GET_FEED_ENTRY" })
    } else if (getFeedEntryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_FEED_ENTRY" })
    }
  }, [getFeedEntrySuccess, getFeedEntryFailure]);

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
    if (createFeedEntrySuccess) {
      const temp_state = [createFeedEntryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_FEED_ENTRY" })
    } else if (createFeedEntryFailure) {
      dispatch({ type: "RESET_CREATE_FEED_ENTRY" })
    }
  }, [createFeedEntrySuccess, createFeedEntryFailure]);

  useEffect(() => {
    if (updateFeedEntrySuccess) {
      updateTable(updateFeedEntryData[0])
      dispatch({ type: "RESET_UPDATE_FEED_ENTRY" })
    } else if (updateFeedEntryFailure) {
      dispatch({ type: "RESET_UPDATE_FEED_ENTRY" })
    }
  }, [updateFeedEntrySuccess, updateFeedEntryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.feedEntryId != selectedItem.feedEntryId;
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
      feedEntryDate: "",
      centerId: "",
      amount: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    setState({
      ...state,
      feedEntryDate: data.feedEntryDate ? updateDateConversion(data.feedEntryDate, "DD-MM-YYYY") : "",
      perviousDate : data.feedEntryDate ? updateDateConversion(data.feedEntryDate, "DD-MM-YYYY") : "",
      centerId : selectedCenterObj || "",
      amount : data?.amount || "",
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
    const dateChecker = state.feedEntryDate == state.perviousDate ? moment(state.feedEntryDate). add(1, 'days').format('YYYY-MM-DD') : dateConversionNormal(state.feedEntryDate, "YYYY-MM-DD")
    const request = {
      feedEntryDate: dateChecker,
      centerId: centerId.centerId,
      amount: amount,
    }
    if (editData) {
      dispatch(updateFeedEntry(request, selectedItem.feedEntryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateFeedEntry(deleteRequest, selectedItem.feedEntryId))
    } else {
      dispatch(createFeedEntry(request))
    }
  }

  const {
    amount,
    centerId
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} FeedEntry`}>
        <FormLayout dynamicForm={feedEntryForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete FeedEntry`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Feed Entry List"} onClickForm={onCreateForm} uniqueKey={"feedEntryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default FeedEntry;