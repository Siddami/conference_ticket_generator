import React from 'react';
import './Ticket.css';
import { getFormData, getTicketSelection, saveFormData, saveTicketSelection } from '../../utils/FormUtils';
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

    const clearAllStates = () => {
        // Clear form data
        saveFormData(null);
        
        saveTicketSelection(null);
       
        if (formData?.imageUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(formData.imageUrl);
        }
    };

    const handleNewBooking = () => {
        // Clear all states before navigating
        clearAllStates();
        
        toast.success('Redirecting to booking page...');
        navigate('/', { replace: true }); 
    };

    const handleDownload = () => {
        console.log('Generating ticket...');
        
        const ticketElements = document.querySelector('.ticket-field');
        
        if (ticketElements) {
            const options = {
                scale: 2,
                useCORS: true, 
                allowTaint: true, 
                backgroundColor: '#12464E', 
                imageTimeout: 0, 
                onclone: (clonedDoc) => {
                    const clone = clonedDoc.querySelector('.bg-container, .content, .barcode-container');
                    if (clone) {
                        clone.style.padding = '20px';
                        clone.style.margin = '0';
                        clone.style.width = '100%';
                    }
                }
            };
    
            html2canvas(ticketElements, options).then((canvas) => {
                const imgWidth = 210; 
                const pageWidth = imgWidth - 20; 
                const pageHeight = (canvas.height * pageWidth) / canvas.width;
    
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');
                
                pdf.addImage(imgData, 'PNG', 10, 10, pageWidth, pageHeight);
                pdf.save('techember-ticket.pdf');
            }).catch(err => {
                console.error('Error generating PDF:', err);
                toast.error('Error generating ticket. Please try again.');
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
            <div className='overallcontainer'>
          
            <header className="ticket-intro">
                <h1>Your Ticket is Booked!</h1>
                <p>You can download or Check your email for a copy</p>
            </header>
            <div className='ticket-field'>
                    <div className='bg-container'>
                        <TicketBackground className="ticketbg" aria-hidden="true" />
                    </div>
                    <article className="ticket-info">
                            <div>
                                <header className="event-detail">
                                    <h2>Techember Fest '25</h2>
                                    <p role="text">📍 04 Rumens Road, Ikoyi, Lagos</p>
                                    <p role="text">📅 March 15, 2025 | 7:00 PM</p>
                                </header>

                                {formData?.imageUrl && (
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
                                    <div className="value" id="name"><strong>{formData?.name}</strong></div>
                                </div>

                                <div className="label">
                                    <label htmlFor="email">Email</label>
                                    <div className="value" id="email"><strong>{formData?.email}</strong></div>
                                </div>

                                <div className="label">
                                    <label htmlFor="ticket-type">Ticket Type</label>
                                    <div className="value" id="ticket-type">{ticketData?.type}</div>
                                </div>

                                <div className="label">
                                    <label htmlFor="ticket-quantity">Ticket For</label>
                                    <div className="value" id="ticket-quantity">{ticketData?.quantity}</div>
                                </div>

                                {formData?.request && (
                                    <div className="label full">
                                        <label htmlFor="special-request">Special Request</label>
                                        <div className="value full" id="special-request">{formData.request}</div>
                                    </div>
                                )}
                            </section>
                    </article>
                    <div className='barcode-container'>
                        <BarCode className="barcode" aria-hidden="true" />
                    </div>
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
            </div>
        </main>
    );
};

export default Ticket;