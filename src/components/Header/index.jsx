import { signOut } from "@firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/firebase";
import { auth } from "../../fireabase/config";
import { menuSvg, searchSvg, appSvg } from "../constants";
import "./header.css";

const Header = (props) => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <header className="header centerv">
      <div className="left centerv">
        <div className="menu-btn centerhv pointer" onClick={props.toggleMenu}>
          {menuSvg}
        </div>
        <div className="home-icon pointer">
          <img
            src="https://i0.wp.com/www.techbooky.com/wp-content/uploads/2021/05/1200px-Google_Docs_2020_Logo.svg.png?fit=1200%2C1650&ssl=1"
            height="27px"
            width="27px"
            alt=""
          />
        </div>
        <h1 className="md:inline-flex ml-1 text-gray-700 text-2xl pointer">
          Docs
        </h1>
      </div>

      <div
        className="searchbox centerhv items-center px-2 py-3 bg-gray-100 focus-within:text-gray-600 focus-within:shadow-md
      "
      >
        <div className="search-icon centerhv pointer">{searchSvg}</div>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none md:px-5 px-2 border-0 md:flex-grow"
        />
      </div>
      <div className="right centerv">
        <div className="apps-icon centerhv pointer">{appSvg}</div>
        <div className="profile-icon centerhv pointer">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            title={user?.displayName}
            className="cursor-pointer h-8 w-8 rounded-full "
            onClick={() => {
              signOut(auth);
              setUser(null);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
