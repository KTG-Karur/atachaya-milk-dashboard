import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpensive, createExpensive, updateExpensive } from "../../api/ExpensiveApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { expensiveForm } from "./formData";
import { dateConversion, dateConversionNormal, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi";
import { getEmployee } from "../../api/EmployeeApi";
import { getPaymentMode } from "../../api/PaymentModeApi";
import moment from "moment";

let editData = false;

const Expensive = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /* const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getExpensiveSuccess = useSelector((state) => state.expensiveReducer.getExpensiveSuccess);
  const getExpensiveList = useSelector((state) => state.expensiveReducer.getExpensiveList);
  const getExpensiveFailure = useSelector((state) => state.expensiveReducer.getExpensiveFailure);

  const getEmployeeSuccess = useSelector((state) => state.employeeReducer.getEmployeeSuccess);
  const getEmployeeList = useSelector((state) => state.employeeReducer.getEmployeeList);
  const getEmployeeFailure = useSelector((state) => state.employeeReducer.getEmployeeFailure);

  const getPaymentModeSuccess = useSelector((state) => state.paymentModeReducer.getPaymentModeSuccess);
  const getPaymentModeList = useSelector((state) => state.paymentModeReducer.getPaymentModeList);
  const getPaymentModeFailure = useSelector((state) => state.paymentModeReducer.getPaymentModeFailure);

  const createExpensiveSuccess = useSelector((state) => state.expensiveReducer.createExpensiveSuccess);
  const createExpensiveData = useSelector((state) => state.expensiveReducer.createExpensiveData);
  const createExpensiveFailure = useSelector((state) => state.expensiveReducer.createExpensiveFailure);

  const updateExpensiveSuccess = useSelector((state) => state.expensiveReducer.updateExpensiveSuccess);
  const updateExpensiveData = useSelector((state) => state.expensiveReducer.updateExpensiveData);
  const updateExpensiveFailure = useSelector((state) => state.expensiveReducer.updateExpensiveFailure);

  const expensiveErrorMessage = useSelector((state) => state.expensiveReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Expensive Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Billing Date",
      dataIndex: "billingDate",
      key: "billingDate",
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
    dispatch(getExpensive(requestData))
    dispatch(getPaymentMode(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getExpensiveSuccess) {
      setParentList(getExpensiveList)
      dispatch({ type: "RESET_GET_EXPENSIVE" })
    } else if (getExpensiveFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_EXPENSIVE" })
    }
  }, [getExpensiveSuccess, getExpensiveFailure]);

  useEffect(() => {
    if (getPaymentModeSuccess) {
      setState({
        ...state,
        paymentModeList: getPaymentModeList
      })
      const requestData = {
        isActive: 1
      }
      dispatch(getEmployee(requestData))
      dispatch({ type: "RESET_GET_PAYMENT_MODE" })
    } else if (getPaymentModeFailure) {
      setState({
        ...state,
        paymentModeList: []
      })
      dispatch({ type: "RESET_GET_PAYMENT_MODE" })
    }
  }, [getPaymentModeSuccess, getPaymentModeFailure]);

  useEffect(() => {
    if (getEmployeeSuccess) {
      setState({
        ...state,
        employeeList: getEmployeeList
      })
      dispatch({ type: "RESET_GET_EMPLOYEE" })
    } else if (getEmployeeFailure) {
      setState({
        ...state,
        employeeList: []
      })
      dispatch({ type: "RESET_GET_EMPLOYEE" })
    }
  }, [getEmployeeSuccess, getEmployeeFailure]);

  useEffect(() => {
    if (createExpensiveSuccess) {
      const temp_state = [createExpensiveData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_EXPENSIVE" })
    } else if (createExpensiveFailure) {
      dispatch({ type: "RESET_CREATE_EXPENSIVE" })
    }
  }, [createExpensiveSuccess, createExpensiveFailure]);

  useEffect(() => {
    if (updateExpensiveSuccess) {
      updateTable(updateExpensiveData[0])
      dispatch({ type: "RESET_UPDATE_EXPENSIVE" })
    } else if (updateExpensiveFailure) {
      dispatch({ type: "RESET_UPDATE_EXPENSIVE" })
    }
  }, [updateExpensiveSuccess, updateExpensiveFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.expensiveId != selectedItem.expensiveId;
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
      name: "",
      description: "",
      tax: "",
      amount: "",
      billingDate: "",
      employeeId: "",
      modePaymentId: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedEmployeeObj = filterArray(state.employeeList, "employeeId", data.purchasedById)
    const selectedPaymentModeObj = filterArray(state.paymentModeList, "paymentModeId", data.modePaymentId)
    setState({
      ...state,
      expensiveName: data?.name || "",
      description: data?.description || "",
      tax: data.tax == 1 ? true : false,
      amount: data?.amount || "",
      billingDate: data.billingDate ? updateDateConversion(data.billingDate, "DD-MM-YYYY") : "",
      perviousDate : data.billingDate ? updateDateConversion(data.billingDate, "DD-MM-YYYY") : "",
      employeeId: selectedEmployeeObj || "",
      modePaymentId: selectedPaymentModeObj || "",
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
    const dateChecker = state.billingDate == state.perviousDate ? moment(state.billingDate). add(1, 'days').format('YYYY-MM-DD') : dateConversionNormal(state.billingDate, "YYYY-MM-DD")
    const request = {
      name: expensiveName,
      description: description,
      tax: state.tax === true ? 1 : 0,
      amount: amount,
      billingDate: dateChecker,
      purchasedBy: employeeId?.employeeId,
      modePaymentId: modePaymentId?.paymentModeId,
    }
    if (editData) {
      dispatch(updateExpensive(request, selectedItem.expensiveId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateExpensive(deleteRequest, selectedItem.expensiveId))
    } else {
      dispatch(createExpensive(request))
    }
  }

  const {
    expensiveName,
    description,
    tax,
    amount,
    employeeId,
    modePaymentId,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Expensive`}>
        <FormLayout dynamicForm={expensiveForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Expensive`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Expensive List"} onClickForm={onCreateForm} uniqueKey={"expensiveId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Expensive;