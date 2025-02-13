import React from 'react';
import './Ticket.css';
import { getFormData, getTicketSelection } from '../../utils/FormUtils';
import TicketBackground from '../reuseables/TicketBackground'
import BarCode from '../reuseables/BarCode'

const Ticket = () => {
  const formData = getFormData();
    console.log(formData)

    const ticketData = getTicketSelection()
    console.log(ticketData)

  return (
    <div className='container'>
        <div className='ticket-intro'>
            <h1>Your Ticket is Booked</h1>
            <p>Check your email for a copy or you can <strong>download</strong></p>
        </div>
        <TicketBackground className="relative" />
        <div className='content'>
            <div className='ticket-info'>
                        <div className='event-detail'>
                            <h1>Techember Fest ”25</h1>
                            <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                            <p>📅 March 15, 2025 | 7:00 PM</p>
                        </div>
                        <div className='avatar'>
                            <img src={formData.imageUrl} alt={formData.name} />
                        </div>
                        <div className="ticket-details">
                            <div className="label">
                                <label htmlFor="">Enter your name</label>
                                <div className="value"><strong>{formData.name}</strong></div>
                            </div>
                            

                            <div className="label">
                                <label htmlFor="">Enter your email</label>
                                <div className="value"><strong>{formData.email}</strong></div>
                            </div>

                            <div className="label">
                                <label htmlFor="">Ticket Type:</label>
                                <div className="value">{ticketData.type}</div>
                            </div>

                            <div className="label">
                                <label htmlFor="">Ticket For:</label>
                                <div className="value">{ticketData.quantity}</div>
                            </div>
                            <div className="label full">
                                <label htmlFor="">Special request?</label>
                                <div className="value full">{formData.request}</div>    
                            </div>
                           
                        </div>
            </div>
            <BarCode className='barcode'/>
        </div>

    </div>
  )
}

export default  Ticket;
