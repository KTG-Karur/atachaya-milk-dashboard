import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMode, createPaymentMode, updatePaymentMode } from "../../api/PaymentModeApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { paymentModeForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const PaymentMode = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getPaymentModeSuccess = useSelector((state) => state.paymentModeReducer.getPaymentModeSuccess);
  const getPaymentModeList = useSelector((state) => state.paymentModeReducer.getPaymentModeList);
  const getPaymentModeFailure = useSelector((state) => state.paymentModeReducer.getPaymentModeFailure);

  const createPaymentModeSuccess = useSelector((state) => state.paymentModeReducer.createPaymentModeSuccess);
  const createPaymentModeData = useSelector((state) => state.paymentModeReducer.createPaymentModeData);
  const createPaymentModeFailure = useSelector((state) => state.paymentModeReducer.createPaymentModeFailure);

  const updatePaymentModeSuccess = useSelector((state) => state.paymentModeReducer.updatePaymentModeSuccess);
  const updatePaymentModeData = useSelector((state) => state.paymentModeReducer.updatePaymentModeData);
  const updatePaymentModeFailure = useSelector((state) => state.paymentModeReducer.updatePaymentModeFailure);

  const paymentModeErrorMessage = useSelector((state) => state.paymentModeReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "PaymentMode Name",
      dataIndex: "modeName",
      key: "modeName",
      sorter: (a, b) => a.modeName.length - b.modeName.length,
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
    dispatch(getPaymentMode(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getPaymentModeSuccess) {
      setParentList(getPaymentModeList)
      dispatch({ type: "RESET_GET_PAYMENT_MODE" })
    } else if (getPaymentModeFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_PAYMENT_MODE" })
    }
  }, [getPaymentModeSuccess, getPaymentModeFailure]);

  useEffect(() => {
    if (createPaymentModeSuccess) {
      const temp_state = [createPaymentModeData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_PAYMENT_MODE" })
    } else if (createPaymentModeFailure) {
      dispatch({ type: "RESET_CREATE_PAYMENT_MODE" })
    }
  }, [createPaymentModeSuccess, createPaymentModeFailure]);

  useEffect(() => {
    if (updatePaymentModeSuccess) {
      updateTable(updatePaymentModeData[0])
      dispatch({ type: "RESET_UPDATE_PAYMENT_MODE" })
    } else if (updatePaymentModeFailure) {
      dispatch({ type: "RESET_UPDATE_PAYMENT_MODE" })
    }
  }, [updatePaymentModeSuccess, updatePaymentModeFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.paymentModeId != selectedItem.paymentModeId;
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
      paymentModeName: ""
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
      paymentModeName: data?.modeName || ""
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
      modeName: paymentModeName
    }
    if (editData) {
      dispatch(updatePaymentMode(request, selectedItem.paymentModeId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updatePaymentMode(deleteRequest, selectedItem.paymentModeId))
    } else {
      dispatch(createPaymentMode(request))
    }
  }

  const {
    paymentModeName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} PaymentMode`}>
        <FormLayout dynamicForm={paymentModeForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete PaymentMode`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Payment Mode List"} onClickForm={onCreateForm} uniqueKey={"paymentModeId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default PaymentMode;