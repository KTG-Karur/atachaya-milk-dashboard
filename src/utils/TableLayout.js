import React, { useState, Fragment } from "react";
import FormComponent from "./formComponent";


const TableFormLayout = ({ ...props }) => {

    const { noOfColumns = 1, dynamicForm, onChangeCallBack, defaultState, setDefaultState, index, iconDeletePress, tableState } = props

    const noOfCol = 12 / parseInt(noOfColumns)
    const screenWidth = window.innerWidth

    return (
        <>
            {/* <div className="row"> */}
            <tr>
                {dynamicForm.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {
                            <td style={{ minWidth: "120px" }}>
                                {item.formFields.map((ele,idxx) => {
                                    return (
                                        <FormComponent key={idxx} field={ele} state={defaultState} onChangeCallBack={onChangeCallBack} setState={setDefaultState} layoutType="multiForm" index={index} iconDeletePress={iconDeletePress} tableState={tableState}></FormComponent>
                                    )
                                })}
                            </td>
                        }
                    </React.Fragment>
                ))}
            </tr>
            {/* </div> */}
        </>
    )
}

export default TableFormLayout;