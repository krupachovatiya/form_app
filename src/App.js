import './App.css';
import Register from './Register';
import Login from './Login';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/> 
        </Route>

        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      </Routes>
    </div>
  );
}

export default App;


