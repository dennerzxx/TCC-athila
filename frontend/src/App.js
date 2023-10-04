import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Rotas from './Routes/Route'
import { UserProvider } from './context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
        <ToastContainer />
          <Rotas />
        </UserProvider>

      </Router>
    </div>
  );
}
export default App;
