import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTankerSupplier, createTankerSupplier, updateTankerSupplier } from "../../api/TankerSupplierApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { tankerSupplierForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const TankerSupplier = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 4)
  let accessIds = pageAccessData[0].access.split(',') */

  const getTankerSupplierSuccess = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierSuccess);
  const getTankerSupplierList = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierList);
  const getTankerSupplierFailure = useSelector((state) => state.tankerSupplierReducer.getTankerSupplierFailure);

  const createTankerSupplierSuccess = useSelector((state) => state.tankerSupplierReducer.createTankerSupplierSuccess);
  const createTankerSupplierData = useSelector((state) => state.tankerSupplierReducer.createTankerSupplierData);
  const createTankerSupplierFailure = useSelector((state) => state.tankerSupplierReducer.createTankerSupplierFailure);

  const updateTankerSupplierSuccess = useSelector((state) => state.tankerSupplierReducer.updateTankerSupplierSuccess);
  const updateTankerSupplierData = useSelector((state) => state.tankerSupplierReducer.updateTankerSupplierData);
  const updateTankerSupplierFailure = useSelector((state) => state.tankerSupplierReducer.updateTankerSupplierFailure);

  const tankerSupplierErrorMessage = useSelector((state) => state.tankerSupplierReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.length - b.companyName.length,
    },
    {
      title: "Contact person",
      dataIndex: "contactPersonName",
      key: "contactPersonName",
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
    dispatch(getTankerSupplier(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getTankerSupplierSuccess) {
      setParentList(getTankerSupplierList)
      dispatch({ type: "RESET_GET_TANKER_SUPPLIER" })
    } else if (getTankerSupplierFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_TANKER_SUPPLIER" })
    }
  }, [getTankerSupplierSuccess, getTankerSupplierFailure]);

  useEffect(() => {
    if (createTankerSupplierSuccess) {
      const temp_state = [createTankerSupplierData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_TANKER_SUPPLIER" })
    } else if (createTankerSupplierFailure) {
      dispatch({ type: "RESET_CREATE_TANKER_SUPPLIER" })
    }
  }, [createTankerSupplierSuccess, createTankerSupplierFailure]);

  useEffect(() => {
    if (updateTankerSupplierSuccess) {
      updateTable(updateTankerSupplierData[0])
      dispatch({ type: "RESET_UPDATE_TANKER_SUPPLIER" })
    } else if (updateTankerSupplierFailure) {
      dispatch({ type: "RESET_UPDATE_TANKER_SUPPLIER" })
    }
  }, [updateTankerSupplierSuccess, updateTankerSupplierFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.tankerSupplierId != selectedItem.tankerSupplierId;
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
      companyName: "",
      contactPersonName: "",
      contactNo: "",
      registrationNo: "",
      gstNo: "",
      bankName: "",
      branchName: "",
      ifsc: "",
      accountNo: "",
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
      companyName: data?.companyName || "",
      contactPersonName: data?.contactPersonName || "",
      contactNo: data?.contactNo || "",
      registrationNo: data?.registrationNo || "",
      gstNo: data?.gstNo || "",
      bankName: data?.bankName || "",
      branchName: data?.branchName || "",
      accountNo: data?.accountNo || "",
      ifsc: data?.ifsc || "",
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
      companyName: companyName,
      contactPersonName: contactPersonName,
      contactNo: contactNo,
      registrationNo: registrationNo,
      gstNo: gstNo,
      bankName: bankName,
      branchName: branchName,
      ifsc: ifsc,
      accountNo: accountNo,
    }
    if (editData) {
      dispatch(updateTankerSupplier(request, selectedItem.tankerSupplierId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateTankerSupplier(deleteRequest, selectedItem.tankerSupplierId))
    } else {
      dispatch(createTankerSupplier(request))
    }
  }

  const {
    companyName,
      contactPersonName,
      contactNo,
      registrationNo,
      gstNo,
      bankName,
      branchName,
      ifsc,
      accountNo,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="lg" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} TankerSupplier`}>
        <FormLayout dynamicForm={tankerSupplierForm} noOfColumns={2} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete TankerSupplier`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Tanker Supplier List"} onClickForm={onCreateForm} uniqueKey={"tanker SupplierId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default TankerSupplier;