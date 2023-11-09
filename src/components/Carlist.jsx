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
        { headerName: 'Brand', field: 'brand0' },
		{ headerName: 'Model', field: 'model' },
		{ headerName: 'Color', field: 'color' },
		{ headerName: 'Fuel', field: 'fuel' },
		{ headerName: 'Year', field: 'year' }
    ]

    return (
        <div className="ag-theme-material" style={{ height: 650, width: 1400, margin: "auto" }}>
            <AgGridReact
				rowData={cars}
				columnDefs={columns}
			>
			</AgGridReact>
        </div>
    )
}
