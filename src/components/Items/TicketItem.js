import React from 'react'

const TicketItem = (props) => {
    const{ticket, updateStatus} = props;

  return (
    <div className="col-md-3">
    
      <div className="card my-3 bg-secondary" >
        <div className="card-body">
          <h5 className="card-title">T# {ticket.ticket_id}</h5><br/>
          <p className="card-text"><b>Title : </b>{ticket.title}</p>
          <p className="card-text"><b>Description : </b>{ticket.description}</p>
          <p className="card-text"><b>Priority : </b>{ticket.priority}</p>
          <p className="card-text"><b>Status : </b>{ticket.status}</p>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateStatus(ticket)}></i>
        </div>
      </div>
    </div>
  )
}

export default TicketItem