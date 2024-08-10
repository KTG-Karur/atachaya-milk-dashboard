import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole, createRole, updateRole } from "../../api/RoleApi";
import _ from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import TemplateCustomTable from "../../components/TemplateComponent.js/TemplateTable";
import ModalViewBox from "../../components/Atom/ModelViewBox";
import FormLayout from "../../utils/formLayout";
import { roleForm } from "./formData";
import { filterArray, removeNullKeyFromObj, showConfirmationDialog, showMessage } from "../../utils/applicationFun";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { getPages } from "../../api/PagesApi";
import { getRolePermission } from "../../api/RolePermissionApi";
import TempView from "../../components/Atom/TempView";
import { Button } from "react-bootstrap";

let editData = false;

const Role = ({ navigation }) => {

  const dispatch = useDispatch();
  const errorHandles = useRef();
  const userDetails = localStorage.getItem("userDetails")
  const localData = JSON.parse(userDetails)
  let pageAccessData = filterArray(localData.pages, "pageId", 9)
  let accessIds = pageAccessData[0].access.split(',')

  const getRoleSuccess = useSelector((state) => state.roleReducer.getRoleSuccess);
  const getRoleList = useSelector((state) => state.roleReducer.getRoleList);
  const getRoleFailure = useSelector((state) => state.roleReducer.getRoleFailure);

  const getPagesSuccess = useSelector((state) => state.pagesReducer.getPagesSuccess);
  const getPagesList = useSelector((state) => state.pagesReducer.getPagesList);
  const getPagesFailure = useSelector((state) => state.pagesReducer.getPagesFailure);

  const getRolePermissionSuccess = useSelector((state) => state.rolePermissionReducer.getRolePermissionSuccess);
  const getRolePermissionList = useSelector((state) => state.rolePermissionReducer.getRolePermissionList);
  const getRolePermissionFailure = useSelector((state) => state.rolePermissionReducer.getRolePermissionFailure);

  const createRoleSuccess = useSelector((state) => state.roleReducer.createRoleSuccess);
  const createRoleData = useSelector((state) => state.roleReducer.createRoleData);
  const createRoleFailure = useSelector((state) => state.roleReducer.createRoleFailure);

  const updateRoleSuccess = useSelector((state) => state.roleReducer.updateRoleSuccess);
  const updateRoleData = useSelector((state) => state.roleReducer.updateRoleData);
  const updateRoleFailure = useSelector((state) => state.roleReducer.updateRoleFailure);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => (index + 1),
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      sorter: (a, b) => a.roleName.length - b.roleName.length,
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
              onClick={() => onEditData(record, index)}
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

  const [state, setState] = useState({
    checked: [],
    expanded: ['2', '3', '4', '5', '6', '7', '8', '9'],
    pageConvertedData: []
  })

  const [parentList, setParentList] = useState([])
  const [parentViewModule, setParentViewModule] = useState(true)
  const [createModule, setCreateModule] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [deleteModule, setDeleteModule] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const requestData = {
      isActive: 1,
      parentId : false
    }
    dispatch(getRole(requestData))
    dispatch(getPages(requestData))
  }, [navigation]);

  useEffect(() => {
    if (getRoleSuccess) {
      setParentList(getRoleList)
      dispatch({ type: "RESET_GET_ROLE" })
    } else if (getRoleFailure) {
      setParentList([])
      dispatch({ type: "RESET_GET_ROLE" })
    }
  }, [getRoleSuccess, getRoleFailure]);

  useEffect(() => {
    if (getRolePermissionSuccess) {
      setState({
        ...state,
        rolePermissionList: getRolePermissionList,
      })
      onEditForm(getRolePermissionList)
      dispatch({ type: "RESET_GET_ROLE_PERMISSION" })
    } else if (getPagesFailure) {
      setState({
        ...state,
        rolePermissionList: []
      })
      dispatch({ type: "RESET_GET_ROLE_PERMISSION" })
    }
  }, [getRolePermissionSuccess, getRolePermissionFailure]);

  useEffect(() => {
    if (getPagesSuccess) {
      const data = getPagesList
      let nodes = []
      data.map((itm, index) => {
        let child = []
        if (itm.access[0].accessId != null) {
          itm.access.map((ele) => {
            const req = {
              value: `${itm.pageName}_${itm.pageId}_${ele.accessId}`,
              label: ele.accessName,
            }
            child.push(req)
          })
        }
        const req = {
          value: itm?.pageId || "",
          label: itm?.pageName || "",
          children: child.length > 0 ? child : null
        }
        removeNullKeyFromObj(req)
        nodes.push(req)
      })
      setState({
        ...state,
        pagesList: getPagesList,
        pageConvertedData: nodes
      })
      dispatch({ type: "RESET_GET_PAGES" })
    } else if (getPagesFailure) {
      setState({
        ...state,
        pagesList: []
      })
      dispatch({ type: "RESET_GET_PAGES" })
    }
  }, [getPagesSuccess, getPagesFailure]);

  useEffect(() => {
    if (createRoleSuccess) {
      const temp_state = [createRoleData[0], ...parentList];
      setParentList(temp_state)
      setParentViewModule(true)
      showMessage("success", "Created Successfully...!")
      closeModule()
      dispatch({ type: "RESET_CREATE_ROLE" })
    } else if (createRoleFailure) {
      dispatch({ type: "RESET_CREATE_ROLE" })
    }
  }, [createRoleSuccess, createRoleFailure]);

  useEffect(() => {
    if (updateRoleSuccess) {
      updateTable(updateRoleData[0])
      dispatch({ type: "RESET_UPDATE_ROLE" })
    } else if (updateRoleFailure) {
      dispatch({ type: "RESET_UPDATE_ROLE" })
    }
  }, [updateRoleSuccess, updateRoleFailure]);

  const updateTable = (updatedItem) => {
    const temp_state = [...parentList];
    if (deleteModule) {
      let remainingData = _.remove(temp_state, function (n) {
        return n.roleId != selectedItem.roleId;
      });
      setParentList(remainingData)
      showMessage("success", "Deleted Successfully...!")
    } else {
      temp_state[selectedIndex] = updatedItem;
      setParentList(temp_state)
      setParentViewModule(true)
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
      roleName: "",
      checked: [],
      expanded: ['2', '3', '4', '5', '6', '7', '8', '9','10','11','12','13'],
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
    setParentViewModule(!parentViewModule)
    setCreateModule(!createModule)
  }

  const onEditData = (data, index) => {
    const req = {
      roleId: data?.roleId || ""
    }
    dispatch(getRolePermission(req))
    setSelectedIndex(index)
    setSelectedItem(data)
  }

  const onEditForm = (data) => {
    let accessData = []
    data[0].pages.map((itm) => {
      const accessIds = itm.access.split(',')
      accessIds.map((ele) => {
        const req = `${itm.pageName}_${itm.pageId}_${ele}`
        accessData.push(req)
      })
    })
    accessData.push('1')
    setState({
      ...state,
      roleName: data[0]?.roleName || "",
      rolePermissionId: data[0]?.rolePermissionId || "",
      checked: accessData
    })
    editData = true
    setParentViewModule(!parentViewModule)
    setCreateModule(true)
  }

  const onCheckBoxHandle = (checked, targetNode) => {
    setState({
      ...state,
      checked: checked
    })
  }

  const onExpandHandle = (expanded) => {
    setState({
      ...state,
      expanded: expanded
    })
  }

  const onValidateForm = async () => {
    const ErrorHandles = errorHandles.current.onSubmitForm();
  }

  const onSubmitForm = () => {
    const convertedData = _(state.checked)
      .groupBy(item => item.split('_')[1])
      .map((values, key) => ({
        pageId: parseInt(key),
        accessPermission: _.map(values, item => parseInt(item.split('_')[2]))
      }))
      .value();
    const request = {
      roleName: roleName,
      accessIds: convertedData
    }
    if (editData) {
      request.rolePermissionId = state.rolePermissionId
      dispatch(updateRole(request, selectedItem.roleId))
    }
    else if (deleteModule) {
      const deleteRequest = {
        isActive: 0
      }
      dispatch(updateRole(deleteRequest, selectedItem.roleId))
    } else {
      dispatch(createRole(request))
    }
  }

  const {
    roleName
  } = state;

  const modelHeaderTitle = editData != true ? "Create" : "Edit"
  const modelBtn = editData != true ? "Save" : "Save Changes"

  return (
    <>
      {
        createModule && <TempView title={`${modelHeaderTitle} Role`} closeModule={() => onCreateForm()}>
          <FormLayout dynamicForm={roleForm} noOfColumns={4} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} ></FormLayout>
          <CheckboxTree
            nodes={state.pageConvertedData}
            checked={state.checked}
            expanded={state.expanded}
            onCheck={(checked, targetNode) => onCheckBoxHandle(checked, targetNode)}
            onExpand={(expanded) => onExpandHandle(expanded)}
            showExpandAll={true}
            showNodeIcon={false}
          />
          <div className="d-flex justify-content-end m-3">
            <Button onClick={onValidateForm}>{modelBtn}</Button>
          </div>
        </TempView>
      }

      <ModalViewBox show={deleteModule} size="sm" savetitle={"confirm"} setshow={setDeleteModule} onSubmit={onSubmitForm} title={`Delete Product`}>
        <p>Once Again Are you sure..?</p>
      </ModalViewBox>

     {parentViewModule && <TemplateCustomTable tableName={"Role List"} uniqueKey={"roleId"} onClickForm={_.includes(accessIds, '1') && onCreateForm} show={show} setShow={setShow} totalCount={state?.totalCount || 0} columns={columns} list={parentList} />}
    </>
  );
}

export default Role;