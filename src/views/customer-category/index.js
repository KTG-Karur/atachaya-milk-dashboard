import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerCategory, createCustomerCategory, updateCustomerCategory } from "../../api/CustomerCategoryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { customerCategoryForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const CustomerCategory = ({ navigation }) => {

  const dispatch = useDispatch();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 10)
  let accessIds = pageAccessData[0].access.split(',')

  const getCustomerCategorySuccess = useSelector((state) => state.customerCategoryReducer.getCustomerCategorySuccess);
  const getCustomerCategoryList = useSelector((state) => state.customerCategoryReducer.getCustomerCategoryList);
  const getCustomerCategoryFailure = useSelector((state) => state.customerCategoryReducer.getCustomerCategoryFailure);

  const createCustomerCategorySuccess = useSelector((state) => state.customerCategoryReducer.createCustomerCategorySuccess);
  const createCustomerCategoryData = useSelector((state) => state.customerCategoryReducer.createCustomerCategoryData);
  const createCustomerCategoryFailure = useSelector((state) => state.customerCategoryReducer.createCustomerCategoryFailure);

  const updateCustomerCategorySuccess = useSelector((state) => state.customerCategoryReducer.updateCustomerCategorySuccess);
  const updateCustomerCategoryData = useSelector((state) => state.customerCategoryReducer.updateCustomerCategoryData);
  const updateCustomerCategoryFailure = useSelector((state) => state.customerCategoryReducer.updateCustomerCategoryFailure);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Customer Category",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
      sorter: (a, b) => a.customerCategoryName.length - b.customerCategoryName.length,
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
           {_.includes(accessIds, '2') && <MdEdit
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
    dispatch(getCustomerCategory(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getCustomerCategorySuccess) {
      setParentList(getCustomerCategoryList)
      dispatch({ type: "RESET_GET_CUSTOMER_CATEGORY" })
    } else if (getCustomerCategoryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_CUSTOMER_CATEGORY" })
    }
  }, [getCustomerCategorySuccess, getCustomerCategoryFailure]);

  useEffect(() => {
    if (createCustomerCategorySuccess) {
      const temp_state = [createCustomerCategoryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_CUSTOMER_CATEGORY" })
    } else if (createCustomerCategoryFailure) {
      dispatch({ type: "RESET_CREATE_CUSTOMER_CATEGORY" })
    }
  }, [createCustomerCategorySuccess, createCustomerCategoryFailure]);

  useEffect(() => {
    if (updateCustomerCategorySuccess) {
      updateTable(updateCustomerCategoryData[0])
      dispatch({ type: "RESET_UPDATE_CUSTOMER_CATEGORY" })
    } else if (updateCustomerCategoryFailure) {
      dispatch({ type: "RESET_UPDATE_CUSTOMER_CATEGORY" })
    }
  }, [updateCustomerCategorySuccess, updateCustomerCategoryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.customerCategoryId != selectedItem.customerCategoryId;
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

  const closeModule = () => {
    setCreateModule(false)
    setDeleteModule(false)
    editData = false
  }

  const onDeleteItem = (data,index)=>{
    setSelectedIndex(index)
    setSelectedItem(data)
    setDeleteModule(true)
  }

  const clearState = () => {
    setState({
      ...state,
      customerCategoryName : ""
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
      customerCategoryName: data?.customerCategoryName || ""
    })
    editData= true
    setCreateModule(true)
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onSubmitForm = () => {
    const request = {
      customerCategoryName: customerCategoryName
    }
    if (editData) {
      dispatch(updateCustomerCategory(request, selectedItem.customerCategoryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateCustomerCategory(deleteRequest, selectedItem.customerCategoryId))
    } else {
      dispatch(createCustomerCategory(request))
    }
  }

  const {
    customerCategoryName
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onSubmitForm} title={`${modelHeaderTitle} Customer Category`}>
        <FormLayout dynamicForm={customerCategoryForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Quotation Status`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Customer Category List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} uniqueKey={"customerCategoryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default CustomerCategory;