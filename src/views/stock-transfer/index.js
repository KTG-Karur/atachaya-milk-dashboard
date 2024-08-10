import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockTransfer, createStockTransfer, updateStockTransfer } from "../../api/StockTransferApi.js";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { stockTransferForm } from "./formData";
import { dateConversionNormal, filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi.js";
import { getStockHub } from "../../api/StockHubApi.js";

let editData = false;

const StockTransfer = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*   const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)
    let pageAccessData = filterArray(localData.pages, "pageId", 4)
    let accessIds = pageAccessData[0].access.split(',') */

  const getStockTransferSuccess = useSelector((state) => state.stockTransferReducer.getStockTransferSuccess);
  const getStockTransferList = useSelector((state) => state.stockTransferReducer.getStockTransferList);
  const getStockTransferFailure = useSelector((state) => state.stockTransferReducer.getStockTransferFailure);

  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const getStockHubSuccess = useSelector((state) => state.stockHubReducer.getStockHubSuccess);
  const getStockHubList = useSelector((state) => state.stockHubReducer.getStockHubList);
  const getStockHubFailure = useSelector((state) => state.stockHubReducer.getStockHubFailure);

  const createStockTransferSuccess = useSelector((state) => state.stockTransferReducer.createStockTransferSuccess);
  const createStockTransferData = useSelector((state) => state.stockTransferReducer.createStockTransferData);
  const createStockTransferFailure = useSelector((state) => state.stockTransferReducer.createStockTransferFailure);

  const updateStockTransferSuccess = useSelector((state) => state.stockTransferReducer.updateStockTransferSuccess);
  const updateStockTransferData = useSelector((state) => state.stockTransferReducer.updateStockTransferData);
  const updateStockTransferFailure = useSelector((state) => state.stockTransferReducer.updateStockTransferFailure);

  const stockTransferErrorMessage = useSelector((state) => state.stockTransferReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
    },
    {
      title: "Action",
      key: "Action",
      render: (record, item, index) => (
        <>
          <div >
            {<MdEdit
              className="text-success cursor-pointer"
              size={18}
              onClick={() => onEditForm(record, index)}
            ></MdEdit>}
            {<MdDelete
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
    dispatch(getStockTransfer(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getStockTransferSuccess) {
      setParentList(getStockTransferList)
      dispatch({ type: "RESET_GET_STOCK_TRANSFER" })
    } else if (getStockTransferFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_STOCK_TRANSFER" })
    }
  }, [getStockTransferSuccess, getStockTransferFailure]);

  useEffect(() => {
    if (getStockHubSuccess) {
      setState({
        ...state,
        stockHubList: getStockHubList,
        balanceHubStock : getStockHubList[0]?.totalQty || "",
        perviousQtyAmount : getStockHubList[0]?.totalQty || "",
        stockHubId : getStockHubList[0]?.stockHubId || "",
      })
      dispatch({ type: "RESET_GET_STOCK_HUB" })
    } else if (getStockHubFailure) {
      setState({
        ...state,
        stockHubList: []
      })
      dispatch({ type: "RESET_GET_STOCK_HUB" })
    }
  }, [getStockHubSuccess, getStockHubFailure]);

  useEffect(() => {
    if (getCenterSuccess) {
      setState({
        ...state,
        centerList: getCenterList
      })
      dispatch(getStockHub())
      dispatch({ type: "RESET_GET_CENTER" })
    } else if (getCenterFailure) {
      setState({
        ...state,
        centerList: []
      })
      dispatch({ type: "RESET_GET_CENTER" })
    }
  }, [getCenterSuccess, getCenterFailure]);

  useEffect(() => {
    if (createStockTransferSuccess) {
      const temp_state = [createStockTransferData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_STOCK_TRANSFER" })
    } else if (createStockTransferFailure) {
      dispatch({ type: "RESET_CREATE_STOCK_TRANSFER" })
    }
  }, [createStockTransferSuccess, createStockTransferFailure]);

  useEffect(() => {
    if (updateStockTransferSuccess) {
      updateTable(updateStockTransferData[0])
      dispatch({ type: "RESET_UPDATE_STOCK_TRANSFER" })
    } else if (updateStockTransferFailure) {
      dispatch({ type: "RESET_UPDATE_STOCK_TRANSFER" })
    }
  }, [updateStockTransferSuccess, updateStockTransferFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.stockTransferId != selectedItem.stockTransferId;
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
      stockTransferName: ""
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
  }

  const onHandleQuantity = (event)=>{
    if(event.target.value == ""){
      setState({
        ...state,
        [event.target.name] : event.target.value,
        balanceHubStock : parseInt(state.perviousQtyAmount)
      })
    }else if(parseInt(balanceHubStock) >= parseInt(event.target.value)){
      setState({
        ...state,
        [event.target.name] : event.target.value,
        balanceHubStock : parseInt(balanceHubStock) - parseInt(event.target.value)
      })
    }else{
      showMessage("warning",`Available only ${parseInt(state.perviousQtyAmount)}`)
    }
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      stockTransferName: data?.stockTransferName || ""
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
      transferDate: transferDate,
      centerId: centerId.centerId,
      totalStock: parseInt(state.totalStock) + parseInt(transferStock),
      stockHubId: state.stockHubId,
      balanceHubStock: balanceHubStock,
      perQtyAmount: perQtyAmount,
      stockHistory: {
        transferDate: transferDate,
        stockQty: transferStock,
      }
    }
    if (editData) {
      dispatch(updateStockTransfer(request, selectedItem.stockTransferId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateStockTransfer(deleteRequest, selectedItem.stockTransferId))
    } else {
      dispatch(createStockTransfer(request))
    }
  }

  const {
    transferDate,
    centerId,
    transferStock,
    balanceHubStock,
    perQtyAmount,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onValidateForm} title={`${modelHeaderTitle} StockTransfer`}>
        <FormLayout dynamicForm={stockTransferForm} noOfColumns={1} onChangeCallBack={{"onHandleQuantity" : onHandleQuantity}} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete StockTransfer`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Stock Transfer List"} onClickForm={onCreateForm} uniqueKey={"stockTransferId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default StockTransfer;