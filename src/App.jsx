import { ContactsProvider } from "./context/ContactsContext";
import Contacts from "./components/Contacts";

function App() {
  return (
    <ContactsProvider>
      <Contacts />
    </ContactsProvider>
  );
}


export default App;
