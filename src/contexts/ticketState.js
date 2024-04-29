import { useState } from "react";
import TicketContext from "./TicketContext";

const TicketState = (props) => {
  const host = "http://localhost:5000";

  // Initialize separate states for pending and completed tickets
  const [pendingTickets, setPendingTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);
  const [tickets, setTickets] = useState([]);

  // Get Pending tickets
  const getPendingTickets = async () => {
    try {
      const response = await fetch(`${host}/api/tickets/pendingtickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending tickets');
      }

      const data = await response.json();
      setPendingTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get Completed tickets
  const getCompletedTickets = async () => {
    try {
      const response = await fetch(`${host}/api/tickets/completedtickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch completed tickets');
      }

      const data = await response.json();
      setCompletedTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a Ticket
  const addTicket = async (ticket_id, title, description, priority, agent_name) => {
    try {
      const response = await fetch(`${host}/api/tickets/addticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ ticket_id, title, description, priority, agent_name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create and assign ticket');
      }

      const ticket = await response.json();
      
      // Determine if the ticket is pending or completed based on its status
      if (ticket.status === 'Completed') {
        // Add completed ticket to completedTickets state
        setCompletedTickets(prevCompletedTickets => [...prevCompletedTickets, ticket]);
      } else {
        // Add pending ticket to pendingTickets state
        setPendingTickets(prevPendingTickets => [...prevPendingTickets, ticket]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add a user

  const addUser = async (name, email, password, type) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ name, email, password, type }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const json = await response.json();
      console.log(json);
      
    } catch (error) {
      console.error(error);
    }
  };

  // Update a Ticket status
  const editTicket = async (id, status) => {
    try {
      const response = await fetch(`${host}/api/tickets/updateticketstatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      // Update the status of the ticket in the appropriate state
      if (status === 'Completed') {
        // Update completed ticket in completedTickets state
        setCompletedTickets(prevCompletedTickets =>
          prevCompletedTickets.map(ticket =>
            ticket._id === id ? { ...ticket, status } : ticket
          )
          
        );
        getPendingTickets();
        getCompletedTickets();
      } else {
        // Update pending ticket in pendingTickets state
        setPendingTickets(prevPendingTickets =>
          prevPendingTickets.map(ticket =>
            ticket._id === id ? { ...ticket, status } : ticket
          )
        );
        
      }

      console.log('Ticket status updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // Get agent tickets by name
  const fetchAgentTickets = async (agentName) => {
    try {
      // Make a GET request to the backend to fetch agent tickets by name
      const response = await fetch(`${host}/api/tickets/fetchagenttickets/${agentName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch agent tickets");
      }

      // Parse the JSON response
      const data = await response.json();

      // Set the fetched tickets in state
      setTickets(data);
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <TicketContext.Provider
      value={{ pendingTickets, completedTickets, tickets, getPendingTickets, getCompletedTickets, addTicket, editTicket, addUser, fetchAgentTickets }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
