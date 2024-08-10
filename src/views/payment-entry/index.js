import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentEntry, createPaymentEntry, updatePaymentEntry } from "../../api/PaymentEntryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { paymentEntryForm } from "./formData";
import { dateConversion, filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getSupplier } from "../../api/SupplierApi";
import moment from "moment";

let editData = false;

const PaymentEntry = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*   const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)
    let pageAccessData = filterArray(localData.pages, "pageId", 4)
    let accessIds = pageAccessData[0].access.split(',') */

  const getPaymentEntrySuccess = useSelector((state) => state.paymentEntryReducer.getPaymentEntrySuccess);
  const getPaymentEntryList = useSelector((state) => state.paymentEntryReducer.getPaymentEntryList);
  const getPaymentEntryFailure = useSelector((state) => state.paymentEntryReducer.getPaymentEntryFailure);

  const getSupplierSuccess = useSelector((state) => state.supplierReducer.getSupplierSuccess);
  const getSupplierList = useSelector((state) => state.supplierReducer.getSupplierList);
  const getSupplierFailure = useSelector((state) => state.supplierReducer.getSupplierFailure);

  const createPaymentEntrySuccess = useSelector((state) => state.paymentEntryReducer.createPaymentEntrySuccess);
  const createPaymentEntryData = useSelector((state) => state.paymentEntryReducer.createPaymentEntryData);
  const createPaymentEntryFailure = useSelector((state) => state.paymentEntryReducer.createPaymentEntryFailure);

  const updatePaymentEntrySuccess = useSelector((state) => state.paymentEntryReducer.updatePaymentEntrySuccess);
  const updatePaymentEntryData = useSelector((state) => state.paymentEntryReducer.updatePaymentEntryData);
  const updatePaymentEntryFailure = useSelector((state) => state.paymentEntryReducer.updatePaymentEntryFailure);

  const paymentEntryErrorMessage = useSelector((state) => state.paymentEntryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName"
    },
    {
      title: "Pending Amount",
      dataIndex: "pendingAmt",
      key: "pendingAmt"
    },
    {
      title: "Advance Amount",
      dataIndex: "advanceAmt",
      key: "advanceAmt"
    },
    {
      title: "Last Payment Date",
      dataIndex: "lastPayDate",
      key: "lastPayDate"
    },
    /*  {
       title: "Action",
       key: "Action",
       render: (record, item, index) => (
         <>
           <div >
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
     }, */
  ];

  const [state, setState] = useState({})
  const [formState, setFormState] = useState(paymentEntryForm)
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
    dispatch(getPaymentEntry(requestData))
    dispatch(getSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getPaymentEntrySuccess) {
      setParentList(getPaymentEntryList)
      dispatch({ type: "RESET_GET_PAYMENT_ENTRY" })
    } else if (getPaymentEntryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_PAYMENT_ENTRY" })
    }
  }, [getPaymentEntrySuccess, getPaymentEntryFailure]);

  useEffect(() => {
    if (getSupplierSuccess) {
      setState({
        ...state,
        supplierList: getSupplierList
      })
      dispatch({ type: "RESET_GET_SUPPLIER" })
    } else if (getSupplierFailure) {
      setState({
        ...state,
        supplierList: []
      })
      dispatch({ type: "RESET_GET_SUPPLIER" })
    }
  }, [getSupplierSuccess, getSupplierFailure]);

  useEffect(() => {
    if (createPaymentEntrySuccess) {
      if(selectedIndex >= 0){
        const temp_state = [...parentList];
        temp_state[selectedIndex] = createPaymentEntryData[0];
        setParentList(temp_state)
        showMessage("success", "Updated Successfully...!")
      }else{
        const temp_state = [createPaymentEntryData[0], ...parentList];
        setParentList(temp_state)
        showMessage("success", "Created Successfully...!")
      }
      closeModule()
      dispatch({ type: "RESET_CREATE_PAYMENT_ENTRY" })
    } else if (createPaymentEntryFailure) {
      dispatch({ type: "RESET_CREATE_PAYMENT_ENTRY" })
    }
  }, [createPaymentEntrySuccess, createPaymentEntryFailure]);

  useEffect(() => {
    if (updatePaymentEntrySuccess) {
      updateTable(updatePaymentEntryData[0])
      dispatch({ type: "RESET_UPDATE_PAYMENT_ENTRY" })
    } else if (updatePaymentEntryFailure) {
      dispatch({ type: "RESET_UPDATE_PAYMENT_ENTRY" })
    }
  }, [updatePaymentEntrySuccess, updatePaymentEntryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.paymentEntryId != selectedItem.paymentEntryId;
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
      supplierId: "",
      advanceAmount: "",
      pendingAmount: "",
      payment: "",
    })
  }

  const onHandleSupplier = (selectedData, index, name) => {
    const selectIndex = parentList.findIndex( ele => ele.supplierId === selectedData.supplierId )
    if(selectIndex >= 0){
      setSelectedIndex(selectIndex)
    }
    const requestData = {
      supplierId: selectedData.supplierId
    }
    const filterData = _.filter(
      parentList, function (o) {
        return o.supplierId == selectedData.supplierId;
      })
    const balanceAmount = parseInt(filterData[0]?.pendingAmt) > parseInt(filterData[0]?.advanceAmt) ? parseInt(filterData[0]?.pendingAmt) - parseInt(filterData[0]?.advanceAmt) : parseInt(filterData[0]?.advanceAmt) - parseInt(filterData[0]?.pendingAmt)
    setState({
      ...state,
      [name]: selectedData,
      pendingAmount: filterData[0]?.pendingAmt || 0,
      advanceAmount: filterData[0]?.advanceAmt || 0,
      balanceAmount: balanceAmount,
      payment: balanceAmount == 0 ? 0 : ""
    })
    if (balanceAmount == 0) {
      paymentEntryForm[0].formFields[4].disable = true
      console.log(JSON.stringify(paymentEntryForm))
      setFormState(paymentEntryForm)
    }
  }

  const onCreateForm = () => {
    clearState()
    paymentEntryForm[0].formFields[4].disable = false
    setFormState(paymentEntryForm)
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      paymentEntryName: data?.paymentEntryName || ""
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
    const dateChecker = state.paymentDate._i && state.paymentDate._i == state.perviousDate._i ? moment(state.paymentDate).add(1, 'days').format('YYYY-MM-DD') : dateConversion(state.paymentDate, "YYYY-MM-DD")
    const pendingAmt = parseInt(balanceAmount || 0)- parseInt(advanceAmount || 0) - parseInt(payment || 0)
    const request = {
    supplierId: supplierId.supplierId,
    paidAmount: parseInt(payment) + parseInt(advanceAmount),
    balanceAmount: pendingAmt,
    paymentDate: dateChecker,
    paymentEntryDetails: {
      supplierId: supplierId.supplierId,
      pendingAmt: pendingAmt,
      paidAmt: parseInt(payment) + parseInt(advanceAmount),
      lastPayDate: dateChecker,
      advanceAmt: 0
    },
    }
      dispatch(createPaymentEntry(request))
  }

  const {
    balanceAmount,
    advanceAmount,
    supplierId,
    payment,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Payment Entry`}>
        <FormLayout dynamicForm={formState} customAlign={true} noOfColumns={1} onChangeCallBack={{ "onHandleSupplier": onHandleSupplier }} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Payment Entry`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Payment Entry List"} onClickForm={onCreateForm} uniqueKey={"paymentEntryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default PaymentEntry;