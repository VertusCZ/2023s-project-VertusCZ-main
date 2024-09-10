import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import AddTeam from "./pages/AddTeam";
import Players from "./pages/Players";
import AddPlayer from "./pages/AddPlayer";
import EditTeam from "./pages/EditTeam";
import EditPlayer from "./pages/EditPlayer";

//vím že je to starší verze použití React Routeru ale mě prostě sedí více :)
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SharedLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/teams" element={<Teams/>}/>
                        <Route path="/players" element={<Players/>}/>
                        <Route path="/addTeam" element={<AddTeam/>}/>
                        <Route path="/editTeam/:id" element={<EditTeam/>}/>
                        <Route path="/addPlayer" element={<AddPlayer/>}/>
                        <Route path="/editPlayer/:id" element={<EditPlayer/>}/>

                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
