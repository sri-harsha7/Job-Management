import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobList from "./pages/JobList";
import JobCreation from "./pages/JobCreation";

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/jobcreation" element={<JobCreation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
