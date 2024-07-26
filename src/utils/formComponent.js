import React, { useState, Fragment, useMemo } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";


const FormComponent = ({ ...props }) => {
    const { state, setState, field, layoutType = "formLayout", index, iconDeletePress,removeErrorHandle, onChangeCallBack,errorHandleFields=[], tableState, onClick } = props

    const {
        control,
      } = useForm();
    const [eye, seteye] = useState(true);
    const onEyeClick = () => seteye(!eye);

    const onHandleChange = (event) => {
        let temp_state = ""
        if (layoutType != "formLayout") {
            temp_state = [...tableState]
            temp_state[index][event.target.name] = event.target.value
        } else {
            temp_state = {
                ...state,
                [event.target.name]: event.target.value
            }
        }
        setState(temp_state)
    }

    const onHandleCheckbox = (event) => {
        console.log(event.target.name)
        console.log(event.target.checked)
        let temp_state = ""
        if (layoutType != "formLayout") {
            temp_state = [...tableState]
            temp_state[index][event.target.name] = event.target.checked
        } else {
            temp_state = {
                ...state,
                [event.target.name]: event.target.checked
            }
        }
        setState(temp_state)
    }

    const onHandleDateChange = (date, name) => {
        let temp_state = ""
        if (layoutType != "formLayout") {
            temp_state = [...tableState]
            temp_state[index][name] = date
        } else {
            temp_state = {
                ...state,
                [name]: date
            }
        }
        setState(temp_state)
    }

    const onHandleSingleSelect = (selectedOption, name) => {
        let temp_state = ""
        if (layoutType != "formLayout") {
            temp_state = [...tableState]
            temp_state[index][name] = selectedOption
        } else {
            temp_state = {
                ...state,
                [name]: selectedOption
            }
        }
        setState(temp_state)
    }

    


    switch (field.inputType) {

        case 'text':
            const textFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    <div className="form-group m-1">
                        {layoutType === "formLayout" && <label htmlFor="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                        <input
                            type={field?.inputTypeField || "text"}
                            className="form-control mt-1"
                            name={field?.name}
                            onFocus={field.required ? () => removeErrorHandle(field.name) : null}
                            value={textFieldValue[field?.name]}
                            id="exampleFormControlInput1"
                            onChange={(event) => field.onChange ? onChangeCallBack[field.onChange](event, index) : onHandleChange(event)}
                            placeholder={`Enter ${field?.label || "Value"}`} />
                            { _.includes(errorHandleFields, field.name) && <span style={{ color: "red", fontSize: 12, opacity: 0.6 }}>{field?.errorMsg || `*required ${field.label.toLowerCase()}`}</span>}
                    </div>
                </div>
            )
            break;

        case 'password':
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                     <div className="form-group m-1">
                        {layoutType === "formLayout" && <label htmlFor="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*<span
                                onClick={onEyeClick}
                                style={{ color: "black" }}
                                className={`mx-3 fa  ${
                                  eye ? "fa-eye-slash" : "fa-eye"
                                }`}
                              /></span> : ""}</label>}
                        <input
                                type={eye ? "password" : "text"}
                                className={`form-control mt-1`}
                                onFocus={field.required ? () => removeErrorHandle(field.name) : null}
                                name={field?.name}
                                value={state[field?.name]}
                                onChange={onHandleChange}
                                autoComplete="false"
                              />
                           { _.includes(errorHandleFields, field.name) && <span style={{ color: "red", fontSize: 12, opacity: 0.6 }}>{field?.errorMsg || `*required ${field.label.toLowerCase()}`}</span>}      
                    </div>
                </div>
            )
            break;
        case 'textarea':
            const textareaFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    <div className="form-group m-1">
                        {layoutType === "formLayout" && <label htmlFor="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                        <textarea
                            rows="3"
                            cols="2"
                            className="form-control"
                            name={field?.name}
                            value={textareaFieldValue[field?.name]}
                            onFocus={field.required ? () => removeErrorHandle(field.name) : null}
                            onChange={onHandleChange}
                            placeholder={`Enter ${field?.label || "Value"}`}
                        ></textarea>
                           { _.includes(errorHandleFields, field.name) && <span style={{ color: "red", fontSize: 12, opacity: 0.6 }}>{field?.errorMsg || `*required ${field.label.toLowerCase()}`}</span>}
                    </div>
                </div>
            )
            break;
        case 'checkbox':
            const checkboxFieldValue = layoutType != "formLayout" ? tableState[index] : state
            // console.log(checkboxFieldValue[field.name])
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={checkboxFieldValue[field.name]}
                            name={field?.name}
                            onChange={onHandleCheckbox}
                            id="flexCheckDefault" />
                        {layoutType === "formLayout" && <label className="form-check-label mx-2 mt-1" htmlFor="flexCheckDefault">
                            {field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}
                        </label>}
                    </div>
                </div>
            )
            break;
        case 'switch':
            const switchFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            isChecked={switchFieldValue[field.name]}
                            name={field?.name}
                            onChange={onHandleCheckbox}
                            id="flexSwitchCheckDefault" />
                        {layoutType === "formLayout" && <label className="form-check-label mx-2 mt-1" htmlFor="flexSwitchCheckDefault">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                    </div>
                </div>
            )
            break;
        case 'select':
            const selectFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    {layoutType === "formLayout" && <div className="form-group m-1">
                        <label htmlFor="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>
                    </div>}
                    <Select
                        value={selectFieldValue[field?.name] || ''}
                        placeholder={`Select ${field?.label || "Option"}`}
                        getOptionLabel={(option) => `${option[field?.displayKey]}`}
                        getOptionValue={(option) => `${option[field?.uniqueKey]}`}
                        options={state[field.optionList]?.length > 0 ? state[field.optionList] : []}
                        onChange={(option) => field.onChange ? onChangeCallBack[field.onChange](option, index, field.name) : onHandleSingleSelect(option, field.name)}
                        isMulti={field?.multi || false}
                        onFocus={field.required ? () => removeErrorHandle(field.name) : null}
                        closeMenuOnSelect={field.multi ? false : true}
                        isSearchable
                        isDisabled={field?.disable || false}
                        classNamePrefix="select_kanakku"
                    />
                       { _.includes(errorHandleFields, field.name) && <span style={{ color: "red", fontSize: 12, opacity: 0.6 }}>{field?.errorMsg || `*required ${field.label.toLowerCase()}`}</span>}
                </div>
            )
            break;
        case 'date':
            const dateFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    {layoutType === "formLayout" && <div className="form-group m-1">
                        <label htmlFor="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>
                    </div>}
                    <DatePicker
                        className="datetimepicker form-control"
                        name={field?.name}
                        picker="date"
                        format={field?.format || "DD/MM/YYYY"}
                        placeholder="Select Date"
                        onFocus={field.required ? () => removeErrorHandle(field.name) : null}
                        onChange={(date) => onHandleDateChange(date, field?.name)}
                        value={dateFieldValue[field?.name]}
                        disabledDate={field?.disable || false}
                    ></DatePicker>
                       { _.includes(errorHandleFields, field.name) && <span style={{ color: "red", fontSize: 12, opacity: 0.6 }}>{field?.errorMsg || `*required ${field.label.toLowerCase()}`}</span>}
                </div>
            )
            break;
        case 'icondelete':
            return (
                <div className={layoutType != "formLayout" ? "" : "m-2 mb-3"}>
                    <MdDelete size={22} className="text-danger cursor-pointer" onClick={() => iconDeletePress(index)}></MdDelete>
                </div>
            )
            break;
        case 'button':
            return (
                <Link className="btn btn-primary mx-2 mb-4" onClick={() => onClick(field?.label)}>
                    {/* <MdDownload size={18} className="mx-2" /> */}
                    {field?.label || "Add"}
                </Link>
            )
            break;
        case 'uploadButton':
            return (
                <Link className="btn btn-primary mx-2 mb-4" onClick={() => onClick(field?.label)}>
                  <i
              className="fa fa-upload me-2"
              aria-hidden="true"
            />
                    {field?.label || "Add"}
                </Link>
            )
            break;
    }
}


export default FormComponent;