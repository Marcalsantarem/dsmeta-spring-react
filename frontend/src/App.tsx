import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from "./components/Header";
import SalesCard from "./components/SalesCard";
import alertaBackOffiline from './ts/alertaBackOffline';

function App() {

  alertaBackOffiline();

  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <section id="sales">
          <div className="dsmeta-container">
            <SalesCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App;
