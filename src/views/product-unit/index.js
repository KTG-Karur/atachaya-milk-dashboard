import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductUnit, createProductUnit, updateProductUnit } from "../../api/ProductUnitApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { productUnitForm } from "./formData";
import { filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";

let editData = false;

const ProductUnit = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 11)
  let accessIds = pageAccessData[0].access.split(',')

  const getProductUnitSuccess = useSelector((state) => state.productUnitReducer.getProductUnitSuccess);
  const getProductUnitList = useSelector((state) => state.productUnitReducer.getProductUnitList);
  const getProductUnitFailure = useSelector((state) => state.productUnitReducer.getProductUnitFailure);

  const createProductUnitSuccess = useSelector((state) => state.productUnitReducer.createProductUnitSuccess);
  const createProductUnitData = useSelector((state) => state.productUnitReducer.createProductUnitData);
  const createProductUnitFailure = useSelector((state) => state.productUnitReducer.createProductUnitFailure);

  const updateProductUnitSuccess = useSelector((state) => state.productUnitReducer.updateProductUnitSuccess);
  const updateProductUnitData = useSelector((state) => state.productUnitReducer.updateProductUnitData);
  const updateProductUnitFailure = useSelector((state) => state.productUnitReducer.updateProductUnitFailure);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Product Unit",
      dataIndex: "productUnitName",
      key: "productUnitName",
      sorter: (a, b) => a.productUnitName.length - b.productUnitName.length,
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
            {_.includes(accessIds, '3') && <MdDelete
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
    dispatch(getProductUnit(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getProductUnitSuccess) {
      setParentList(getProductUnitList)
      dispatch({ type: "RESET_GET_PRODUCT_UNIT" })
    } else if (getProductUnitFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_PRODUCT_UNIT" })
    }
  }, [getProductUnitSuccess, getProductUnitFailure]);

  useEffect(() => {
    if (createProductUnitSuccess) {
      const temp_state = [createProductUnitData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_PRODUCT_UNIT" })
    } else if (createProductUnitFailure) {
      dispatch({ type: "RESET_CREATE_PRODUCT_UNIT" })
    }
  }, [createProductUnitSuccess, createProductUnitFailure]);

  useEffect(() => {
    if (updateProductUnitSuccess) {
      updateTable(updateProductUnitData[0])
      dispatch({ type: "RESET_UPDATE_PRODUCT_UNIT" })
    } else if (updateProductUnitFailure) {
      dispatch({ type: "RESET_UPDATE_PRODUCT_UNIT" })
    }
  }, [updateProductUnitSuccess, updateProductUnitFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.productUnitId != selectedItem.productUnitId;
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

  const clearState = () => {
    setState({
      ...state,
      productUnitName : ""
    })
  }

  const onDeleteItem = (data,index)=>{
    setSelectedIndex(index)
    setSelectedItem(data)
    setDeleteModule(true)
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      productUnitName: data?.productUnitName || ""
    })
    editData= true
    setCreateModule(true)
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitForm = () => {
    const request = {
      productUnitName: productUnitName
    }
    if (editData) {
      dispatch(updateProductUnit(request, selectedItem.productUnitId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateProductUnit(deleteRequest, selectedItem.productUnitId))
    } else {
      dispatch(createProductUnit(request))
    }
  }

  const {
    productUnitName
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Product Unit`}>
        <FormLayout dynamicForm={productUnitForm} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Product Unit`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Product Unit List"} onClickForm={_.includes(accessIds, '1') && onCreateForm} show={show} setShow={setShow} totalCount={state?.totalCount || 0} uniqueKey={"productUnitId"} columns={columns} list={parentList} />
    </>
  );
}

export default ProductUnit;