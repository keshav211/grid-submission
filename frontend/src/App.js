import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Signup/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path='/dashboard' element={< Dashboard/>}></Route>
            <Route exact path='/login' element={< Login/>}></Route>
            <Route exact path='/register' element={< Register />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
