
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Table, Collapse, DropdownButton, Dropdown, Card } from 'react-bootstrap';



const CustomTable = (props) => {
    const { data, columns, keyField, tableName, parentMenuName,btnName ,addPath, state, isExpand = false, expandView } = props;
    const initialPageCount = 6;
    const listData = [...data];
    const [rowsShowing, setrowsShowing] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialPageCount);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    let pathName = location.pathname;

    //const currentItems = data.slice(itemOffset, endOffset);

    const [tableState, tableSetState] = useState({
        itemList: [],
        expandIndex: null,
        sortableColumn: columns ? columns : [{
            dataField: "No Data",
            text: "Table",
            sort: true
        }],
    });
    useEffect(() => {
        if (typeof currentPage !== "undefined") {
            setCurrentPage(0);
            setrowsShowing(0);
            setRowsPerPage(initialPageCount);
            setItemOffset(0);
            setCurrentPage(0);
        }
    }, [listData.length]);

    useEffect(() => {
        tableSetState({
            ...tableState,
            expandIndex: null,
            itemList: listData,
            sortableColumn: columns ? columns : [{
                dataField: "No Data",
                text: "Table",
                sort: true
            }],
        })
        /*  setrowsShowing(0);
         setRowsPerPage(initialPageCount);
         setItemOffset(0);
         setCurrentPage(0); */
    }, [props]);
    let endOffset = itemOffset + rowsPerPage;
    const pageClick = (clickEvent) => {
        if (clickEvent.nextSelectedPage != undefined) {
            setrowsShowing(clickEvent.nextSelectedPage)
        }
    }
    const handleChangePage = (event) => {
        const newOffset = (event.selected * rowsPerPage) % itemList.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected)
    }
    const sortItems = (item, index) => {
        const listItems = [...itemList];
        let sortColmn = [...sortableColumn];
        let sortType = "asc";
        if (sortColmn[index].sorting === "asc") { sortType = "desc"; }
        sortColmn[index].sorting = sortType;
        const itms = _.orderBy(listItems, [item["dataField"]], [sortType]);
        tableSetState({
            ...tableState,
            itemList: itms,
            sortableColumn: sortColmn
        })
    }
    const filterData = (event) => {
        const search = event.target.value || '';
        const listItems = [...data];
        let filterData = listItems.filter((row) => {
            let found = Object.values(row).find(o => (o.toString().toLowerCase()).includes(search.toLowerCase()));
            if (found) return true;
            else return false;
        });
        if (!search) { filterData = listData; }
        tableSetState({
            ...tableState,
            itemList: filterData
        })
        setrowsShowing(0);
        setRowsPerPage(initialPageCount);
        setItemOffset(0);
    }
    let { itemList, sortableColumn, expandIndex } = tableState;
    const pageCount = Math.ceil(itemList.length / rowsPerPage);
    const currentItems = itemList.slice(itemOffset, endOffset);
    const totalItems = Math.ceil(itemList.length);
    const rowStart = rowsShowing === 0 ? 1 : ((rowsShowing * rowsPerPage) + 1);
    const rowEnding = rowsPerPage * (rowsShowing + 1);
    const rowEnd = rowEnding > totalItems ? totalItems : rowEnding;
    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className=" card-table">
                        <div className="card-body product-list purchase">
                            <div className="table-responsive table-hover table-striped">


                                <div className="page-wrapper">
                                    <div className="content container-fluid">
                                        <h6 className="mb-2 text-muted" style={{ letterSpacing: "2px" }}>{` ${parentMenuName || "home"} ${pathName}` || "Table"}</h6>
                                        <Card className="p-4">
                                            <div className="d-flex justify-content-between">
                                            <h5 className="mb-1 text-uppercase" style={{ letterSpacing: "3px" }}>{tableName || "Table"}</h5>
                                                <Link className="btn btn-primary" to="/add-customer">
                                                    <i
                                                        className="fa fa-plus-circle me-2"
                                                        aria-hidden="true"
                                                    />
                                                    {btnName || "Add"}
                                                </Link>
                                            </div>
                                          
                                            <div className="d-flex justify-content-end align-items-center">
                                                <div className="input-right-icon">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="table-search"
                                                        onChange={filterData}
                                                        placeholder="Search in this table"
                                                    />
                                                    <span className="span-right-input-icon">
                                                        <i className="ul-form__icon i-Magnifi-Glass1"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <br />

                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    {/* <table id={tableName} className="table dataTable-collapse table-bordered table-striped" > */}
                                                    <thead>
                                                        <tr>
                                                            {sortableColumn.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        {item.sort ?
                                                                            <th scope="col" style={{ cursor: "pointer" }} onClick={() => { sortItems(item, index) }}>
                                                                                {item.text}
                                                                                {item?.sorting &&
                                                                                    <i className={`text-10 ${item.sorting === 'asc' ? `i-Up1` : `i-Down1`}`}></i>
                                                                                }
                                                                            </th>
                                                                            :
                                                                            <th scope="col">{item.text}</th>
                                                                        }
                                                                    </>

                                                                )
                                                            }
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems.length === 0 && <tr key={0} className="text-center"><td colSpan={sortableColumn.length} >Data Not Founded</td></tr>}
                                                        {(currentItems).map((rowItem, rowIndex) => {
                                                            const indexClicked = expandIndex === rowIndex ? null : rowIndex;
                                                            return (
                                                                <>
                                                                    <tr key={rowIndex} onClick={() => {
                                                                        tableSetState({ ...tableState, expandIndex: indexClicked })
                                                                    }}>
                                                                        {sortableColumn.map((colItem, colIndex) => {
                                                                            return (
                                                                                <td scope="row">
                                                                                    {isExpand && colIndex === 0 && <i style={{ backgroundColor: "transparent", marginRight: 10 }} className={`text-10 ${expandIndex === rowIndex ? `i-Arrow-Up-2` : `i-Arrow-Down-2`}`}></i>}
                                                                                    {
                                                                                        colItem.formatter ?
                                                                                            colItem.formatter(rowItem[colItem.dataField], rowItem, rowIndex + (rowsShowing * rowsPerPage), state)
                                                                                            : rowItem[colItem.dataField]
                                                                                    }
                                                                                </td>
                                                                            )
                                                                        }
                                                                        )}
                                                                    </tr>
                                                                    {isExpand && <Collapse timeout={1000} in={rowIndex === expandIndex ? true : false} appear={true} >
                                                                        {expandView(rowItem, rowIndex)}
                                                                    </Collapse>}


                                                                </>
                                                            )
                                                        }
                                                        )}
                                                    </tbody>
                                                </Table>

                                            </div>

                                            <div className="d-flex  align-items-center justify-content-between md-12">
                                                <div className="d-flex align-items-center">
                                                    <a className="text-active text-small w-15 me-3 w-sm-100">Showing rows {rowStart} to {rowEnd} of {totalItems}</a>
                                                    <DropdownButton
                                                        variant={"outline-primary"}
                                                        size="sm"
                                                        title={rowsPerPage + " items per page"}
                                                    >
                                                        {
                                                            [10, 20, 30, 40, 50].map((item, index) => {
                                                                return (
                                                                    <Dropdown.Item onClick={() => { setRowsPerPage(item) }} eventKey={item}>{item} items per page</Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </DropdownButton>
                                                </div>
                                                <div className="justify-content-end">
                                                    <ReactPaginate
                                                        previousLabel={"< Previous"}
                                                        nextLabel={"Next >"}
                                                        breakLabel={"..."}
                                                        breakClassName={"break-me"}
                                                        pageCount={pageCount}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={5}
                                                        onClick={pageClick}
                                                        forcePage={currentPage}
                                                        onPageChange={handleChangePage}
                                                        containerClassName={"pagination pagination-lg"}
                                                        subContainerClassName={"pages pagination"}
                                                        activeClassName={"active"}
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default CustomTable;
