import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketState from "./contexts/ticketState";
import Alert from "./components/Items/Alert";
import Navbar from "./components/Items/Navbar"
import Login from "./components/auth/Login";
import AgentDashboard from "./components/Agent/AgentDashboard";
import AddTicket from "./components/Admin/AddTicket";
import Createagent from "./components/Admin/Createagent";
import AgentTickets from "./components/Admin/AgentTickets";


const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <TicketState showAlert = {showAlert}>
        <Router>
          <Navbar/>
            <Alert alert={alert} />
              <div className="container my-4">

              <Routes>
                <Route exact path="/login" element={<Login showAlert = {showAlert} />}></Route>
                <Route exact path="/agentdashboard" element={<AgentDashboard showAlert = {showAlert} />}></Route>
                <Route exact path="/createticket" element={<AddTicket showAlert = {showAlert}/>}></Route>
                <Route exact path="/createagent" element={<Createagent showAlert = {showAlert}/>}></Route>
                <Route exact path="/viewagenttickets" element={<AgentTickets showAlert = {showAlert}/>}></Route>
              </Routes>
              </div>
          
        </Router>
      </TicketState>  
    </>
  );
};

export default App;
