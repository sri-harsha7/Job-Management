import Logo from "../assets/logo.png";
import { useJobContext } from "../config/JobContext";
const NavBar = () => {
  const { setShowJobPage } = useJobContext();
  return (
    <div className="flex justify-center  pt-[21px]">
      <div
        className="shadow-[0px_4px_4px_rgba(0.15,0.15,0.15,0.15)] w-[890px] h-[80px] flex justify-center items-center rounded-[122px]
      "
      >
        <ul className="flex justify-space-between items-center gap-9 text-[16px] font-weight-[600] cursor-pointer">
          <img src={Logo} alt="" className="w-[44px] h-[44px] object-cover " />
          <li>Home</li>
          <li onClick={() => setShowJobPage(false)}>Find Jobs</li>
          <li onClick={() => setShowJobPage(false)}>Find Talents</li>
          <li onClick={() => setShowJobPage(true)}>Job Creation</li>
          <li>About Us</li>
          <li>Testimonials</li>
          <button
            style={{
              backgroundImage: "linear-gradient(to bottom, #A128FF, #6100AD)",
              backgroundSize: "100% 100%",
              width: "123px",
              height: "38px",
              borderRadius: "38px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setShowJobPage(true)}
          >
            Create Jobs
          </button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
