import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactForm from './pages/ContactForm'
import ContactsTable from './pages/ContactsTable'
import UpdateContactForm from "./pages/UpdateContactForm";

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/table" element={<ContactsTable />} />
          <Route path="/update/:id" element={<UpdateContactForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
