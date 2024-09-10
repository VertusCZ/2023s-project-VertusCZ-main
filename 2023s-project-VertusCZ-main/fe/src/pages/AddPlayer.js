import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, TextField, Button, MenuItem,FormControl,InputLabel,Select} from "@mui/material";

const AddPlayer = () => {
    const [playerData, setPlayerData] = useState({
        name: '',
        age: '',
        position: '',
        team_id: ''
    });

    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/teams')
            .then(response => {
                setTeamData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlayerData({ ...playerData, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(playerData);
            const res = await axios.post('http://localhost:5000/api/players', body, config);
            console.log(res.data);
            // Reset form data after successful submission
            setPlayerData({
                name: '',
                age: '',
                position: '',
                team_id: ''
            });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" sx={{mt: '3%', textAlign: 'center' }} gutterBottom>
                Přidaní nového hráče
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400px",
                    margin: "0 auto",
                }}
            >
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="team_id-label">Tým</InputLabel>
                    <Select
                        labelId="team_id-label"
                        id="team_id"
                        name="team_id"
                        value={playerData.team_id}
                        onChange={handleInputChange}
                        label="Tým"
                        required
                    >
                        {teamData.map((team) => (
                            <MenuItem key={team.id} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField label="Jméno" id="name" name="name" value={playerData.name} onChange={handleInputChange} required />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField label="Věk" id="age" name="age" type="number" value={playerData.age} onChange={handleInputChange} required />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField label="Pozice" id="position" name="position" value={playerData.position} onChange={handleInputChange} required />
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Přidat hráče
                </Button>
            </Box>
        </Box>
    );

}

export default AddPlayer;
