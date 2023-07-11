import React from "react";
import Weather from '../../Pages/Weather';
import Home from '../../Pages/Home/Home';
import {  Routes, Route } from "react-router-dom"

const Main = () =>{
    return (
        <main>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/Weather' element={<Weather />}></Route>
                </Routes>
        </main>
    )
}

export default Main;