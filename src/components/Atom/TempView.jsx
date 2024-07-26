import React from "react";
import { MdArrowCircleLeft } from 'react-icons/md';

const TempView = (props) => {
    const { title, closeModule } = props
    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="content-page-header">
                        <div className="d-flex justify-content-start">
                            {closeModule && <MdArrowCircleLeft size={32} className="text-primary cursor-pointer" onClick={() => closeModule()} />}
                            <h5 className="mx-3">{title || ""}</h5>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default TempView;