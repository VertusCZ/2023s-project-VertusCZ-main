import React, {useState} from 'react';
import axios from 'axios';
import {Typography, Box, TextField, Button} from "@mui/material";

const AddTeam = () => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        country: ''
    });

    const {name, city, country} = formData;

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('http://localhost:5000/api/teams', body, config);
            console.log(res.data);
            // Reset form data after successful submission
            setFormData({
                name: '',
                city: '',
                country: ''
            });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <Box sx={{padding: "2rem"}}>
            <Typography variant="h4" sx={{mt: '3%', textAlign: 'center'}} gutterBottom>
                Vytvoření nového týmu
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "400px",
                    margin: "0 auto",
                }}
            >
                <TextField
                    id="name"
                    name="name"
                    label="Název klubu"
                    value={name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    id="city"
                    name="city"
                    label="Město"
                    value={city}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    id="country"
                    name="country"
                    label="Země"
                    value={country}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" sx={{mt: 2}}>
                    Vytvořit tým
                </Button>
            </Box>
        </Box>
    );
};

export default AddTeam;
