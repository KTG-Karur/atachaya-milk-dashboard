import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuotation, createQuotation, updateQuotation, getQuotationDetails, deleteOrderProductQuotation } from "../../api/QuotationApi";
import _ from "lodash";
import { MdAddTask, MdArrowCircleLeft, MdDelete, MdDownload, MdEdit, MdOutlineClose, MdOutlineUpdate, MdPrint } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import Table from 'react-bootstrap/Table';
import FormLayout from "../../utils/formLayout";
import { quotationForm, productQuotationForm, filterForm, updateStatusForm } from "./formData";
import { calculateQuotationAmount, dateConversion, dateConversionNormal, filterArray, findCustomerCat, formatStr, priceFormat, removeNullKeyFromObj, showConfirmationDialog, showMessage, updateDateConversion, roundedAmount, findNullValues } from "../../utils/applicationFun";
import { createCustomer, getCustomer } from "../../api/CustomerApi";
import TableFormLayout from "../../utils/TableLayout";
import { Link } from "react-router-dom";
import { getProduct } from "../../api/ProductApi";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import moment from "moment";
import { getValueType } from "../../api/ValueTypeApi";
import InvoiceFiveprint from "./invoiceTemplate";
import { usePDF } from "react-to-pdf";
import { getQuotationStatus } from "../../api/QuotationStatusApi";
import { customerForm } from "../customer/formData";
import TempView from "../../components/Atom/TempView";
import { getCustomerCategory } from "../../api/CustomerCategoryApi";
import { getColor } from "../../api/ColorApi";

let editData = false;
let printData = false;

