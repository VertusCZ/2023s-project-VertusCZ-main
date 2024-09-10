import React, {useState, useEffect} from "react";
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

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/teams")
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleDelete(id) {
        const shouldDelete = window.confirm("Opravdu chcete smazat tento tým?");

        if (shouldDelete) {
            axios.delete(`http://localhost:5000/api/teams/${id}`)
                .then((response) => {
                    setTeams(teams.filter(team => team.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function moveToEdit(id) {
        window.open(`editTeam/${id}`, '_self');
    }

    return (
        <div>
            <Typography variant="h4" sx={{mt: '6%', textAlign: 'center', marginBottom: '2rem'}} gutterBottom>
                Seznam týmů
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Název klubu</TableCell>
                            <TableCell>Město</TableCell>
                            <TableCell>Země</TableCell>
                            <TableCell>Úprava</TableCell>
                            <TableCell>Mazání</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.id}</TableCell>
                                <TableCell>{team.name}</TableCell>
                                <TableCell>{team.city}</TableCell>
                                <TableCell>{team.country}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => {
                                        moveToEdit(team.id)
                                    }}>Editace</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => {
                                        handleDelete(team.id)
                                    }}>Smazání</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Teams;
