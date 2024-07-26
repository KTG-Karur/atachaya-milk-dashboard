import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIcon, search } from "../../common/imagepath";
import Card from 'react-bootstrap/Card';
import {
    onShowSizeChange,
    itemRender,
} from "../../common/paginationfunction";
import { Table } from "antd";
import FormLayout from "../../utils/formLayout";
import { numberFormat } from "../../utils/applicationFun";
import { MdArrowCircleLeft } from "react-icons/md";


const TemplateCustomTable = (props) => {

    const { tableName, show, setShow, onClickForm, onClickLink, uniqueKey, totalCount, columns, list, filterForm, search = true, closeModule, closeModuleArrow, filterFormCol, filterFields = false, state, setState, onClick, reportCol, reportData, reportCount, countName, count, targetRef } = props
    // alert(JSON.stringify(list))

    {/* //////naveen 07.06.2024////// */ }
    const targetRefProp = targetRef === '' ? false : targetRef;
    {/* //////naveen 07.06.2024////// */ }

    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(10);
    const [tableState, tableSetState] = useState(list)
    const [defaultList, setDefaultList] = useState(JSON.parse(JSON.stringify(list)))


    const handlePagination = async (page, pageSize) => {
        setPage(page);
        setPagesize(pageSize);
        // getListcustomer(page, pageSize);
    };

    const filterData = (event) => {
        const search = event.target.value || '';
        const listItems = [...list];
        let filterData = listItems.filter((row) => {
            let found = Object.values(row).find(o => (o.toString().toLowerCase()).includes(search.toLowerCase()));
            if (found) return true;
            else return false;
        });
        if (!search) { filterData = defaultList; }
        tableSetState(filterData)
    }

    return (
        <>
            <div className="page-wrapper customers">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="content-page-header">
                            <div className={`d-flex justify-content-${closeModuleArrow ? "start" : "between"}`}>
                                {closeModuleArrow && <MdArrowCircleLeft size={32} className="text-primary cursor-pointer" onClick={() => closeModule()} />}
                                <h5 className="mx-2">{tableName || ""}</h5>
                            </div>
                            <div className="list-btn">
                                <ul className="filter-list">
                                    {/*   <li>
                                        <Link
                                            className="btn btn-filters w-auto popup-toggle"
                                            onClick={() => setShow(!show)}
                                        >
                                            <span className="me-2">
                                                <img src={FilterIcon} alt="filter" />
                                            </span>
                                            Filter{" "}
                                        </Link>
                                    </li> */}
                                    <li>
                                        {search && <div id="checkBoxes1">
                                            <div className="form-custom">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="member_search1"
                                                    placeholder="&#xf158; Search in this table"
                                                    onChange={filterData}
                                                />
                                            </div>
                                        </div>}
                                    </li>
                                    {onClickLink && <li>
                                        <Link className="btn btn-primary" to={`/${onClickLink}`}>
                                            <i
                                                className="fa fa-plus-circle me-2"
                                                aria-hidden="true"
                                            />
                                            Add
                                        </Link>
                                    </li>}
                                    {onClickForm && <li>
                                        <Link className="btn btn-primary" onClick={onClickForm}>
                                            <i
                                                className="fa fa-plus-circle me-2"
                                                aria-hidden="true"
                                            />
                                            Add
                                        </Link>
                                    </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                filterFields && <FormLayout dynamicForm={filterForm} noOfColumns={filterFormCol} defaultState={state} setDefaultState={setState} onClick={onClick} />
                            }
                            {
                                reportCount && <div>
                                    <div className="row">
                                        {
                                            reportCol.map((itm) => {
                                                return (
                                                    <>
                                                        {
                                                            reportData.map((ele) => {
                                                                return (
                                                                    <>
                                                                        <div className="col-3">
                                                                            <Card className="mx-1 mb-2 p-2" style={{ background: "linear-gradient(90deg, rgba(141,113,180,1) 15%, rgba(106,81,138,1) 42%, rgba(87,59,121,1) 69%, rgba(58,37,88,1) 95%)" }}>
                                                                                <div className="text-nowrap" style={{ fontSize: 18, fontWeight: 600, color: "white", opacity: 0.9 }}>{itm?.title || ""}</div>
                                                                                <div className="text-nowrap d-flex justify-content-end mx-2" style={{ fontSize: 18, fontWeight: 600, color: "white", opacity: 0.9 }}>{numberFormat(ele[itm?.Key] || 0)}</div>
                                                                            </Card>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="d-flex justify-content-end mb-3" style={{ fontSize: 19, fontWeight: 600 }}>{countName || "Count"} : {count}</div>
                                </div>
                            }
                             {/* //////naveen 07.06.2024////// */}
                            <div ref={targetRefProp}>
                            {/* //////naveen 07.06.2024////// */}
                            <div className="card-table" style={{padding: targetRefProp ? '20px' : ''}}>
                                <div className="card-body purchase">
                                    <div className="table-responsive table-hover">
                                        <Table
                                            pagination={{
                                                total: totalCount,
                                                current: page,
                                                showTotal: (total, range) => (parseInt(window.innerWidth) > 500 ? `Showing ${range[0]} to ${range[1]} of ${total} entries` : ""),
                                                showSizeChanger: true,
                                                onShowSizeChange: onShowSizeChange,
                                                pageSizeOptions: [10, 25, 50, 100],
                                                defaultPageSize: 10,
                                                defaultCurrent: 1,
                                                onChange: (page, pageSize) =>
                                                    handlePagination(page, pageSize),
                                            }}
                                            columns={columns}
                                            dataSource={tableState.length > 0 ? tableState : list}
                                            rowKey={(record) => (record[uniqueKey]
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TemplateCustomTable;