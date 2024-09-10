import React from 'react';
import {Typography} from "@mui/material";

const Home = () => {
    return (
        <section>
            <Typography variant="h4" sx={{mt: '6%', textAlign: 'center', marginBottom: '2rem'}} gutterBottom>
                Domovská stránka
            </Typography>
            <p>Tenhle projekt obsahuje aplikaci pro správu týmů a jejich hráčů</p>
            <p>Pro práci s aplikaci použíjte horní panel</p>

        </section>
    );
};

export default Home;