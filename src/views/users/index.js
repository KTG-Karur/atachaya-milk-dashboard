import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../api/UserApi";
import _ from "lodash";
import FormLayout from "../../utils/formLayout";
import { Link } from "react-router-dom";
import { userForm } from "./formData";
import { showMessage } from "../../utils/applicationFun";
import TempView from "../../components/Atom/TempView";

const User = ({ navigation }) => {

    const dispatch = useDispatch();
    const errorHandles = useRef();
    const userDetails = localStorage.getItem("userDetails")
    const localData = JSON.parse(userDetails)

    const getUserSuccess = useSelector((state) => state.userReducer.getUserSuccess);
    const getUserList = useSelector((state) => state.userReducer.getUserList);
    const getUserFailure = useSelector((state) => state.userReducer.getUserFailure);

    const updateUserSuccess = useSelector((state) => state.userReducer.updateUserSuccess);
    const updateUserData = useSelector((state) => state.userReducer.updateUserData);
    const updateUserFailure = useSelector((state) => state.userReducer.updateUserFailure);

    const [state, setState] = useState({})

    useEffect(() => {
        const requestData = {
            userId: localData.userId
        }
        dispatch(getUser(requestData))
    }, [navigation]);

    useEffect(() => {
        if (getUserSuccess) {
            setState({
                ...state,
                userName: getUserList[0].userName,
                password: getUserList[0].password
            })
            dispatch({ type: "RESET_GET_USER" })
        } else if (getUserFailure) {
            setParentList([])
            dispatch({ type: "RESET_GET_USER" })
        }
    }, [getUserSuccess, getUserFailure]);

    useEffect(() => {
        if (updateUserSuccess) {
            setState({
                ...state,
                userName: updateUserData[0].userName,
                password: updateUserData[0].password
            })
            showMessage('success', "Updated Successfully")
            dispatch({ type: "RESET_UPDATE_USER" })
        } else if (updateUserFailure) {
            dispatch({ type: "RESET_UPDATE_USER" })
        }
    }, [updateUserSuccess, updateUserFailure]);

    const onValidateForm = async () => {
        const ErrorHandles = errorHandles.current.onSubmitForm();
    }

    const onSubmitForm = () => {
        const request = {
            userName: userName,
            password: password
        }
        dispatch(updateUser(request, localData.userId))
    }

    const {
        userName,
        password
    } = state;

    return (
        <>
            <TempView title={`User Settings`} >
                <div className="mx-5">
                    <FormLayout dynamicForm={userForm} noOfColumns={4} defaultState={state} setDefaultState={setState} ref={errorHandles} onSubmit={onSubmitForm} />
                    <Link className="btn btn-primary mx-4 mt-1" onClick={onValidateForm} >
                        {`Update`}
                    </Link>
                </div>
            </TempView>

        </>
    );
}

export default User;