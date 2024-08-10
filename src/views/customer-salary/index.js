import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerSalary, createCustomerSalary, updateCustomerSalary } from "../../api/CustomerSalaryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { customerSalaryForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const CustomerSalary = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /* const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',')
 */
  const getCustomerSalarySuccess = useSelector((state) => state.customerSalaryReducer.getCustomerSalarySuccess);
  const getCustomerSalaryList = useSelector((state) => state.customerSalaryReducer.getCustomerSalaryList);
  const getCustomerSalaryFailure = useSelector((state) => state.customerSalaryReducer.getCustomerSalaryFailure);

  const createCustomerSalarySuccess = useSelector((state) => state.customerSalaryReducer.createCustomerSalarySuccess);
  const createCustomerSalaryData = useSelector((state) => state.customerSalaryReducer.createCustomerSalaryData);
  const createCustomerSalaryFailure = useSelector((state) => state.customerSalaryReducer.createCustomerSalaryFailure);

  const updateCustomerSalarySuccess = useSelector((state) => state.customerSalaryReducer.updateCustomerSalarySuccess);
  const updateCustomerSalaryData = useSelector((state) => state.customerSalaryReducer.updateCustomerSalaryData);
  const updateCustomerSalaryFailure = useSelector((state) => state.customerSalaryReducer.updateCustomerSalaryFailure);

  const customerSalaryErrorMessage = useSelector((state) => state.customerSalaryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Customer Salary Name",
      dataIndex: "customerSalaryName",
      key: "customerSalaryName",
      sorter: (a, b) => a.customerSalaryName.length - b.customerSalaryName.length,
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
    dispatch(getCustomerSalary(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerSalarySuccess) {
      setParentList(getCustomerSalaryList)
      dispatch({ type: "RESET_GET_CUSTOMER_SALARY" })
    } else if (getCustomerSalaryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_CUSTOMER_SALARY" })
    }
  }, [getCustomerSalarySuccess, getCustomerSalaryFailure]);

  useEffect(() => {
    if (createCustomerSalarySuccess) {
      const temp_state = [createCustomerSalaryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_CUSTOMER_SALARY" })
    } else if (createCustomerSalaryFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER_SALARY" })
    }
  }, [createCustomerSalarySuccess, createCustomerSalaryFailure]);

  useEffect(() => {
    if (updateCustomerSalarySuccess) {
      updateTable(updateCustomerSalaryData[0])
      dispatch({ type: "RESET_UPDATE_CUSTOMER_SALARY" })
    } else if (updateCustomerSalaryFailure) {
      dispatch({ type: "RESET_UPDATE_CUSTOMER_SALARY" })
    }
  }, [updateCustomerSalarySuccess, updateCustomerSalaryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerSalaryId != selectedItem.customerSalaryId;
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
      centerId: "",
      customerId: "",
      fromDate: "",
      toDate: "",
      totalLiter: "",
      amount: "",
      advance: "",
      feedAmount: "",
      bonus: "",
      pendingAmount: "",
      totalAmount: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedCenterObj = filterArray(state.centerList, "centerId", data.centerId)
    const selectedCustomerObj = filterArray(state.customerList, "customerId", data.customerId)
    setState({
      ...state,
      centerId: selectedCenterObj[0] || "",
      customerId: selectedCustomerObj[0] || "",
      fromDate: data.fromDate ? updateDateConversion(data.fromDate, "DD-MM-YYYY") : "",
      fromPerviousDate : data.fromDate ? updateDateConversion(data.fromDate, "DD-MM-YYYY") : "",
      toDate: data.toDate ? updateDateConversion(data.toDate, "DD-MM-YYYY") : "",
      toPerviousDate : data.toDate ? updateDateConversion(data.toDate, "DD-MM-YYYY") : "",
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
      customerSalaryName: customerSalaryName
    }
    if (editData) {
      dispatch(updateCustomerSalary(request, selectedItem.customerSalaryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomerSalary(deleteRequest, selectedItem.customerSalaryId))
    } else {
      dispatch(createCustomerSalary(request))
    }
  }

  const {
    customerSalaryName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} CustomerSalary`}>
        <FormLayout dynamicForm={customerSalaryForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete CustomerSalary`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"CustomerSalary List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} uniqueKey={"customerSalaryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CustomerSalary;