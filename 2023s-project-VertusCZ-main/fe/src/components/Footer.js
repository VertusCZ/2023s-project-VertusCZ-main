import React from 'react';
import {Typography, Box} from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{bgcolor: '#F5F5F5', py: 3, bottom: 0, width: '100%'}}>
            <Typography align="center">
                Projekt VAJ by Jan Drga
            </Typography>
        </Box>
    );
};

export default Footer;
