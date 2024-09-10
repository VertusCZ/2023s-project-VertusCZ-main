import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Typography, Box, TextField, Button} from "@mui/material";

function EditTeam() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState({
        name: "",
        city: "",
        country: ""
    });
    useEffect(() => {
        axios.get(`http://localhost:5000/api/teams/${id}`)
            .then(response => {
                setTeam(response.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleChange = event => {
        const {name, value} = event.target;
        setTeam(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/teams/${id}`, team)
            .then(response => {
                console.log(response.data);
                setTimeout(() => {
                    navigate('/teams');
                }, 500);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const {name, city, country} = team;

    return (
        <Box sx={{padding: "2rem"}}>
            <Typography variant="h4" sx={{mt: '3%', textAlign: 'center'}} gutterBottom>
                Editace týmu
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
                    label="Název klubu"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Město"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Země"
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" sx={{mt: 2}}>
                    Uložit
                </Button>
            </Box>
        </Box>
    );
}

export default EditTeam;