import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField  } from "@mui/material";

export default function AddCar({saveCar}) {
  
    const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''})
    const [showDialog, setShowDialog] = useState(false)

    const handleCloseDialog = (event, reason) => {
        if(reason != 'backdropClick'){
            setShowDialog(false);
        }
    }

    const handleShowDialog = () => {
        setShowDialog(true);
    }

    const handleInputChange = (event) => {
		setCar({...car, [event.target.name]: event.target.value })
    }

	const handleSave = () => {
		saveCar(car);
		setShowDialog(false);
	}
  
    return (
    <>
     <Button style={{margin: "5px"}} variant="outlined" onClick={handleShowDialog}>New Car</Button>
            <Dialog
            open={showDialog}
            onClose={handleCloseDialog}
            >
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField 
                    label="Brand"
					name="brand"
                    value={car.brand}
                    onChange={handleInputChange}
                    />
					<TextField 
                    label="Model"
					name="model"
                    value={car.model}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    label="Color"
					name="color"
                    value={car.color}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    label="Fuel"
					name="fuel"
                    value={car.fuel}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    label="Year"
					name="year"
                    value={car.year}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    label="Price"
					name="price"
                    value={car.price}
                    onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
					<Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
    </>
  );
}