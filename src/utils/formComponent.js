import React, { useState, Fragment } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import { MdDelete, MdOutlineArrowCircleLeft, MdOutlineArrowCircleRight, MdOutlineToday } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";


const FormComponent = ({ ...props }) => {

    const { state, setState, field, layoutType = "formLayout", index, iconDeletePress, onChangeCallBack, tableState, onClick } = props

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
                <div className={layoutType != "formLayout" ? "m-2" : "m-2"}>
                    <div class="form-group m-1">
                        {field?.label != "" && <label for="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                        <input
                            type={field?.inputType || "text"}
                            class="form-control"
                            name={field?.name}
                            value={textFieldValue[field?.name]}
                            disabled = {field?.disable || false}
                            id="exampleFormControlInput1"
                            onChange={(event) => field.onChange ? onChangeCallBack[field.onChange](event, index) : onHandleChange(event)}
                            placeholder={`Enter ${field?.label || "Value"}`} />
                    </div>
                </div>
            )
            break;

        case 'password':
            return (
                <div className={layoutType != "formLayout" ? "m-2" : "m-2"}>
                     <div class="form-group m-1">
                        {field?.label != ""  && <label for="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*<span
                                onClick={onEyeClick}
                                style={{ color: "black" }}
                                className={`mx-3 fa  ${
                                  eye ? "fa-eye-slash" : "fa-eye"
                                }`}
                              /></span> : ""}</label>}
                        <input
                                type={eye ? "password" : "text"}
                                className={`form-control`}
                                name={field?.name}
                                value={state[field?.name]}
                                onChange={onHandleChange}
                                autoComplete="false"
                              />
                              
                    </div>
                </div>
            )
            break;
        case 'textarea':
            const textareaFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "m-2" : "m-2"}>
                    <div class="form-group m-1">
                        {field?.label != ""  && <label for="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                        <textarea
                            rows="3"
                            cols="2"
                            className="form-control"
                            name={field?.name}
                            value={textareaFieldValue[field?.name]}
                            onChange={onHandleChange}
                            placeholder={`Enter ${field?.label || "Value"}`}
                        ></textarea>
                    </div>
                </div>
            )
            break;
        case 'checkbox':
            const checkboxFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "m-2" : "m-2"}>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked={checkboxFieldValue[field.name]}
                            name={field?.name}
                            onChange={(event) => field.onChange ? onChangeCallBack[field.onChange](event) : onHandleCheckbox(event)}
                            id="flexCheckDefault" />
                        {field?.label != ""  && <label class="form-check-label mx-2" for="flexCheckDefault">
                            {field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}
                        </label>}
                    </div>
                </div>
            )
            break;
        case 'switch':
            const switchFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={layoutType != "formLayout" ? "m-2 " : "m-2"}>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            isChecked={switchFieldValue[field.name]}
                            name={field?.name}
                            onChange={onHandleCheckbox}
                            id="flexSwitchCheckDefault" />
                        {field?.label != ""  && <label class="form-check-label mx-2 " for="flexSwitchCheckDefault">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>}
                    </div>
                </div>
            )
            break;
        case 'select':
            const selectFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={field?.label != ""  ? "m-2" : "m-2"}>
                    {field?.label != "" && <div class="form-group m-1">
                        <label for="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>
                    </div>}
                    <Select

                        value={selectFieldValue[field?.name]}
                        placeholder={`${field?.label || "Option"}`}
                        getOptionLabel={(option) => `${option[field?.displayKey]}`}
                        getOptionValue={(option) => `${option[field?.uniqueKey]}`}
                        options={state[field.optionList]?.length > 0 ? state[field.optionList] : []}
                        onChange={(option) => field.onChange ? onChangeCallBack[field.onChange](option, index, field.name) : onHandleSingleSelect(option, field.name)}
                        isMulti={field?.multi || false}
                        closeMenuOnSelect={field.multi ? false : true}
                        isSearchable
                        isDisabled={field?.disable || false}
                        classNamePrefix="select_kanakku"
                    />
                </div>
            )
            break;
        case 'date':
            const dateFieldValue = layoutType != "formLayout" ? tableState[index] : state
            return (
                <div className={field?.label != "" ? "m-2" : "m-2"}>
                    {field?.label != ""  && <div class="form-group m-1">
                        <label for="exampleFormControlInput1">{field?.label || ""}{field.required ? <span style={{ color: "red" }}>*</span> : ""}</label>
                    </div>}
                    <DatePicker
                        className="datetimepicker form-control"
                        name={field?.name}
                        picker={field?.pickerFormat || "date"}
                        format={field?.format || "DD/MM/YYYY"}
                        placeholder="Select Date"
                        onChange={(date) => onHandleDateChange(date, field?.name)}
                        value={dateFieldValue[field?.name]}
                        disabledDate={field?.disable || false}
                    ></DatePicker>
                </div>
            )
            break;
        case 'icondelete':
            return (
                <div className={`${field.classStyle}`}>
                    <MdDelete size={22} className="text-danger cursor-pointer" onClick={() => iconDeletePress(index)}></MdDelete>
                </div>
            )
            break;
        case 'button':
            const bgColorDynamic = field.label == "Today" ? "btn-success" : field.label == "Previous" ? "btn-warning" : field.label == "Tommorrow" ? "btn-primary" : field.label == "Clear" ? "btn-danger" :""
            return (
                <Link className={`btn ${bgColorDynamic} mx-2`} onClick={() => onClick(field?.label)}>
                    {/* <MdDownload size={18} className="mx-2" /> */}
                 <span>{field.label == "Today"? <MdOutlineToday size={18} /> :field.label == "Previous"?<MdOutlineArrowCircleLeft size={18} /> :field.label == "Tommorrow"?<MdOutlineArrowCircleRight size={18} /> : field?.label || "Add"}</span>   
                </Link>
            )
            break;
    }
}


export default FormComponent;