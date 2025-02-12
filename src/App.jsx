import React from "react";
import  TicketSelection from './components/TicketSelection';
import { Layout } from "./components/Layout";
// import { Toaster } from "react-hot-toast";

function App() {
  // const [ticketData, setTicketData] = useState(null);

  return (
    <div className="page-container">
      {/* <Toaster /> */}
      <Layout>
          <TicketSelection />
      </Layout>
    </div>
  );
}

export default App;
