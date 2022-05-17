import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';





function App() {
  const [LinkChange, setLinkChange]= useState(true);

  return (
    <BrowserRouter>
      <>
        <Header LinkChange={LinkChange} setLinkChange={setLinkChange} />
      </>
      <Routes>
        <Route path="/" element={<Home LinkChange={LinkChange} setLinkChange={setLinkChange}/>}></Route>
        <Route path='/project' element={<Project setLinkChange={setLinkChange}/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
      </Routes>

    </BrowserRouter>
   
  
  );
}

export default App;