const Quotation = ({ navigation }) => {

  const dispatch = useDispatch();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 2)
  let accessIds = pageAccessData[0].access.split(',')

  const getQuotationSuccess = useSelector((state) => state.quotationReducer.getQuotationSuccess);
  const getQuotationList = useSelector((state) => state.quotationReducer.getQuotationList);
  const getQuotationFailure = useSelector((state) => state.quotationReducer.getQuotationFailure);

  const getColorSuccess = useSelector((state) => state.colorReducer.getColorSuccess);
  const getColorList = useSelector((state) => state.colorReducer.getColorList);
  const getColorFailure = useSelector((state) => state.colorReducer.getColorFailure);

  const getQuotationDetailsSuccess = useSelector((state) => state.quotationReducer.getQuotationDetailsSuccess);
  const getQuotationDetailsList = useSelector((state) => state.quotationReducer.getQuotationDetailsList);
  const getQuotationDetailsFailure = useSelector((state) => state.quotationReducer.getQuotationDetailsFailure);

  const getProductSuccess = useSelector((state) => state.productReducer.getProductSuccess);
  const getProductList = useSelector((state) => state.productReducer.getProductList);
  const getProductFailure = useSelector((state) => state.productReducer.getProductFailure);

  const getValueTypeSuccess = useSelector((state) => state.valueTypeReducer.getValueTypeSuccess);
  const getValueTypeList = useSelector((state) => state.valueTypeReducer.getValueTypeList);
  const getValueTypeFailure = useSelector((state) => state.valueTypeReducer.getValueTypeFailure);

  const getQuotationStatusSuccess = useSelector((state) => state.quotationStatusReducer.getQuotationStatusSuccess);
  const getQuotationStatusList = useSelector((state) => state.quotationStatusReducer.getQuotationStatusList);
  const getQuotationStatusFailure = useSelector((state) => state.quotationStatusReducer.getQuotationStatusFailure);

  const getCustomerCategorySuccess = useSelector((state) => state.customerCategoryReducer.getCustomerCategorySuccess);
  const getCustomerCategoryList = useSelector((state) => state.customerCategoryReducer.getCustomerCategoryList);
  const getCustomerCategoryFailure = useSelector((state) => state.customerCategoryReducer.getCustomerCategoryFailure);

  const getCustomerSuccess = useSelector((state) => state.customerReducer.getCustomerSuccess);
  const getCustomerList = useSelector((state) => state.customerReducer.getCustomerList);
  const getCustomerFailure = useSelector((state) => state.customerReducer.getCustomerFailure);

  const createQuotationSuccess = useSelector((state) => state.quotationReducer.createQuotationSuccess);
  const createQuotationData = useSelector((state) => state.quotationReducer.createQuotationData);
  const createQuotationFailure = useSelector((state) => state.quotationReducer.createQuotationFailure);

  const createCustomerSuccess = useSelector((state) => state.customerReducer.createCustomerSuccess);
  const createCustomerData = useSelector((state) => state.customerReducer.createCustomerData);
  const createCustomerFailure = useSelector((state) => state.customerReducer.createCustomerFailure);

  const updateQuotationSuccess = useSelector((state) => state.quotationReducer.updateQuotationSuccess);
  const updateQuotationData = useSelector((state) => state.quotationReducer.updateQuotationData);
  const updateQuotationFailure = useSelector((state) => state.quotationReducer.updateQuotationFailure);

  const deleteOrderProductSuccess = useSelector((state) => state.quotationReducer.deleteOrderProductSuccess);
  const deleteOrderProductFailure = useSelector((state) => state.quotationReducer.deleteOrderProductFailure);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Quotation Serial",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Followed By",
      dataIndex: "displayKey",
      key: "displayKey",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Appointment Date",
      render: (record) => {
        const selectedDate = dateConversionNormal(record.appointmentDate, "DD-MM-YYYY")
        const currentDate = moment().format("DD-MM-YYYY")
        const tommorrowDate = moment().add(1, 'd').format("DD-MM-YYYY")
        const yesterDayDate = moment().subtract(1, 'd').format("DD-MM-YYYY")
        const colorBackground = selectedDate == currentDate ? "bg-success-light" : selectedDate >= tommorrowDate ? "bg-primary-light" : selectedDate <= yesterDayDate ? "bg-danger-light" : ""
        return (
          <div>
            <span className={`badge badge-pill ${colorBackground} p-0`} style={{ fontSize: 12 }}>{selectedDate}</span>
          </div>
        )
      }
    },
    {
      title: "Last Spoken Date",
      render: (record) => {
        const spokenDate = record.lastAppointment ? dateConversionNormal(record.lastAppointment, "DD-MM-YYYY") : null
        return (
          <>
            {spokenDate != null ? spokenDate : "-"}
          </>
        )
      }
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <div>
          <span className="badge badge-pill bg-primary-light">{record?.quotationStatusName}</span>
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
              title="Edit"
              onClick={() => onEditData(record, index)}
            ></MdEdit>}
            {_.includes(accessIds, '4') && <MdPrint
              className="text-success cursor-pointer"
              size={18}
              title="Print"
              onClick={() => onPrintForm(record, index)}
            ></MdPrint>}
            {_.includes(accessIds, '5') && <MdOutlineUpdate
              className="text-success cursor-pointer"
              size={18}
              title="Status"
              onClick={() => onUpdateStatus(record, index)}
            ></MdOutlineUpdate>}
            {_.includes(accessIds, '3') && <MdDelete
              className="text-danger cursor-pointer"
              size={18}
              title="Delete"
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

  const [state, setState] = useState({
    customerList: [],
    productList: [],
    productUnitList: [],
    productTotalAmount: 0
  })
  const { toPDF, targetRef } = usePDF({ filename: `${state?.fileName || "testing"}.pdf` });
  const [parentList, setParentList] = useState([])
  const [createModule, setCreateModule] = useState(false)
  const [customerModule, setCustomerModule] = useState(false)
  const [printModule, setPrintModule] = useState(false)
  const [productQuotationState, setProductQuotationState] = useState([
    {
      selectedProduct: "",
      selectedColor: "",
      description: "",
      lengthData: "",
      numbers: "",
      rate: "",
      width: "",
      valueTypeId: "",
      quantity: "",
      amount: "",
    }
  ])
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [getViewModule, setGetViewModule] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [statusModule, setStatusModule] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      quotationStatusId: 1,
      isActive: "true"
    }
    dispatch(getQuotation(requestData))
    dispatch(getCustomer(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getQuotationSuccess) {
      setParentList(getQuotationList)
      dispatch({ type: "RESET_GET_QUOTATION" })
    } else if (getQuotationFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_QUOTATION" })
    }
  }, [getQuotationSuccess, getQuotationFailure]);

  useEffect(() => {
    if (getValueTypeSuccess) {
      setState({
        ...state,
        valueTypeList: getValueTypeList
      })
      const requestData = {
        isActive: "true"
      }
      dispatch(getQuotationStatus(requestData))
      dispatch({ type: "RESET_GET_VALUE_TYPE" })
    } else if (getValueTypeFailure) {
      setState({
        ...state,
        valueTypeList: []
      })
      dispatch({ type: "RESET_GET_VALUE_TYPE" })
    }
  }, [getValueTypeSuccess, getValueTypeFailure]);

  useEffect(() => {
    if (getQuotationDetailsSuccess) {
      const customerName= getQuotationDetailsList[0]?.customerName
      const currentDate= moment().format("DD")
      const serialNum = getQuotationDetailsList[0]?.serialNo
      const parts = serialNum.split("/");
      const count = parts[parts.length - 1];
      const fileName = `${currentDate}-${count}-${customerName.replace(/\s/g, "-")}`
      setState({
        ...state,
        quotationDetailsList: getQuotationDetailsList,
        fileName : fileName
      })
      printData ? setPrintModule(true) : onEditForm(getQuotationDetailsList[0])
      dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
    } else if (getQuotationDetailsFailure) {
      setState({
        ...state,
        quotationDetailsList: []
      })
      dispatch({ type: "RESET_GET_QUOTATION_DETAILS" })
    }
  }, [getQuotationDetailsSuccess, getQuotationDetailsFailure]);

  useEffect(() => {
    if (getCustomerCategorySuccess) {
      setState({
        ...state,
        customerCategoryList: getCustomerCategoryList
      })
      const req={
        isActive : 1
      }
      dispatch(getColor(req))
      dispatch({ type: "RESET_GET_CUSTOMER_CATEGORY" })
    } else if (getCustomerCategoryFailure) {
      setState({
        ...state,
        customerCategoryList: []
      })
      dispatch({ type: "RESET_GET_CUSTOMER_CATEGORY" })
    }
  }, [getCustomerCategorySuccess, getCustomerCategoryFailure]);

  useEffect(() => {
    if (getColorSuccess) {
      setState({
        ...state,
        colorList: getColorList
      })
      dispatch({ type: "RESET_GET_COLOR" })
    } else if (getColorFailure) {
      setState({
        ...state,
        colorList: []
      })
      dispatch({ type: "RESET_GET_COLOR" })
    }
  }, [getColorSuccess, getColorFailure]);

  useEffect(() => {
    if (getCustomerSuccess) {
      setState({
        ...state,
        customerList: getCustomerList
      })
      const requestData = {
        isActive: "true"
      }
      dispatch(getProduct(requestData))
      dispatch({ type: "RESET_GET_CUSTOMER" })
    } else if (getCustomerFailure) {
      setState({
        ...state,
        customerList: []
      })
      dispatch({ type: "RESET_GET_CUSTOMER" })
    }
  }, [getCustomerSuccess, getCustomerFailure]);

  useEffect(() => {
    if (getProductSuccess) {
      setState({
        ...state,
        productList: getProductList
      })
      const requestData = {
        isActive: "true"
      }
      dispatch(getValueType(requestData))
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
    if (getQuotationStatusSuccess) {
      setState({
        ...state,
        quotationStatusList: getQuotationStatusList
      })
      const requestData = {
        isActive: true
      }
      dispatch(getCustomerCategory(requestData))
      dispatch({ type: "RESET_GET_QUOTATION_STATUS" })
    } else if (getQuotationStatusFailure) {
      setState({
        ...state,
        quotationStatusList: []
      })
      dispatch({ type: "RESET_GET_QUOTATION_STATUS" })
    }
  }, [getQuotationStatusSuccess, getQuotationStatusFailure]);

  useEffect(() => {
    if (deleteOrderProductSuccess) {
      showMessage("success", "Deleted Successfully")
      dispatch({ type: "RESET_DELETE_ORDER_PRODUCT" })
    } else if (deleteOrderProductFailure) {
      dispatch({ type: "RESET_DELETE_ORDER_PRODUCT" })
    }
  }, [deleteOrderProductSuccess, deleteOrderProductFailure]);

  useEffect(() => {
    if (createQuotationSuccess) {
      const temp_state = [createQuotationData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_QUOTATION" })
    } else if (createQuotationFailure) {
      dispatch({ type: "RESET_CREATE_QUOTATION" })
    }
  }, [createQuotationSuccess, createQuotationFailure]);

  useEffect(() => {
    if (createCustomerSuccess) {
      const temp_state = [createCustomerData[0], ...state.customerList];
      setState({
        ...state,
        customerList: temp_state,
        selectedCustomer: createCustomerData[0]
      })
      clearItems()
      setSelectedCategory(findCustomerCat(createCustomerData[0].customerCategoryName))
      setShowTable(true)
      showMessage("success", "Created Successfully...!")
      setCustomerModule(false)
      dispatch({ type: "RESET_CREATE_CUSTOMER" })
    } else if (createCustomerFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER" })
    }
  }, [createCustomerSuccess, createCustomerFailure]);

  useEffect(() => {
    if (updateQuotationSuccess) {
      updateTable(updateQuotationData[0])
      dispatch({ type: "RESET_UPDATE_QUOTATION" })
    } else if (updateQuotationFailure) {
      dispatch({ type: "RESET_UPDATE_QUOTATION" })
    }
  }, [updateQuotationSuccess, updateQuotationFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule || statusModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.quotationId != selectedItem.quotationId;
      });
      setParentList(remainingData)
      const statusMsg = statusModule ? "Status Updated" : "Deleted"
      showMessage("success", `${statusMsg} Successfully...!`)
    } else {
      temp_state[selectedIndex] = updatedItem;
      setParentList(temp_state)
      showMessage("success", "Updated Successfully...!")
    }
    closeModule()
  }

  const closeModule = () => {
    setCreateModule(false)
    setGetViewModule(true)
    setDeleteModule(false)
    setStatusModule(false)
    setPrintModule(false)
    setShowTable(false)
    editData = false
    printData = false
  }

  const onUpdateStatus = (data, index) => {
    const selectedStatusObj = filterArray(state.quotationStatusList, "quotationStatusId", data.quotationStatusId)
    setState({
      ...state,
      quotationStatusId: selectedStatusObj[0]
    })
    setStatusModule(true)
    setSelectedItem(data)
    setSelectedIndex(index)
  }

  const clearState = () => {
    setState({
      ...state,
      selectedCustomer: "",
      productTotalAmount: "",
      transportCharge: "",
      serialNo: "",
      appointmentDate: ""
    })
    const resetData = [{
      selectedProduct: "",
      description: "",
      lengthData: "",
      numbers: "",
      rate: "",
      width: "",
      valueTypeId: "",
      quantity: "",
      amount: "",
    }]
    setProductQuotationState(resetData)
  }

  const onDeleteItem = (data, index) => {
    setSelectedItem(data)
    setSelectedIndex(index)
    setDeleteModule(true)
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setGetViewModule(false)
    setPrintModule(false)
    setCreateModule(true)
  }

  const onEditData = (data, index) => {
    setGetViewModule(false)
    const request = {
      isActive: true,
      quotationId: data.quotationId
    }
    dispatch(getQuotationDetails(request))
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const clearItems = () => {
    const resetData = [{
      selectedProduct: "",
      selectedColor: "",
      description: "",
      lengthData: "",
      numbers: "",
      rate: "",
      width: "",
      valueTypeId: "",
      quantity: "",
      amount: "",
    }]
    setProductQuotationState(resetData)
  }

  const onPrintForm = (data, index) => {
    printData = true
    setGetViewModule(false)
    const request = {
      isActive: true,
      quotationId: data.quotationId
    }
    dispatch(getQuotationDetails(request))
  }

  const onEditForm = (data, index) => {
    const selectedCustomerObj = filterArray(state.customerList, "customerId", data.customerId)
    setSelectedCategory(findCustomerCat(data.customerCategoryName))
    setState({
      ...state,
      selectedCustomer: selectedCustomerObj[0] || {},
      serialNo: data?.serialNo || "",
      productTotalAmount: data?.totalAmount || "",
      // appointmentDate: data.appointmentDate ? updateDateConversion(data.appointmentDate) : "",
      transportCharge: data?.transportCharge || " ",
      selectedAppointmentDate : data.appointmentDate ? dateConversionNormal(data.appointmentDate, "DD-MM-YYYY") : "",
    })
    const temp_arr = []
    data.orderProductDetails.map((ele) => {
      const selectedProductObj = filterArray(state.productList, "productId", ele.productId)
      const selectedValueTypeObj = filterArray(state.valueTypeList, "valueTypeId", ele.valueTypeId)
      const selectedColorObj = ele.colorId ? filterArray(state.colorList, "colorId", ele.colorId) : ""
      const requestData = {
        "orderProductId": ele.orderProductId,
        "selectedProduct": selectedProductObj[0],
        "numbers": ele.numbers,
        "selectedColor": selectedColorObj[0],
        "quantity": ele.quantity,
        "description": ele?.description || "",
        "lengthData": ele.length,
        "width": ele.width,
        "rate": ele.rate,
        "amount": ele.amount,
        "singleProductPrice": selectedProductObj[0][formatStr(data.customerCategoryName) + "Price"],
        "valueTypeId": selectedValueTypeObj[0]
      }
      temp_arr.push(requestData)
    })
    setProductQuotationState(temp_arr)
    editData = true
    setCreateModule(true)
    setShowTable(true)
  }


  const onSubmitForm = () => {
    let resultData = []
    let validatorReq = false
    productQuotationState.map((ele) => {
      const req = {
        "orderProductId" : ele?.orderProductId || null,
        "productId": ele?.selectedProduct?.productId || null,
        "quantity": ele?.quantity || null,
        "width": ele?.width || null,
        "amount": ele?.amount || null,
        "length": ele?.lengthData || null,
        "valueTypeId": ele?.valueTypeId?.valueTypeId || null,
        "numbers": ele?.numbers || null,
        "description": ele?.description.replace(/'/g, "\\'").replace(/"/g, '\\"') || "",
        "rate": ele?.rate || null,
        "colorId": ele?.selectedColor?.colorId || null,
      }
      const validatorReqCheck = findNullValues(req)
      if(validatorReqCheck){
        validatorReq = true
      }
      let requestData = removeNullKeyFromObj(req)
      resultData.push(requestData)
    })

    const request = {
      "customerId": state?.selectedCustomer?.customerId || null,
      "appointmentDate": state.appointmentDate ? dateConversion(state?.appointmentDate, "YYYY-MM-DD") : null,
      "quotationStatusId": 1,
      "totalAmount": state?.productTotalAmount || null,
      "transportCharge": state?.transportCharge || null,
      "orderProduct": resultData,
      "createdBy": localData.userId,
    }
    let requestFilter = removeNullKeyFromObj(request)
    if(deleteModule){
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateQuotation(deleteRequest, selectedItem.quotationId))
    }
    else if(validatorReq){
      showMessage("warning", "Please Fill the Given Field...!")
      return false;
    }
    else if (editData) {
      dispatch(updateQuotation(requestFilter, selectedItem.quotationId))
    }else {
      dispatch(createQuotation(requestFilter))
    }
  }

  //addfields
  const onAddForm = () => {
    const addItem = {
      selectedProduct: "",
      description: "",
      lengthData: "",
      numbers: "",
      rate: "",
      width: "",
      valueTypeId: "",
      quantity: "",
      amount: "",
    }
    setProductQuotationState([...productQuotationState, addItem])
  }

  const onDeleteProductList = (index) => {
    const temp_state = [...productQuotationState]
    if (temp_state[index].orderProductId) {
      const orderProdId = temp_state[index].orderProductId
      showConfirmationDialog(
        "You won't be able to revert this!",
        () => {
          dispatch(deleteOrderProductQuotation(null, orderProdId));
          temp_state.splice(index, 1);
          setProductQuotationState(temp_state);
        },
        "Yes, Delete it!"
      )
    } else {
      temp_state.splice(index, 1)
      setProductQuotationState(temp_state)
    }
  }

  const onStatusSubmit = () => {
    const reqObj = {
      "quotationStatusId": state?.quotationStatusId.quotationStatusId || {}
    }
    dispatch(updateQuotation(reqObj, selectedItem.quotationId))
  }

  //calculation
  const onSelectCustomer = (selectedData, index, name) => {
    setState({
      ...state,
      [name]: selectedData,
    })
    clearItems()
    setSelectedCategory(findCustomerCat(selectedData.customerCategoryName))
    setShowTable(true)
  }

  const onHandleProduct = (selectedData, index, name) => {
    let productPrice = selectedData[selectedCategory]
    let temp_state = [...productQuotationState]
    temp_state[index].width = selectedData.defaultWidth
    temp_state[index].rate = productPrice
    temp_state[index][name] = selectedData
    temp_state[index].selectedColor = ""
    temp_state[index].valueTypeId = ""
    temp_state[index].lengthData = ""
    temp_state[index].numbers = ""
    temp_state[index].quantity = ""
    temp_state[index].amount = ""
    setProductQuotationState(temp_state)
  }

  const onCalculate = (event, index, name = null) => {
    let value;
    let fieldName;
    if (name != null) {
      value = event
      fieldName = name
    } else {
      value = event.target.value
      fieldName = event.target.name
    }
    let temp_state = [...productQuotationState]
    temp_state[index][fieldName] = value

    let numbers = temp_state[index]?.numbers || null
    let width = temp_state[index]?.width || null
    let lengthData = temp_state[index]?.lengthData || null
    let valueTypeId = temp_state[index]?.valueTypeId || null

    const amount = temp_state[index].rate
    let totalAmount = 0;

    if (numbers != null && width != null && lengthData != null && valueTypeId != null) {
      let checkRes = valueTypeId.valueTypeId == 1 ? true : false
      totalAmount = calculateQuotationAmount(numbers, lengthData, width, checkRes, amount)
    }
    const quantity = totalAmount?.quantity || ""
    const totalPriceAmt = totalAmount?.total || 0
    temp_state[index].quantity = quantity
    temp_state[index].amount = priceFormat(totalPriceAmt)
    setProductQuotationState(temp_state)

    let quotationAmount = 0
    quotationAmount = _.sumBy(temp_state, (item) => parseFloat(item.amount))
    setState({
      ...state,
      productTotalAmount: priceFormat(roundedAmount(quotationAmount))
    })
  } 

  const onHandleNagotiation = (event) => {
    const total = parseFloat(_.sumBy(productQuotationState, (item) => parseFloat(item.amount))) + parseFloat(event.target.value || 0)
    setState({
      ...state,
      [event.target.name]: event.target.value,
      productTotalAmount: priceFormat(roundedAmount(total))
    })
  }

  const onAppointmentHandle = (name) => {
    if (name == "Today") {
      const requestData = {
        quotationStatusId: 1,
        appointmentDate: moment().format("YYYY-MM-DD"),
        isActive: true
      }
      dispatch(getQuotation(requestData))
    } else if (name == "Previous") {
      const requestData = {
        quotationStatusId: 1,
        appointmentDate: moment().subtract(1, 'd').format("YYYY-MM-DD"),
        isActive: true
      }
      dispatch(getQuotation(requestData))
    } else if (name == "Tommorrow") {
      const requestData = {
        quotationStatusId: 1,
        appointmentDate: moment().add(1, 'd').format("YYYY-MM-DD"),
        isActive: true
      }
      dispatch(getQuotation(requestData))
    } else {
      const requestData = {
        quotationStatusId: 1,
        isActive: true
      }
      dispatch(getQuotation(requestData))
    }
  }

  const onCreateCustomer = () => {
    setState({
      ...state,
      customerName: "",
      customerCategoryId: "",
      customerContactNumber: "",
    })
    setCustomerModule(true)
  }

  const onSubmitCustomerForm = () => {
    const request = {
      customerName: state.customerName,
      customerContactNumber: state.customerContactNumber,
      customerCategoryId: state.customerCategoryId?.customerCategoryId || "",
    }
    dispatch(createCustomer(request))
  }

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      {getViewModule &&
        <>
          <TemplateCustomTable filterFields={true} uniqueKey={"quotationId"} filterForm={filterForm} filterFormCol={2} state={state} onClick={(name) => onAppointmentHandle(name)} setState={setState} tableName={"Quotation List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
        </>
      }

      <ModalViewBox show={customerModule} size="md" savetitle={"Save"} setshow={setCustomerModule} onSubmit={onSubmitCustomerForm} title={`Create Customer`}>
        <FormLayout dynamicForm={customerForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ></FormLayout>
      </ModalViewBox>

      {createModule && <TempView title={`${modelHeaderTitle} Quotations`} closeModule={() => closeModule()}>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-primary p-2" onClick={onCreateCustomer}>
            Add Customer
          </Link>
        </div>
        <div className="d-flex justify-content-end mt-4">
            <span>Appointment Date : {state.selectedAppointmentDate}</span>
          </div>
        <FormLayout dynamicForm={quotationForm} noOfColumns={4} defaultState={state} setDefaultState={setState} onChangeCallBack={{ "onSelectCustomer": onSelectCustomer }} />
        {showTable && <div className="mt-3 mb-5">
          <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" onClick={onAddForm}>
              <i
                className="fa fa-plus-circle me-2"
                aria-hidden="true"
              />
              Add
            </Link>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Color</th>
                <th>Description</th>
                <th>Value Type</th>
                <th>Length</th>
                <th>Numbers</th>
                <th>Quatity</th>
                <th>Rate (per)</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                (productQuotationState ? productQuotationState : []).map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <TableFormLayout tableState={productQuotationState} onChangeCallBack={{ "onHandleProduct": onHandleProduct, "onCalculate": onCalculate }} defaultState={state} setDefaultState={setProductQuotationState} index={index} dynamicForm={productQuotationForm} noOfColumns={6} iconDeletePress={(index) => onDeleteProductList(index)} ></TableFormLayout>
                    </React.Fragment>
                  )
                })
              }
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th className="text-end pt-3">Transport Charge :</th>
                <td className="m-2" ><input
                  type="text"
                  className="form-control mt-1"
                  name="transportCharge"
                  value={state?.transportCharge || ""}
                  id="exampleFormControlInput1"
                  onChange={onHandleNagotiation}
                  placeholder={`₹`} /> </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th className="text-end pt-3">Total Amount :</th>
                <td>&nbsp;&nbsp;₹ {state?.productTotalAmount || 0.00} </td>
                <td></td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-end">
            <Link className="btn btn-primary mt-5 mx-2" onClick={onSubmitForm}>
              <MdAddTask size={18} className="mx-2" />
              Submit &nbsp;
            </Link>
          </div>
        </div>
        }
      </TempView>}

      {printModule == true &&
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <div className="d-flex justify-content-start">
                  <MdArrowCircleLeft size={32} className="text-primary cursor-pointer" onClick={() => closeModule()} />
                  <h5 className="mx-3">Download Quotations</h5>
                </div>
              </div>
            </div>

            <div className="main-wrapper index-five">
              <div className="container">
                <div ref={targetRef}>
                  <InvoiceFiveprint data={state?.quotationDetailsList || []} />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <div className="file-link">
                  <Link className="btn btn-primary mx-2 mb-4" onClick={() => closeModule()}>
                    <MdOutlineClose size={18} className="mx-2" />
                    Close &nbsp;
                  </Link>
                  <Link className="btn btn-primary ml-5 mb-4" onClick={() => toPDF()}>
                    <MdDownload size={18} className="mx-2" />
                    PDF &nbsp;
                  </Link>
                </div></div>
            </div>
          </div>
        </div>
      }
      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Quotation`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <ModalViewBox show={statusModule} size="md" savetitle={"confirm"} setshow={setStatusModule} onSubmit={onStatusSubmit} title={`Update Quotation Status`}>
        <FormLayout dynamicForm={updateStatusForm} noOfColumns={1} defaultState={state} setDefaultState={setState} />
      </ModalViewBox>
    </>
  );
}

export default Quotation;