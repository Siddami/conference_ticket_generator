// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "react-hot-toast";
import TicketSelection from './components/TicketSelection';
import ConferenceForm from "./components/ConferenceForm.jsx";
import Ticket from "./components/Ticket/index.jsx";
// import PaymentPage from './components/PaymentPage'; // You'll need to create this
// import ConfirmationPage from './components/ConfirmationPage'; // You'll need to create this

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Toaster position="top-center" />
        <Layout>
          <Routes>
            <Route path="/" element={<TicketSelection />} />
            <Route path="/form" element={<ConferenceForm />} />
            <Route path="/ticket" element={<Ticket />} /> 
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;