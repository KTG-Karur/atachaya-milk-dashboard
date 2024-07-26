import React, { useEffect, useState } from "react";
import TableCardCustom from "../Atom/TableCard"
import CustomTable from "../Atom/CustomDataTable";


const DataTable = (props) => {

    const {title, state, dataList, column}=props
       
    return(
        <>
        <TableCardCustom >
            <CustomTable columns={column} data={dataList} tableName={title} state={state} ></CustomTable>
        </TableCardCustom>
        </>
    )
}

export default DataTable;