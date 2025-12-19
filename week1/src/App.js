import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Success from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
