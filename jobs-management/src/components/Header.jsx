import { useJobContext } from "../config/JobContext";
import JobCard from "./JobCard";
import Logo from "../assets/logo.png";
import Filter from "./Filter";
import NavBar from "./NavBar";
import JobCreation from "../pages/JobCreation";

const Header = () => {
  const { showJobPage, setShowJobPage } = useJobContext();

  return (
    <div>
      <NavBar />
      <Filter />

      {showJobPage && (
        <div className="absolute inset-0">
          <JobCreation />
        </div>
      )}

      <button
        onClick={() => setShowJobPage(true)}
        className="fixed bottom-8 right-8 bg-[#00AAFF] text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        +
      </button>
    </div>
  );
};

export default Header;
