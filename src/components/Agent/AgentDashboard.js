import React, { useContext, useEffect, useRef, useState } from "react";
import TicketContext from "../../contexts/TicketContext";
import TicketItem from "../Items/TicketItem";
import { useNavigate } from "react-router-dom";

const AgentDashboard = (props) => {
  const context = useContext(TicketContext);
  const {
    pendingTickets,
    completedTickets,
    getPendingTickets,
    getCompletedTickets,
    editTicket,
  } = context;

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPendingTickets();
      getCompletedTickets();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [ticket, setTicket] = useState({ editStatus: "" });

  const updateStatus = (currentTicket) => {
    ref.current.click();
    setTicket({ id: currentTicket._id, editStatus: currentTicket.status });
  };

  const clickHandler = (e) => {
    editTicket(ticket.id, ticket.editStatus);
    refClose.current.click();
    props.showAlert("Status Updated", "success");
  };
  const onChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Status
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="editStatus"
                    name="editStatus"
                    value={ticket.editStatus}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={clickHandler}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3>Pending Tickets</h3>
        <div className="container">
          {pendingTickets.length === 0 && "No Pending Tickets to display"}
        </div>
        {pendingTickets.map((ticket) => {
          return (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              updateStatus={updateStatus}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>

      <div className="row my-3">
        <h3>Completed Tickets</h3>
        <div className="container">
          {completedTickets.length === 0 && "No Completed Tickets to display"}
        </div>
        {completedTickets.map((ticket) => {
          return (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              updateStatus={updateStatus}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default AgentDashboard;
