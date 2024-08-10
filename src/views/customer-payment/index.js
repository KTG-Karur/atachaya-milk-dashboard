import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerPayment, createCustomerPayment, updateCustomerPayment } from "../../api/CustomerPaymentApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { customerPaymentForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const CustomerPayment = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',')

  const getCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentSuccess);
  const getCustomerPaymentList = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentList);
  const getCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.getCustomerPaymentFailure);

  const createCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentSuccess);
  const createCustomerPaymentData = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentData);
  const createCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.createCustomerPaymentFailure);

  const updateCustomerPaymentSuccess = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentSuccess);
  const updateCustomerPaymentData = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentData);
  const updateCustomerPaymentFailure = useSelector((state) => state.customerPaymentReducer.updateCustomerPaymentFailure);

  const customerPaymentErrorMessage = useSelector((state) => state.customerPaymentReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "CustomerPayment Name",
      dataIndex: "customerPaymentName",
      key: "customerPaymentName",
      sorter: (a, b) => a.customerPaymentName.length - b.customerPaymentName.length,
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
    dispatch(getCustomerPayment(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerPaymentSuccess) {
      setParentList(getCustomerPaymentList)
      dispatch({ type: "RESET_GET_CUSTOMER_PAYMENT" })
    } else if (getCustomerPaymentFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_CUSTOMER_PAYMENT" })
    }
  }, [getCustomerPaymentSuccess, getCustomerPaymentFailure]);

  useEffect(() => {
    if (createCustomerPaymentSuccess) {
      const temp_state = [createCustomerPaymentData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_CUSTOMER_PAYMENT" })
    } else if (createCustomerPaymentFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER_PAYMENT" })
    }
  }, [createCustomerPaymentSuccess, createCustomerPaymentFailure]);

  useEffect(() => {
    if (updateCustomerPaymentSuccess) {
      updateTable(updateCustomerPaymentData[0])
      dispatch({ type: "RESET_UPDATE_CUSTOMER_PAYMENT" })
    } else if (updateCustomerPaymentFailure) {
      dispatch({ type: "RESET_UPDATE_CUSTOMER_PAYMENT" })
    }
  }, [updateCustomerPaymentSuccess, updateCustomerPaymentFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerPaymentId != selectedItem.customerPaymentId;
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
      customerPaymentName: ""
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
      customerPaymentName: data?.customerPaymentName || ""
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
      customerPaymentName: customerPaymentName
    }
    if (editData) {
      dispatch(updateCustomerPayment(request, selectedItem.customerPaymentId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomerPayment(deleteRequest, selectedItem.customerPaymentId))
    } else {
      dispatch(createCustomerPayment(request))
    }
  }

  const {
    customerPaymentName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} CustomerPayment`}>
        <FormLayout dynamicForm={customerPaymentForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete CustomerPayment`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"CustomerPayment List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} uniqueKey={"customerPaymentId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CustomerPayment;