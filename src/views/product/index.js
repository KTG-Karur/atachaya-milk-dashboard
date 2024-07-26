import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, createProduct, updateProduct } from "../../api/ProductApi";
import _ from "lodash";
import { MdDelete, MdEdit, MdDownload } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { productForm } from "./formData";
import { filterArray, getRequiredFieldNames, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";

let editData = false;

const Product = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
/*   const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 8)
  let accessIds = pageAccessData[0].access.split(',') */

  const getProductSuccess = useSelector((state) => state.productReducer.getProductSuccess);
  const getProductList = useSelector((state) => state.productReducer.getProductList);
  const getProductFailure = useSelector((state) => state.productReducer.getProductFailure);

  const createProductSuccess = useSelector((state) => state.productReducer.createProductSuccess);
  const createProductData = useSelector((state) => state.productReducer.createProductData);
  const createProductFailure = useSelector((state) => state.productReducer.createProductFailure);

  const updateProductSuccess = useSelector((state) => state.productReducer.updateProductSuccess);
  const updateProductData = useSelector((state) => state.productReducer.updateProductData);
  const updateProductFailure = useSelector((state) => state.productReducer.updateProductFailure);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.length - b.productName.length,
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
    dispatch(getProduct(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getProductSuccess) {
      setParentList(getProductList)
      dispatch({ type: "RESET_GET_PRODUCT" })
    } else if (getProductFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_PRODUCT" })
    }
  }, [getProductSuccess, getProductFailure]);

  useEffect(() => {
    if (createProductSuccess) {
      const temp_state = [createProductData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_PRODUCT" })
    } else if (createProductFailure) {
      dispatch({ type: "RESET_CREATE_PRODUCT" })
    }
  }, [createProductSuccess, createProductFailure]);

  useEffect(() => {
    if (updateProductSuccess) {
      updateTable(updateProductData[0])
      dispatch({ type: "RESET_UPDATE_PRODUCT" })
    } else if (updateProductFailure) {
      dispatch({ type: "RESET_UPDATE_PRODUCT" })
    }
  }, [updateProductSuccess, updateProductFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.productId != selectedItem.productId;
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
      productName: "",
      amount: ""
    })
  }

  const onDeleteItem = (data, index) => {
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
      productName: data?.productName || "",
      amount: data?.amount || ""
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
      productName: productName,
      amount: amount,
    }
    if (editData) {
      dispatch(updateProduct(request, selectedItem.productId))
    } else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateProduct(deleteRequest, selectedItem.productId))
    } else {
      dispatch(createProduct(request))
    }
  }

  const {
    productName,
    amount,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} Product`}>
        <FormLayout dynamicForm={productForm} ref={errorHandles} noOfColumns={1} defaultState={state} setDefaultState={setState} onSubmit={onSubmitForm}></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Product`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable  tableName={"Product List"} uniqueKey={"productId"} onClickForm={onCreateForm} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Product;