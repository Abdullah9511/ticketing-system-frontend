import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketItem from "../Items/TicketItem";
import TicketContext from "../../contexts/TicketContext";

const AgentTickets = (props) => {
  const { fetchAgentTickets, tickets } = useContext(TicketContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleNameSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    fetchAgentTickets(name);
    setName(""); // Clear the input field after submission
  };

  return (
    <>
      <div>
        <h2><b>User Tickets</b></h2>
        <form onSubmit={handleNameSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter User Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={5}
              required
            />
            <button type="submit" className="btn btn-primary mt-3">Search</button>
          </div>
        </form>
      </div>

      <div className="row my-3">
        <h3>Tickets</h3>
        {tickets.length === 0 ? <div className="container">No tickets to display</div> : (
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))
        )}
      </div>
    </>
  );
};

export default AgentTickets;
