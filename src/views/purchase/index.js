import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase, createPurchase, updatePurchase, getPurchaseDetails } from "../../api/PurchaseApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { purchaseForm } from "./formData";
import { dateConversion, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import { getSupplier } from "../../api/SupplierApi";
import { getProduct } from "../../api/ProductApi";
import { getPaymentEntry } from "../../api/PaymentEntryApi";
import moment from "moment";

let editData = false;

const Purchase = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*   const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)
    let pageAccessData = filterArray(localData.pages, "pageId", 4)
    let accessIds = pageAccessData[0].access.split(',') */

  const getPurchaseSuccess = useSelector((state) => state.purchaseReducer.getPurchaseSuccess);
  const getPurchaseList = useSelector((state) => state.purchaseReducer.getPurchaseList);
  const getPurchaseFailure = useSelector((state) => state.purchaseReducer.getPurchaseFailure);

  const getPurchaseDetailsSuccess = useSelector((state) => state.purchaseReducer.getPurchaseDetailsSuccess);
  const getPurchaseDetailsList = useSelector((state) => state.purchaseReducer.getPurchaseDetailsList);
  const getPurchaseDetailsFailure = useSelector((state) => state.purchaseReducer.getPurchaseDetailsFailure);

  const getPaymentEntrySuccess = useSelector((state) => state.paymentEntryReducer.getPaymentEntrySuccess);
  const getPaymentEntryList = useSelector((state) => state.paymentEntryReducer.getPaymentEntryList);
  const getPaymentEntryFailure = useSelector((state) => state.paymentEntryReducer.getPaymentEntryFailure);

  const getSupplierSuccess = useSelector((state) => state.supplierReducer.getSupplierSuccess);
  const getSupplierList = useSelector((state) => state.supplierReducer.getSupplierList);
  const getSupplierFailure = useSelector((state) => state.supplierReducer.getSupplierFailure);

  const getProductSuccess = useSelector((state) => state.productReducer.getProductSuccess);
  const getProductList = useSelector((state) => state.productReducer.getProductList);
  const getProductFailure = useSelector((state) => state.productReducer.getProductFailure);

  const createPurchaseSuccess = useSelector((state) => state.purchaseReducer.createPurchaseSuccess);
  const createPurchaseData = useSelector((state) => state.purchaseReducer.createPurchaseData);
  const createPurchaseFailure = useSelector((state) => state.purchaseReducer.createPurchaseFailure);

  const updatePurchaseSuccess = useSelector((state) => state.purchaseReducer.updatePurchaseSuccess);
  const updatePurchaseData = useSelector((state) => state.purchaseReducer.updatePurchaseData);
  const updatePurchaseFailure = useSelector((state) => state.purchaseReducer.updatePurchaseFailure);

  const purchaseErrorMessage = useSelector((state) => state.purchaseReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
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
              onClick={() => onPurchaseDetails(record, index)} onEditForm
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

  const [state, setState] = useState({
    supplierId: {},
    productId: {},
    qty: "",
    payment: "",
    advanceAmount: "",
    pendingAmount: "",
    totalAmount: "",
    transportCharge: "",
    amount: ""

  })
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
    dispatch(getPurchase(requestData))
    dispatch(getSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getPurchaseSuccess) {
      setParentList(getPurchaseList)
      dispatch({ type: "RESET_GET_PURCHASE" })
    } else if (getPurchaseFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_PURCHASE" })
    }
  }, [getPurchaseSuccess, getPurchaseFailure]);

  useEffect(() => {
    if (getSupplierSuccess) {
      setState({
        ...state,
        supplierList: getSupplierList
      })
      const requestData = {
        isActive: 1
      }
      dispatch(getProduct(requestData))
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
    if (getPurchaseDetailsSuccess) {
      setState({
        ...state,
        purchaseList: getPurchaseDetailsList
      })
      onEditForm(getPurchaseDetailsList[0])
      dispatch({ type: "RESET_GET_PURCHASE_DETAILS" })
    } else if (getPurchaseDetailsFailure) {
      setState({
        ...state,
        purchaseList: []
      })
      dispatch({ type: "RESET_GET_PURCHASE_DETAILS" })
    }
  }, [getPurchaseDetailsSuccess, getPurchaseDetailsFailure]);

  useEffect(() => {
    if (getPaymentEntrySuccess) {
      setState({
        ...state,
        paymentEntryList: getPaymentEntryList,
        advanceAmount: getPaymentEntryList[0]?.advanceAmt || "0",
        pendingAmount: getPaymentEntryList[0]?.pendingAmt || "0",
      })
      dispatch({ type: "RESET_GET_PAYMENT_ENTRY" })
    } else if (getPaymentEntryFailure) {
      setState({
        ...state,
        paymentEntryList: []
      })
      dispatch({ type: "RESET_GET_PAYMENT_ENTRY" })
    }
  }, [getPaymentEntrySuccess, getPaymentEntryFailure]);

  useEffect(() => {
    if (getProductSuccess) {
      setState({
        ...state,
        productList: getProductList
      })
      dispatch({ type: "RESET_GET_PRODUCT" })
    } else if (getProductFailure) {
      setState({
        ...state,
        productList: []
      })
      dispatch({ type: "RESET_GET_PRODUCT" })
    }
  }, [getProductSuccess, getProductFailure]);

  useEffect(() => {
    if (createPurchaseSuccess) {
      const temp_state = [createPurchaseData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_PURCHASE" })
    } else if (createPurchaseFailure) {
      dispatch({ type: "RESET_CREATE_PURCHASE" })
    }
  }, [createPurchaseSuccess, createPurchaseFailure]);

  useEffect(() => {
    if (updatePurchaseSuccess) {
      updateTable(updatePurchaseData[0])
      dispatch({ type: "RESET_UPDATE_PURCHASE" })
    } else if (updatePurchaseFailure) {
      dispatch({ type: "RESET_UPDATE_PURCHASE" })
    }
  }, [updatePurchaseSuccess, updatePurchaseFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.purchaseId != selectedItem.purchaseId;
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
      paymentDate: "",
      productId: "",
      qty: "",
      amount: "",
      payment: "",
      transportCharge: "",
      advanceAmount: "",
      pendingAmount: "",
      totalAmount: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onPurchaseDetails = (data, index) => {
    const requestData = {
      supplierId: data.supplierId
    }
    dispatch(getPurchaseDetails(requestData))
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  useEffect(() => {
    if (state.amount != "") {
      const paymentCur = state?.payment || 0
      const transportChar = state.transportCharge == "" ? 0 : state.transportCharge
      const totalAmount = parseInt(state?.amount || 0) - parseInt(state?.advanceAmount || 0) + parseInt(transportChar)
      const pendingAmt = parseInt(totalAmount) - parseInt(paymentCur)
      setState({
        ...state,
        totalAmount: totalAmount,
        pendingAmount: pendingAmt
      })
    }
  }, [state.payment, state.amount, state.transportCharge, state.advanceAmount]);

  const onHandleSupplier = (selectedData, index, name) => {
    const requestData = {
      supplierId: selectedData.supplierId
    }
    dispatch(getPaymentEntry(requestData))
    setState({
      ...state,
      [name]: selectedData,
    })
  }

  const onHandleQuantity = (event, index) => {
    const selecedVal = event.target.value == "" ? 0 : event.target.value
    const amountCal = parseInt(selecedVal) * parseInt(state.productId.amount)
    setState({
      ...state,
      [event.target.name]: event.target.value,
      amount: amountCal,

    })
  }

  const onHandleProduct = (selectedData, index, name) => {
    setState({
      ...state,
      [name]: selectedData,
      amount: selectedData?.amount || 0,
      qty: 1
    })
  }

  const onEditForm = (data) => {
    const selectedSupplierObj = filterArray(state.supplierList, "supplierId", data.supplierId)
    const selectedProductObj = filterArray(state.productList, "productId", data.productId)
    setState({
      ...state,
      supplierId: selectedSupplierObj[0] || "",
      productId: selectedProductObj[0] || "",
      qty: data?.qty || "",
      amount: data?.amount || "",
      payment: data?.paidAmount || "",
      transportCharge: data?.transportCharge || "",
      advanceAmount: data?.advanceAmt || "",
      pendingAmount: data?.pendingAmt || "0",
      totalAmount: parseInt(data?.amount || 0) + parseInt(data?.transportCharge) || "",
      paymentDate: data.purchaseDate ? updateDateConversion(data.purchaseDate, "DD-MM-YYYY") : "",
      perviousDate: data.purchaseDate ? updateDateConversion(data.purchaseDate, "DD-MM-YYYY") : "",
    })
    editData = true
    setCreateModule(true)
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onDeleteForm = () => {
    const request = {
      isDelete: 1,
      paymentHistoryId : selectedItem.paymentHistoryId,
      supplierId: selectedItem.supplierId,
    }
    dispatch(updatePurchase(request, selectedItem.purchaseId))
  }

  const onSubmitForm = () => {
    const dateChecker = state.paymentDate._i && state.paymentDate._i == state.perviousDate._i ? moment(state.paymentDate).add(1, 'days').format('YYYY-MM-DD') : dateConversion(state.paymentDate, "YYYY-MM-DD")
    const request = {
      supplierId: supplierId.supplierId,
      productId: productId.productId,
      qty: qty,
      amount: amount,
      paidAmount: parseInt(payment) + parseInt(advanceAmount),
      transportCharge: transportCharge,
      purchaseDate: dateChecker,
      paymentEntryDetails: {
        supplierId: supplierId.supplierId,
        pendingAmt: pendingAmount,
        paidAmt: parseInt(payment) + parseInt(advanceAmount),
        lastPayDate: dateChecker,
        advanceAmt: 0
      },
      paymentHistory: {
        supplierId: supplierId.supplierId,
        paidAmount: parseInt(payment) + parseInt(advanceAmount),
        balanceAmount: pendingAmount,
        paymentDate: dateChecker
      }
    }
    if (editData) {
      request.paymentHistory.paymentHistoryId = selectedItem.paymentHistoryId
      dispatch(updatePurchase(request, selectedItem.purchaseId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updatePurchase(deleteRequest, selectedItem.purchaseId))
    } else {
      dispatch(createPurchase(request))
    }
  }

  const {
    supplierId,
    productId,
    qty,
    amount,
    payment,
    advanceAmount,
    pendingAmount,
    transportCharge,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="lg" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Purchase`}>
        <FormLayout dynamicForm={purchaseForm} noOfColumns={2} onChangeCallBack={{ "onHandleQuantity": onHandleQuantity, "onHandleSupplier": onHandleSupplier, "onHandleProduct": onHandleProduct }} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onDeleteForm} title={`Delete Purchase`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Purchase List"} onClickForm={onCreateForm} uniqueKey={"purchaseId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Purchase;