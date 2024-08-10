import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTankerEntry, createTankerEntry, updateTankerEntry } from "../../api/TankerEntryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { tankerEntryForm } from "./formData";
import { dateConversion, dateConversionNormal, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import { getTankerSupplier } from "../../api/TankerSupplierApi";
import moment from "moment";

let editData = false;

const TankerEntry = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /* const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getTankerEntrySuccess = useSelector((state) => state.tankerEntryReducer.getTankerEntrySuccess);
  const getTankerEntryList = useSelector((state) => state.tankerEntryReducer.getTankerEntryList);
  const getTankerEntryFailure = useSelector((state) => state.tankerEntryReducer.getTankerEntryFailure);

  const getTankerSupplierSuccess = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierSuccess);
  const getTankerSupplierList = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierList);
  const getTankerSupplierFailure = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierFailure);

  const createTankerEntrySuccess = useSelector((state) => state.tankerEntryReducer.createTankerEntrySuccess);
  const createTankerEntryData = useSelector((state) => state.tankerEntryReducer.createTankerEntryData);
  const createTankerEntryFailure = useSelector((state) => state.tankerEntryReducer.createTankerEntryFailure);

  const updateTankerEntrySuccess = useSelector((state) => state.tankerEntryReducer.updateTankerEntrySuccess);
  const updateTankerEntryData = useSelector((state) => state.tankerEntryReducer.updateTankerEntryData);
  const updateTankerEntryFailure = useSelector((state) => state.tankerEntryReducer.updateTankerEntryFailure);

  const tankerEntryErrorMessage = useSelector((state) => state.tankerEntryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Entry Date",
      dataIndex: "entryDate",
      key: "entryDate",
      render: (record) => {
        const dateFormat = record ? dateConversionNormal(record, "DD-MM-YYYY") : null
        return (
          <>
            {dateFormat != null ? dateFormat : "-"}
          </>
        )
      }
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
          <div>
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
    dispatch(getTankerEntry(requestData))
    dispatch(getTankerSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getTankerEntrySuccess) {
      setParentList(getTankerEntryList)
      dispatch({ type: "RESET_GET_TANKER_ENTRY" })
    } else if (getTankerEntryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_TANKER_ENTRY" })
    }
  }, [getTankerEntrySuccess, getTankerEntryFailure]);

  useEffect(() => {
    if (getTankerSupplierSuccess) {
      setState({
        ...state,
        tankerSupplierList: getTankerSupplierList
      })
      dispatch({ type: "RESET_GET_TANKER_SUPPLIER" })
    } else if (getTankerSupplierFailure) {
      setState({
        ...state,
        tankerSupplierList: []
      })
      dispatch({ type: "RESET_GET_TANKER_SUPPLIER" })
    }
  }, [getTankerSupplierSuccess, getTankerSupplierFailure]);

  useEffect(() => {
    if (createTankerEntrySuccess) {
      const temp_state = [createTankerEntryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_TANKER_ENTRY" })
    } else if (createTankerEntryFailure) {
      dispatch({ type: "RESET_CREATE_TANKER_ENTRY" })
    }
  }, [createTankerEntrySuccess, createTankerEntryFailure]);

  useEffect(() => {
    if (updateTankerEntrySuccess) {
      updateTable(updateTankerEntryData[0])
      dispatch({ type: "RESET_UPDATE_TANKER_ENTRY" })
    } else if (updateTankerEntryFailure) {
      dispatch({ type: "RESET_UPDATE_TANKER_ENTRY" })
    }
  }, [updateTankerEntrySuccess, updateTankerEntryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.tankerEntryId != selectedItem.tankerEntryId;
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
      entryDate: "",
      quantity: "",
      amount: "",
      tankerSupplierId: "",
      driverContactNo: "",
      driverName: "",
      vehicleNo: ""
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedTankerSupplierIdObj = filterArray(state.tankerSupplierList, "tankerSupplierId", data.tankerSupplierId)
    setState({
      ...state,
      entryDate: data.entryDate ? updateDateConversion(data.entryDate, "DD-MM-YYYY") : "",
      perviousDate : data.entryDate ? updateDateConversion(data.entryDate, "DD-MM-YYYY") : "",
      quantity: data?.quantity || "",
      driverContactNo: data?.driverContactNo || "",
      driverName: data?.driverName || "",
      amount: data?.amount || "",
      vehicleNo: data?.vehicleNo || "",
      tankerSupplierId: selectedTankerSupplierIdObj[0] || "",
    })
    editData = true
    setCreateModule(true)
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitDelete = ()=>{
    const deleteRequest = {
      isActive: 0
    }
    dispatch(updateTankerEntry(deleteRequest, selectedItem.tankerEntryId))
  }

  const onSubmitForm = () => {
    const dateChecker = state.entryDate._i && state.entryDate._i == state.perviousDate._i ? moment(state.entryDate). add(1, 'days').format('YYYY-MM-DD') : dateConversion(state.entryDate, "YYYY-MM-DD")
    const request = {
      entryDate: dateChecker,
      quantity: quantity,
      driverContactNo: driverContactNo,
      driverName: driverName,
      amount: amount,
      vehicleNo: vehicleNo,
      tankerSupplierId: tankerSupplierId.tankerSupplierId,
    }
    if (editData) {
      dispatch(updateTankerEntry(request, selectedItem.tankerEntryId))
    }else {
      dispatch(createTankerEntry(request))
    }
  }

  const {
    tankerSupplierId,
    quantity,
    vehicleNo,
    entryDate,
    driverName,
    driverContactNo,
    amount,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} TankerEntry`}>
        <FormLayout dynamicForm={tankerEntryForm} customAlign={true} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitDelete} title={`Delete TankerEntry`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Tanker Entry List"} onClickForm={onCreateForm} uniqueKey={"tankerEntryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default TankerEntry;