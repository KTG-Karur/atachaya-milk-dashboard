import React, { useState, Fragment, useRef,useImperativeHandle, useEffect } from "react";
import FormComponent from "./formComponent";
import { getRequiredFieldNames } from "./applicationFun";
import _ from "lodash";


const FormLayout =React.forwardRef(({ ...props }, ref)  => {

    const { noOfColumns = 1, dynamicForm, defaultState, setDefaultState, onChangeCallBack, onClick, onSubmit, customAlign = false } = props
    const [errorState, setErrorState] = useState(false)
    const [errorFields, setErrorFields] = useState(false)

    const noOfCol = 12 / parseInt(noOfColumns)
    const screenWidth = window.innerWidth
    const errorHandles = useRef(null);

    useImperativeHandle(ref, () => ({
        onSubmitForm: onSubmitForm
      }));

      let val = false
      const onSubmitForm = async () => {
        const requiredFields = await getRequiredFieldNames(dynamicForm)
        let errorFieldsData =[]
        requiredFields.map((itm)=>{
            if(defaultState[itm] == ""|| defaultState[itm] == null|| defaultState[itm] == undefined){
                errorFieldsData.push(itm)
                val = true
            }
        })
        setErrorFields(errorFieldsData)
        submitFun(val)
      };

      const submitFun = (unError)=>{
        if(!unError){
            onSubmit()
        }
      }

      const removeErrorHandle = (name)=>{
       const filterError = _.without(errorFields, name);
       setErrorFields(filterError)
    }

    return (
        <>
            <div className="row" >
                {
                    customAlign == true ? dynamicForm.map((item, index) => (
                        <React.Fragment key={index}>
                            <div key={index} className="row">
                                {
                                    item.formFields.map((ele, idx) => (
                                        <div className={`${ele?.classStyle || "col-12"}`}>
                                        <FormComponent key={idx} field={ele} removeErrorHandle={removeErrorHandle} state={defaultState} errorHandleFields={errorFields} setState={setDefaultState} onChangeCallBack={onChangeCallBack} onClick={onClick}></FormComponent>
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    )) : dynamicForm.map((item, index) => (
                        <React.Fragment key={index}>
                            <div key={index} className={screenWidth > 500 ? `col-${noOfCol || 12}` : "col-12"}>
                                {item.title == "true" ? <h4 style={{ fontWeight: 600, fontSize: '21px', borderBottom: "3px solid transparent", width: "fit-content", letterSpacing: "1.5px" }}>&nbsp;</h4> : (item.title) ? <h4 style={{ fontWeight: 600, fontSize: '21px', borderBottom: "3px solid #d1d1d1", width: "fit-content", letterSpacing: "1.5px" }}>{item?.title}{/* {capsLetter(item?.title)} */}</h4> : ""}
                                {
                                    item.formFields.map((ele, idx) => (
                                        <FormComponent key={idx} field={ele} removeErrorHandle={removeErrorHandle} state={defaultState} errorHandleFields={errorFields} setState={setDefaultState} onChangeCallBack={onChangeCallBack} onClick={onClick}></FormComponent>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
              
            </div>
        </>
    )
})

export default FormLayout;