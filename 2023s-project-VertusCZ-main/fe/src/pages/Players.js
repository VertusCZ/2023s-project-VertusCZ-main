import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography
} from "@mui/material";

function Players() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/players")
            .then((response) => {
                setPlayers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    const getTeamname = (teamId) => {
        const team = teamData.find((team) => team.id === teamId);
        return team ? team.name : '';
    }

    function moveToEdit(id) {
        window.open(`editPlayer/${id}`, '_self');
    }

    function deletePlayer(id) {
        const deleteConfirn = window.confirm("Opravdu chcete smazat hráče?");
        if (deleteConfirn){
            axios.delete(`http://localhost:5000/api/players/${id}`)
                .then(() => {
                    setPlayers(players.filter(player => player.id !== id));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography variant="h4" sx={{mt: '6%', textAlign: 'center', marginBottom: '2rem'}} gutterBottom>
                Seznam hráčů
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Jméno</TableCell>
                            <TableCell>Věk</TableCell>
                            <TableCell>Pozice</TableCell>
                            <TableCell>Tým</TableCell>
                            <TableCell>Úpravy</TableCell>
                            <TableCell>Smazání</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player) => (
                            <TableRow key={player.id}>
                                <TableCell>{player.id}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.age}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>{getTeamname(player.team_id)}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => { moveToEdit(player.id) }}>Editace</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained"  color="error"  onClick={() => { deletePlayer(player.id) }}>Smazání</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Players;
