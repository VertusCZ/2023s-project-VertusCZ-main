import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar} from '@mui/material';
import "../index.css";

const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <NavLink className={({isActive})=>
                    isActive ? "active": "nonActive"
                } to="/">Domovská stránka</NavLink>
                <NavLink className={({isActive})=>
                    isActive ? "active": "nonActive"
                                  } to="/teams">Seznam týmů</NavLink>
                <NavLink className={({isActive})=>
                    isActive ? "active": "nonActive"
                } to="/addTeam">Přidání týmů</NavLink>
                <NavLink className={({isActive})=>
                    isActive ? "active": "nonActive"
                }to="/players">Seznam hráčů</NavLink>
                <NavLink className={({isActive})=>
                    isActive ? "active": "nonActive"
                } to="/addPlayer">Přidání hráčů</NavLink>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
