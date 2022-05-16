import React, { useState, useEffect, useRef } from "react";
import { checkCookieExists } from "../vaidateSession";
import RegisterAdminModal from "../components/RegisterAdminModal";
import Admin from "../components/Admin";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PullToRefresh from "../components/PullToRefresh";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import {
  getAdmins,
  reset,
  resetAdmins,
} from "../features/administrators/adminSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

const Administrators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, singleAdmin, isLoadingGetAll, isError, message } =
    useSelector((state) => state.admin);
  const { admin } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef(null);
  const [queryObject, setQueryObject] = useState({ sort: "fullname" });
  const [active, setActive] = useState("sort");

  useEffect(() => {
    if (isError) {
      console.log(message);
      if (message.includes(",")) {
        let messages = message.split(",");
        messages.forEach((element) => {
          toast.error(element);
        });
      } else {
        toast.error(message);
      }
    }
    if (!admin) {
      navigate("/login");
    }

    const validateSession = setInterval(() => {
      console.log("check Administrator Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    dispatch(getAdmins(queryObject));

    return () => {
      dispatch(reset());
      dispatch(resetAdmins());
      clearInterval(validateSession);
    };
  }, [admin, navigate, isError, message, dispatch, queryObject]);

  const page = useRef(null);

  return (
    <>
      <PullToRefresh
        page={page}
        updatedArray={getAdmins}
        resetArray={resetAdmins}
      />
      <div className="dashboard" ref={page}>
        {openModal ? (
          <RegisterAdminModal
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : (
          ""
        )}
        <div className="header">
          <h1>Administrators</h1>
          <div className="btns">
            <div className="operation-btn-container search">
              <input
                type="text"
                className="search-bar"
                placeholder="Fullname"
                ref={searchBarRef}
                onChange={(e) => {
                  setQueryObject({
                    ...queryObject,
                    fullname: `${e.target.value}`,
                  });
                }}
              />
              <button
                className="filter"
                type="button"
                onClick={() => {
                  if (!showSearchBar) {
                    searchBarRef.current.focus();
                    searchBarRef.current.style.width = "300%";
                  } else {
                    searchBarRef.current.style.width = "0%";
                  }
                  setShowSearchBar(!showSearchBar);
                }}
              >
                <AiOutlineSearch />
              </button>
            </div>
            <button className="add" onClick={() => setOpenModal(!openModal)}>
              <IoIosAdd />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="filter-container">
          <button
            type="button"
            className={`filter-btns ${
              active === "sort" ? "active" : "inactive"
            }`}
            onClick={() => {
              delete queryObject.sortdesc;
              setQueryObject({ ...queryObject, sort: "fullname" });
              setActive("sort");
            }}
          >
            A-z fullname
          </button>
          <button
            type="button"
            className={`filter-btns ${
              active === "desort" ? "active" : "inactive"
            }`}
            onClick={() => {
              delete queryObject.sort;
              setQueryObject({ ...queryObject, sortdesc: "fullname" });
              setActive("desort");
            }}
          >
            Z-a fullname
          </button>
        </div>
        <div className="appointments-container">
          {isLoadingGetAll && singleAdmin === null ? (
            <Spinner color="white" top={0} />
          ) : (
            ""
          )}

          {admins.map((admin) => {
            const { _id, fullname, privilege } = admin;
            return (
              <Admin
                key={_id}
                fullname={fullname}
                detail={privilege}
                admin={admin}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Administrators;
