import React, { useState, useEffect } from 'react'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Carlist() {

    const [ cars, setCars ] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch("http://carrestapi.herokuapp.com/cars")
        .then(response => response.json())
        .then(data => {
            console.log(data._embedded.cars)
            setCars(data._embedded.cars)
        })
    }

    const columns = [
        {headerName:"Brand", field:"brand"},
        {headerName:"Model", field:"model"}
    ]

    return (
        <div className="ag-theme-alpine">
            <AgGridReact
				rowData={cars}
				columnDefs={columns}
                pagination={true}
				paginationPageSize={10}
			>
			</AgGridReact>
        </div>
    )
}
