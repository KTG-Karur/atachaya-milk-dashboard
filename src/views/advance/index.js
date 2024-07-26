import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdvance, createAdvance, updateAdvance } from "../../api/AdvanceApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { advanceForm } from "./formData";
import { getSupplier } from "../../api/SupplierApi";
import { dateConversion, dateConversionNormal, filterArray, showConfirmationDialog, showMessage, updateDateConversion } from "../../utils/applicationFun";
import moment from "moment";

let editData = false;

const Advance = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getAdvanceSuccess = useSelector((state) => state.advanceReducer.getAdvanceSuccess);
  const getAdvanceList = useSelector((state) => state.advanceReducer.getAdvanceList);
  const getAdvanceFailure = useSelector((state) => state.advanceReducer.getAdvanceFailure);

  const getSupplierSuccess = useSelector((state) => state.supplierReducer.getSupplierSuccess);
  const getSupplierList = useSelector((state) => state.supplierReducer.getSupplierList);
  const getSupplierFailure = useSelector((state) => state.supplierReducer.getSupplierFailure);

  const createAdvanceSuccess = useSelector((state) => state.advanceReducer.createAdvanceSuccess);
  const createAdvanceData = useSelector((state) => state.advanceReducer.createAdvanceData);
  const createAdvanceFailure = useSelector((state) => state.advanceReducer.createAdvanceFailure);

  const updateAdvanceSuccess = useSelector((state) => state.advanceReducer.updateAdvanceSuccess);
  const updateAdvanceData = useSelector((state) => state.advanceReducer.updateAdvanceData);
  const updateAdvanceFailure = useSelector((state) => state.advanceReducer.updateAdvanceFailure);

  const advanceErrorMessage = useSelector((state) => state.advanceReducer.errorMessage);

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
      title: "Advance Amount",
      dataIndex: "advanceAmount",
      key: "advanceAmount",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
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
      isActive: 1,
      isAdvance : true
    }
    dispatch(getAdvance(requestData))
    dispatch(getSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getAdvanceSuccess) {
      setParentList(getAdvanceList)
      dispatch({ type: "RESET_GET_ADVANCE" })
    } else if (getAdvanceFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_ADVANCE" })
    }
  }, [getAdvanceSuccess, getAdvanceFailure]);

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
    if (createAdvanceSuccess) {
      const temp_state = [createAdvanceData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_ADVANCE" })
    } else if (createAdvanceFailure) {
      dispatch({ type: "RESET_CREATE_ADVANCE" })
    }
  }, [createAdvanceSuccess, createAdvanceFailure]);

  useEffect(() => {
    if (updateAdvanceSuccess) {
      updateTable(updateAdvanceData[0])
      dispatch({ type: "RESET_UPDATE_ADVANCE" })
    } else if (updateAdvanceFailure) {
      dispatch({ type: "RESET_UPDATE_ADVANCE" })
    }
  }, [updateAdvanceSuccess, updateAdvanceFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.paymentHistoryId != selectedItem.paymentHistoryId;
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
      advanceAmount: "",
      reason: "",
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    const selectedSupplierObj = filterArray(state.supplierList, "supplierId", data.supplierId)
    setState({
      ...state,
      supplierId: selectedSupplierObj[0] || "",
      paymentDate: data.paymentDate ? updateDateConversion(data.paymentDate, "DD-MM-YYYY") : "",
      perviousDate : data.paymentDate ? updateDateConversion(data.paymentDate, "DD-MM-YYYY") : "",
      advanceAmount: data?.advanceAmount || "",
      reason: data?.reason || "",
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
      supplierId : selectedItem.supplierId,
      isActive: 0
    }
    dispatch(updateAdvance(deleteRequest, selectedItem.paymentHistoryId))
  }

  const onSubmitForm = () => {
    const dateChecker = state.paymentDate._i && state.paymentDate._i == state.perviousDate._i ? moment(state.paymentDate). add(1, 'days').format('YYYY-MM-DD') : dateConversion(state.paymentDate, "YYYY-MM-DD")
    const request = {
      supplierId: supplierId.supplierId || "",
      paymentDate: dateChecker,
      advanceAmount: advanceAmount,
      reason: reason,
      isAdvance : 1
    }
    if (editData) {
      dispatch(updateAdvance(request, selectedItem.paymentHistoryId))
    }else {
      dispatch(createAdvance(request))
    }
  }

  const {
    supplierId,
    paymentDate,
    advanceAmount,
    reason,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Advance`}>
        <FormLayout dynamicForm={advanceForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitDelete} title={`Delete Advance`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Advance List"} onClickForm={onCreateForm} uniqueKey={"paymentHistoryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Advance;