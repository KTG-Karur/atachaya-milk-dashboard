import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplier, createSupplier, updateSupplier } from "../../api/SupplierApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { supplierForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const Supplier = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getSupplierSuccess = useSelector((state) => state.supplierReducer.getSupplierSuccess);
  const getSupplierList = useSelector((state) => state.supplierReducer.getSupplierList);
  const getSupplierFailure = useSelector((state) => state.supplierReducer.getSupplierFailure);

  const createSupplierSuccess = useSelector((state) => state.supplierReducer.createSupplierSuccess);
  const createSupplierData = useSelector((state) => state.supplierReducer.createSupplierData);
  const createSupplierFailure = useSelector((state) => state.supplierReducer.createSupplierFailure);

  const updateSupplierSuccess = useSelector((state) => state.supplierReducer.updateSupplierSuccess);
  const updateSupplierData = useSelector((state) => state.supplierReducer.updateSupplierData);
  const updateSupplierFailure = useSelector((state) => state.supplierReducer.updateSupplierFailure);

  const supplierErrorMessage = useSelector((state) => state.supplierReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Supplier Code",
      dataIndex: "supplierCode",
      key: "supplierCode",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
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
    dispatch(getSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getSupplierSuccess) {
      setParentList(getSupplierList)
      dispatch({ type: "RESET_GET_SUPPLIER" })
    } else if (getSupplierFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_SUPPLIER" })
    }
  }, [getSupplierSuccess, getSupplierFailure]);

  useEffect(() => {
    if (createSupplierSuccess) {
      const temp_state = [createSupplierData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_SUPPLIER" })
    } else if (createSupplierFailure) {
      dispatch({ type: "RESET_CREATE_SUPPLIER" })
    }
  }, [createSupplierSuccess, createSupplierFailure]);

  useEffect(() => {
    if (updateSupplierSuccess) {
      updateTable(updateSupplierData[0])
      dispatch({ type: "RESET_UPDATE_SUPPLIER" })
    } else if (updateSupplierFailure) {
      dispatch({ type: "RESET_UPDATE_SUPPLIER" })
    }
  }, [updateSupplierSuccess, updateSupplierFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.supplierId != selectedItem.supplierId;
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
      supplierName: "",
      contactNo: "",
      branchName: "",
      accountNo: "",
      ifscCode: "",
      bankName: "",
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
      supplierName: data?.supplierName || "",
      contactNo: data?.contactNo || "",
      branchName: data?.branchName || "",
      accountNo: data?.accountNo || "",
      ifscCode: data?.ifscCode || "",
      bankName: data?.bankName || "",
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
      supplierName: supplierName,
      bankName: bankName,
      contactNo: contactNo,
      branchName: branchName,
      accountNo: accountNo,
      ifscCode: ifscCode,
    }
    if (editData) {
      dispatch(updateSupplier(request, selectedItem.supplierId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateSupplier(deleteRequest, selectedItem.supplierId))
    } else {
      dispatch(createSupplier(request))
    }
  }

  const {
    supplierName,
    ifscCode,
    contactNo,
    branchName,
    accountNo,
    bankName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="lg" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Supplier`}>
        <FormLayout dynamicForm={supplierForm} noOfColumns={2} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Supplier`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Supplier List"} onClickForm={onCreateForm} uniqueKey={"supplierId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Supplier;