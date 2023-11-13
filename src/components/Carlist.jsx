import { useState, useEffect } from 'react'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Snackbar } from "@mui/material";
import AddCar from './AddCar';
import EditCar from './EditCar';

export default function Carlist() {

    const [ cars, setCars ] = useState([])
    const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);

    useEffect(() => {
        getCars()
    }, [])

    const getCars = () => {
        fetch("http://carrestapi.herokuapp.com/cars")
        .then(response => response.json())
        .then(data => {
            console.log(data._embedded.cars)
            setCars(data._embedded.cars)
        })
    }

    const deleteCar = (car) => {
        if (window.confirm("Are you sure?")) {
			fetch(car.data._links.car.href, { method: 'DELETE' })
				.then(res => {
					if (res.ok) {
						getCars();
                        setMsg(car.data.brand + " " + car.data.model + " has been deleted successfully!");
						setOpen(true);  
					} else {
						alert("Error:" + res.status)
					}
				})
				.catch(err => console.log(err));
		}
    }

    const saveCar = (car) => {
        fetch("http://carrestapi.herokuapp.com/cars", {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(car)
		})
			.then(res => {
				if (res.ok) {
					getCars();
				} else {
					alert("Error:" + res.status)
				}
			})
		.catch(err => console.error(err));
	}

    const updateCar = (car, link) => {
		if(window.confirm("Are you sure?")){
		fetch(link, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(car)
		})
			.then(res => {
				if (res.ok) {
					getCars();
					setMsg(car.brand + " " + car.model + " has been edited successfully!");
					setOpen(true);
				} else {
					alert("Error!" + res.status)
				}
			})
			.catch(err => console.error(err))
		}
	}
    

    const columns = [
        { headerName: 'Brand', field: 'brand' },
		{ headerName: 'Model', field: 'model' },
		{ headerName: 'Color', field: 'color' },
		{ headerName: 'Fuel', field: 'fuel' },
		{ headerName: 'Year', field: 'year' },
        {
			cellRenderer: row => <EditCar updateCar={updateCar} car={row.data} />
		},
        {
        cellRenderer: row =>
            <Button size="small" color="error" onClick={() => deleteCar(row)}>
                Delete
            </Button>
		}

    ]

    return (
        <div className="ag-theme-material" style={{ height: 650, width: 1400, margin: "auto" }}>
            <AddCar addCar={saveCar} />
            <AgGridReact
				rowData={cars}
				columnDefs={columns}
			>
			</AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </div>
    )
}
