import React, { useState } from 'react';
import './TicketSelection.css';
import ButtonGroup from '../reuseables/ButtonGroup';
import Heading from '../reuseables/Heading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TicketSelection = ({ onNext, onCancel }) => {
    const [ticketType, setTicketType] = useState("");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleCancel = () => {
        // Reset the selection
        setTicketType("");
        setQuantity(1);
        
        // Show cancellation toast
        toast('Selection cancelled', {
            icon: '❌',
            duration: 2000
        });

        // Call the parent component's onCancel handler
        if (onCancel) {
            onCancel();
        }
    };

    const handleNext = () => {
        if (!ticketType) {
            toast.error('Please select a ticket type before proceeding.');
            return;
        }

        // Save the ticket selection data
        const ticketData = {
            type: ticketType,
            quantity: quantity,
            event: "Techember Fest '25",
            date: "March 15, 2025",
            time: "7:00 PM"
        };

        // Store the selection in localStorage for later reference
        localStorage.setItem('ticketSelection', JSON.stringify(ticketData));

        // Show success toast
        toast.success(`Selected ${quantity} ${ticketType} ticket(s)!`, {
            duration: 3000
        });

        // Call the parent component's onNext handler with the selection data
        if (onNext) {
            onNext(ticketData);
        }
        
        navigate('/form');
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    return (
        <div className="container">
            <Heading 
                title="Ticket Selection" 
                subtitle="Step 1 of 3" 
                icon="/icons/progress-container.svg" 
            />

            <div className="selection-field">
                <section className="event-details" aria-labelledby="event-title">
                    <h2 id="event-title" className="road-rage">Techember Fest '25</h2>
                    <p>Join us for an unforgettable experience at <strong>Techember Fest '25</strong>! Secure your spot now.</p>
                    <p>📍<span aria-label="Event Location">[Event Location]</span> | <time dateTime="2025-03-15T19:00">March 15, 2025 | 7:00 PM</time></p>
                </section>

                <img src="/icons/breakline.svg" alt="" aria-hidden="true" className="breakline" />

                <section className="select-ticket">
                    <label htmlFor="ticket-type">Select Ticket Type:</label>
                    <div className="ticket-options" role="group" aria-labelledby="ticket-type">
                        <button 
                            className={`booking ${ticketType === "Free" ? "selected" : ""}`}
                            onClick={() => setTicketType("Free")} 
                            aria-pressed={ticketType === "Free"}
                        >
                            <p className="price">Free</p>
                            <div className="price-details">
                                <p>REGULAR ACCESS</p>
                                <p>20/52</p>
                            </div>
                        </button>

                        <button 
                            className={`booking ${ticketType === "$150 VIP" ? "selected" : ""}`}
                            onClick={() => setTicketType("$150 VIP")} 
                            aria-pressed={ticketType === "$150 VIP"}
                        >
                            <p className="price">$150</p>
                            <div className="price-details">
                                <p>VIP ACCESS</p>
                                <p>20/52</p>
                            </div>
                        </button>

                        <button 
                            className={`booking ${ticketType === "$150 VVIP" ? "selected" : ""}`}
                            onClick={() => setTicketType("$150 VVIP")} 
                            aria-pressed={ticketType === "$150 VVIP"}
                        >
                            <p className="price">$150</p>
                            <div className="price-details">
                                <p>VVIP ACCESS</p>
                                <p>20/52</p>
                            </div>
                        </button>
                    </div>
                </section>

                <section className="number-ticket">
                    <label htmlFor="numberoftickets">Number of Tickets:</label>
                    <div className="dropdown-container">
                        <select 
                            id="numberoftickets" 
                            name="number" 
                            aria-label="Select number of tickets"
                            value={quantity}
                            onChange={handleQuantityChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <span className="custom-arrow" aria-hidden="true">⌄</span>
                    </div>
                </section>

                <ButtonGroup 
                    onCancel={handleCancel} 
                    onNext={handleNext} 
                    disabled={!ticketType}
                    btnOneText="Cancel"
                    btnTwoText="Next" 
                />
            </div>
        </div>
    );
};

export default TicketSelection;