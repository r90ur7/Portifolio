import React from "react";

import Weather from '../../Pages/Weather';
import Teste from "../../Pages/Teste/Teste"
import Home from '../../Pages/Home/Home';

import { Routes, Route } from "react-router-dom";



const Main = () =>{
    return (
            <main>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/Weather' element={<Weather />}></Route>
                    <Route path='/Teste' element={<Teste />}></Route>
                </Routes>
            </main>
    )
}

export default Main;