import React, { useState, Fragment } from "react";
import FormComponent from "./formComponent";


const SampleMultiLayout = ({ ...props }) => {

    const { dynamicForm, onChangeCallBack, defaultState, setDefaultState, index=null, iconDeletePress=null, tableState } = props
    return (
        <>
            {/* <div className="row"> */}
            {dynamicForm.map((item, idx) => (
                <>
                    {
                        <div className="row" >
                            {item.formFields.map((ele) => {
                                return (
                                    <>
                                    <div className={`${ele?.classStyle || "col-12"}`}>
                                        <FormComponent field={ele} state={defaultState} onChangeCallBack={onChangeCallBack} setState={setDefaultState} layoutType="multiForm" index={index} iconDeletePress={iconDeletePress} tableState={tableState}></FormComponent>
                                        </div></>
                                )
                            })}
                        </div>
                    }

                </>
            ))}
            {/* </div> */}
        </>
    )
}

export default SampleMultiLayout;