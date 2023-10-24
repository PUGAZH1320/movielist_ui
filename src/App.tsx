import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import MovieList from './components/MovieList';
import NewMovie from './components/NewMovie';

function App() {
  return (
    <>
    <Router>
    <div className="App">
    <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/logout' element={<Login/>}></Route>
    <Route path='/movielist' element={<MovieList/>}></Route>
    <Route path='/addmovie' element={<NewMovie/>}></Route>
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
