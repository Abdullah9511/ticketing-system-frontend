import React, { useContext, useEffect, useState } from "react";
import TicketContext from "../../contexts/TicketContext";
import { useNavigate } from "react-router-dom";

const AddTicket = (props) => {
  const context = useContext(TicketContext);
  const { addTicket } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("type") === "admin") {
      console.log("ok");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [ticket, setTicket] = useState({
    ticket_id: "",
    title: "",
    description: "",
    priority: "",
    agent_name: "",
  });

  const clickHandler = (e) => {
    e.preventDefault();
    addTicket(
      ticket.ticket_id,
      ticket.title,
      ticket.description,
      ticket.priority,
      ticket.agent_name
    );
    setTicket({
      ticket_id: "",
      title: "",
      description: "",
      priority: "",
      agent_name: "",
    });
    props.showAlert("Ticket Added", "success");
  };
  const onChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="my-3 mx-2">
        <h2>Assign Ticket</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="ticket_id" className="form-label">
              Ticket Id
            </label>
            <input
              type="text"
              className="form-control"
              id="ticket_id"
              name="ticket_id"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={ticket.ticket_id}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              minLength={5}
              required
              value={ticket.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={ticket.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={ticket.priority}
              onChange={onChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="agent_name" className="form-label">
              Agent Name
            </label>
            <input
              type="text"
              className="form-control"
              id="agent_name"
              name="agent_name"
              onChange={onChange}
              required
              value={ticket.agent_name}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary "
            onClick={clickHandler}
            disabled={
              ticket.ticket_id.Length < 5 ||
              ticket.ticket_id.Length < 5 ||
              ticket.description.length < 5
            }
          >
            Assign Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
