import React from 'react';
import './Ticket.css';
import { getFormData, getTicketSelection } from '../../utils/FormUtils';
import TicketBackground from '../reuseables/TicketBackground';
import BarCode from '../reuseables/BarCode';
import ButtonGroup from '../reuseables/ButtonGroup';
import Heading from '../reuseables/Heading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Ticket = ({onCancel, onNext}) => {
    const navigate = useNavigate();
    const formData = getFormData();
    const ticketData = getTicketSelection();

    const handleNewBooking = () => {
        toast.success('Redirecting to booking page...');
        navigate('/');
    };

    const handleDownload = () => {
        console.log('Generating ticket...');
        const ticketElement = document.querySelector('.container');
        if (ticketElement) {
            html2canvas(ticketElement, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
                pdf.save('ticket.pdf');
            });
        }
    };

    return (
        <main className="container">
            <Heading 
                title="Ready"
                subtitle="Step 3/3"
                icon="/icons/step3.svg"
            />

            <header className="ticket-intro">
                <h1>Your Ticket is Booked!</h1>
                <p>You can download or Check your email for a copy</p>
            </header>
            <div className='bg-container'>
                <TicketBackground className="relative" aria-hidden="true" />
            </div>
            <section className="content">
                <article className="ticket-info">
                    <div>
                        <header className="event-detail">
                            <h2>Techember Fest ’25</h2>
                            <p role="text">📍 04 Rumens Road, Ikoyi, Lagos</p>
                            <p role="text">📅 March 15, 2025 | 7:00 PM</p>
                        </header>

                        {formData.imageUrl && (
                            <figure className="avatar">
                                <img 
                                    src={formData.imageUrl} 
                                    alt={`Profile picture of ${formData.name}`} 
                                />
                            </figure>
                        )}
                    </div>
                    <section className="ticket-details">
                        <div className="label">
                            <label htmlFor="name">Name</label>
                            <div className="value" id="name"><strong>{formData.name}</strong></div>
                        </div>

                        <div className="label">
                            <label htmlFor="email">Email</label>
                            <div className="value" id="email"><strong>{formData.email}</strong></div>
                        </div>

                        <div className="label">
                            <label htmlFor="ticket-type">Ticket Type</label>
                            <div className="value" id="ticket-type">{ticketData.type}</div>
                        </div>

                        <div className="label">
                            <label htmlFor="ticket-quantity">Ticket For</label>
                            <div className="value" id="ticket-quantity">{ticketData.quantity}</div>
                        </div>

                        {formData.request && (
                            <div className="label full">
                                <label htmlFor="special-request">Special Request</label>
                                <div className="value full" id="special-request">{formData.request}</div>
                            </div>
                        )}
                    </section>
                </article>
            </section>
             <div className='barcode-container'>
                    <BarCode className="barcode" aria-hidden="true" />
            </div>
            <footer className="wninety">
                <ButtonGroup 
                    btnOneText="Book another Ticket"
                    btnTwoText="Download Ticket"
                    onCancel={handleNewBooking}
                    onNext={handleDownload}
                    className='full-wdth'
                />
            </footer>
        </main>
    );
};

export default Ticket;
