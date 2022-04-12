import React,{useState} from 'react';
import Navbar from './Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import About from './About';
import Login from "./Login";
import SignUp from "./SignUp"
import NoteState from '../context/notes/NoteState'
import Alert from './Alert';
import Footer from './Footer';
import "../index.css"

function App() {
  const [alert, setAlert] = useState(null);
 
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showalert={showAlert}/>
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showalert={showAlert}/>} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login showalert={showAlert} />} />
              <Route exact path="/SignUp" element={<SignUp showalert={showAlert}/>} />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App;
