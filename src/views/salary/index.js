import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalary, createSalary, updateSalary, getSalaryEntryDetails } from "../../api/SalaryApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { salaryDataForm, salaryForm } from "./formData";
import { dateConversionNormal, filterArray, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import { getCenter } from "../../api/CenterApi";
import { getEntryDetails } from "../../api/EntryDetailsApi";

let editData = false;

const Salary = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  /*   const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)
    let pageAccessData = filterArray(localData.pages, "pageId", 4)
    let accessIds = pageAccessData[0].access.split(',') */

  const getSalarySuccess = useSelector((state) => state.salaryReducer.getSalarySuccess);
  const getSalaryList = useSelector((state) => state.salaryReducer.getSalaryList);
  const getSalaryFailure = useSelector((state) => state.salaryReducer.getSalaryFailure);

  const getSalaryEntryDetailsSuccess = useSelector((state) => state.salaryReducer.getSalaryEntryDetailsSuccess);
  const getSalaryEntryDetailsList = useSelector((state) => state.salaryReducer.getSalaryEntryDetailsList);
  const getSalaryEntryDetailsFailure = useSelector((state) => state.salaryReducer.getSalaryEntryDetailsFailure);
  
  const getCenterSuccess = useSelector((state) => state.centerReducer.getCenterSuccess);
  const getCenterList = useSelector((state) => state.centerReducer.getCenterList);
  const getCenterFailure = useSelector((state) => state.centerReducer.getCenterFailure);

  const getEntryDetailsSuccess = useSelector((state) => state.entryDetailsReducer.getEntryDetailsSuccess);
  const getEntryDetailsList = useSelector((state) => state.entryDetailsReducer.getEntryDetailsList);
  const getEntryDetailsFailure = useSelector((state) => state.entryDetailsReducer.getEntryDetailsFailure);

  const createSalarySuccess = useSelector((state) => state.salaryReducer.createSalarySuccess);
  const createSalaryData = useSelector((state) => state.salaryReducer.createSalaryData);
  const createSalaryFailure = useSelector((state) => state.salaryReducer.createSalaryFailure);

  const updateSalarySuccess = useSelector((state) => state.salaryReducer.updateSalarySuccess);
  const updateSalaryData = useSelector((state) => state.salaryReducer.updateSalaryData);
  const updateSalaryFailure = useSelector((state) => state.salaryReducer.updateSalaryFailure);

  const salaryErrorMessage = useSelector((state) => state.salaryReducer.errorMessage);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Salary Name",
      dataIndex: "salaryName",
      key: "salaryName",
      sorter: (a, b) => a.salaryName.length - b.salaryName.length,
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
  ].filter(Boolean);

  const [state, setState] = useState({})
  const [parentList, setParentList] = useState([])
  const [createModule, setCreateModule] = useState(false)
  const [createFormModule1, setCreateFormModule1] = useState(false)
  const [createFormModule2, setCreateFormModule2] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1
    }
    dispatch(getSalary(requestData))
    dispatch(getCenter(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getSalarySuccess) {
      setParentList(getSalaryList)
      dispatch({ type: "RESET_GET_SALARY" })
    } else if (getSalaryFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_SALARY" })
    }
  }, [getSalarySuccess, getSalaryFailure]);


  useEffect(() => {
    if (getSalaryEntryDetailsSuccess) {
      setState({
        ...state,
        salaryEntryDetailsList: getSalaryEntryDetailsList
      })
      setCreateFormModule1(false)
      setCreateFormModule2(true)
      dispatch({ type: "RESET_GET_SALARY_ENTRY_DETAILS" })
    } else if (getSalaryEntryDetailsFailure) {
      setState({
        ...state,
        salaryEntryDetailsList: []
      })
      showMessage("warning", "Please Check the Entered Data...!")
      dispatch({ type: "RESET_GET_SALARY_ENTRY_DETAILS" })
    }
  }, [getSalaryEntryDetailsSuccess, getSalaryEntryDetailsFailure]);

  
  useEffect(() => {
    if (getCenterSuccess) {
      setState({
        ...state,
        centerList: getCenterList
      })
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
    if (createSalarySuccess) {
      const temp_state = [createSalaryData[0], ...parentList];
      setParentList(temp_state)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_SALARY" })
    } else if (createSalaryFailure) {
      dispatch({ type: "RESET_CREATE_SALARY" })
    }
  }, [createSalarySuccess, createSalaryFailure]);

  useEffect(() => {
    if (updateSalarySuccess) {
      updateTable(updateSalaryData[0])
      dispatch({ type: "RESET_UPDATE_SALARY" })
    } else if (updateSalaryFailure) {
      dispatch({ type: "RESET_UPDATE_SALARY" })
    }
  }, [updateSalarySuccess, updateSalaryFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.salaryId != selectedItem.salaryId;
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
      salaryName: ""
    })
  }

  const onCreateForm = () => {
    clearState()
    editData = false;
    setCreateModule(true)
    setCreateFormModule1(true)
  }

  const onEditForm = (data, index) => {
    setState({
      ...state,
      salaryName: data?.salaryName || ""
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
      salaryName: salaryName
    }
    if (editData) {
      dispatch(updateSalary(request, selectedItem.salaryId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateSalary(deleteRequest, selectedItem.salaryId))
    } else {
      dispatch(createSalary(request))
    }
  }

  const onSelectForm = () => {
    const request = {
      month: state.selectMonth ? dateConversionNormal(state.selectMonth, "MM") : "",
      year: state.selectYear ? dateConversionNormal(state.selectYear, "YYYY") : "",
      centerId: state?.centerId.centerId || ""
    }
    dispatch(getSalaryEntryDetails(request))
  }

  const {
    salaryName,
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = createFormModule1 != true ? "Save" : "Next"

  return (
    <>
      <ModalViewBox show={createModule} size="md" savetitle={modelBtn} setshow={setCreateModule} onSubmit={onSelectForm} title={`${modelHeaderTitle} Salary`}>
        {createFormModule1 && <FormLayout dynamicForm={salaryForm} customAlign={true} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>}
        {createFormModule2 && <FormLayout dynamicForm={salaryDataForm} customAlign={true} noOfColumns={1} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>}
        {/* <FormLayout dynamicForm={salaryForm} noOfColumns={2} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout> */}
      </ModalViewBox>

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Salary`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

      <TemplateCustomTable tableName={"Center Salary List"} onClickForm={onCreateForm} uniqueKey={"salaryId"} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />
    </>
  );
}

export default Salary;