import React, { useState } from "react";
import { Link } from "react-router-dom";
// Icons
import { BsFillPersonFill, BsPeople } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineFieldTime, AiOutlineHome } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handlingNavClasses = () => {
    let classes = "navbar";
    if (showLinks) {
      classes += " show";
      document.body.classList.add("disabledScroll");
    } else {
      document.body.classList.remove("disabledScroll");
    }
    return classes;
  };

  return (
    <nav className={handlingNavClasses()}>
      <div className="content">
        <div className="nav-header">
          <div className="profile-picture">
            <BsFillPersonFill />
          </div>
          <h3 className="greeting">Hi</h3>
          <h3 className="actual-user">Pollák Bence</h3>
        </div>
        <div
          className={
            showLinks ? "icon cancel-btn show" : "icon cancel-btn hide"
          }
        >
          <FaTimes onClick={() => setShowLinks(false)} />
        </div>
        <div
          className={showLinks ? "icon menu-btn hide" : "icon menu-btn show"}
        >
          <BiMenuAltRight onClick={() => setShowLinks(true)} />
        </div>
        <ul className="menu-list">
          <li>
            <Link
              className="nav-link"
              to="/"
              onClick={() => setShowLinks(false)}
            >
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/customers"
              onClick={() => setShowLinks(false)}
            >
              <BsPeople /> Customers
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/administrators"
              onClick={() => setShowLinks(false)}
            >
              <RiAdminLine /> Administrators
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/appointments"
              onClick={() => setShowLinks(false)}
            >
              <AiOutlineFieldTime /> All Appointments
            </Link>
          </li>
          <li>
            <button className="nav-link" onClick={() => setShowLinks(false)}>
              <MdOutlineLogout /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
