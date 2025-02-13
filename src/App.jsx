// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "react-hot-toast";
import TicketSelection from './components/TicketSelection';
import ConferenceForm from "./components/ConferenceForm.jsx";
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
            {/* {/* <Route path="/payment" element={<PaymentPage />} /> */}
            <Route path="/form" element={<ConferenceForm />} /> 
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;