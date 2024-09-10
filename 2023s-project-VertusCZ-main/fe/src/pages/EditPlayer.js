import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box, TextField, Button, MenuItem } from "@mui/material";

function EditPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState({
        name: "",
        age: "",
        position: "",
        team_id: "",
    });

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/players/${id}`)
            .then((response) => {
                setPlayer(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("http://localhost:5000/api/teams")
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPlayer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/players/${id}`, player)
            .then((response) => {
                console.log(response.data);
                setTimeout(() => {
                    navigate("/players");
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box sx={{padding: "2rem"}}>
            <Typography variant="h4" sx={{mt: '3%', textAlign: 'center'}} gutterBottom>
                Editace hráče
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
                    id="team_id"
                    name="team_id"
                    label="Tým"
                    value={player.team_id || ""}
                    onChange={handleChange}
                    select
                    required
                >
                    {teams.map((team) => (
                        <MenuItem key={team.id} value={team.id}>
                            {team.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="name"
                    name="name"
                    label="Jméno"
                    value={player.name || ""}
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="age"
                    name="age"
                    label="Věk"
                    type="number"
                    value={player.age || ""}
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="position"
                    name="position"
                    label="Pozice"
                    value={player.position || ""}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained">
                    Uložit
                </Button>
            </Box>
        </Box>
    );
}

export default EditPlayer;
