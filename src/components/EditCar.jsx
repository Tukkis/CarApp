import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";
import { useState } from "react";
export default function EditCar(props) {

    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const [showDialog, setShowDialog] = useState(false);

    const handleCloseDialog = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    const handleOpenDialog = () => {
        setCar({
            brand: props.car.brand, model: props.car.model, color: props.car.color,
            fuel: props.car.fuel, year: props.car.year, price: props.car.price
        });
        setShowDialog(true);
    }

    const handleSave = () => {
        props.updateCar(car, props.car._links.car.href);
        setShowDialog(false);
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button onClick={handleOpenDialog}>Edit</Button>
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={car.year}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={car.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
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