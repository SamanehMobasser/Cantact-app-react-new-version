import { ContactsProvider } from "./context/ContactsContext";
import Contacts from "./components/Contacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // برای استایل نوتیفیکیشن‌ها


function App() {
  return (
    <ContactsProvider>
      <Contacts />
      <ToastContainer />
    </ContactsProvider>
  );
}


export default App;
