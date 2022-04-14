import React, { useState, useEffect, useRef } from "react";
import RegisterAdminModal from "../components/RegisterAdminModal";
import Admin from "../components/Admin";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import {
  getAdmins,
  reset,
  resetAdmins,
  resetWithoutAdmin,
} from "../features/administrators/adminSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { TiArrowDown } from "react-icons/ti";

const Administrators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, singleAdmin, isLoadingGetAll, isError, message } =
    useSelector((state) => state.admin);
  const { admin } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    dispatch(getAdmins());
    return () => {
      dispatch(reset());
      dispatch(resetAdmins());
    };
  }, [admin, navigate, isError, message, dispatch]);

  const page = useRef(null);
  const refReshContainerRef = useRef(null);
  const refreshArrowRef = useRef(null);
  const refreshTextRef = useRef(null);

  useEffect(() => {
    var pStart = { x: 0, y: 0 };
    var pCurrent = { x: 0, y: 0 };
    function swipeStart(e) {
      if (typeof e["targetTouches"] !== "undefined") {
        var touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
      } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
      }
    }

    function swipeEnd() {
      let endedTouch = Math.floor(Math.abs(pStart.y - pCurrent.y));

      if (endedTouch >= 181 && isRefresh) {
        setIsRefreshing(true);
        setTimeout(() => {
          page.current.style.marginTop = `${87}px`;
          refReshContainerRef.current.style.top = `${10}px`;
          refreshTextRef.current.textContent = "Pull Down to Refresh!";
          setIsRefreshing(false);
        }, 1000);
        refreshTextRef.current.textContent = "Refreshing";
        console.log(endedTouch);
        console.log("UPDATE");
        dispatch(resetAdmins());
        dispatch(getAdmins());
        pCurrent = { x: 0, y: 0 };
        pStart = { x: 0, y: 0 };
        setIsRefresh(false);
      } else {
        page.current.style.marginTop = `${87}px`;
        refReshContainerRef.current.style.top = `${10}px`;
      }
    }

    function swipe(e) {
      if (typeof e["changedTouches"] !== "undefined") {
        let touch = e.changedTouches[0];
        pCurrent.x = touch.screenX;
        pCurrent.y = touch.screenY;
      } else {
        pCurrent.x = e.screenX;
        pCurrent.y = e.screenY;
      }
      let changeY = pStart.y < pCurrent.y ? Math.abs(pStart.y - pCurrent.y) : 0;
      if (window.pageYOffset === 0) {
        if (changeY > 110) {
          let initalY = Math.floor(pCurrent.y - pStart.y);
          console.log("refresh");
          if (initalY < 181) {
            page.current.style.marginTop = `${initalY}px`;
            refReshContainerRef.current.style.top = `${initalY - 50}px`;
            refreshArrowRef.current.style.transform = "rotate(0deg)";
            refreshTextRef.current.textContent = "Pull Down to Refresh!";
          }
          if (initalY > 181) {
            refreshTextRef.current.textContent = "Release to Refresh!";
            refreshArrowRef.current.style.transform = "rotate(180deg)";
            setIsRefresh(true);
          }
        }
      }
    }
    document.addEventListener("touchstart", swipeStart, false);
    document.addEventListener("touchmove", swipe, false);
    document.addEventListener("touchend", swipeEnd, false);
    return (_) => {
      console.log("%c CLEAR pull to refresh admin page", "color: cyan;");
      document.removeEventListener("touchstart", swipeStart, false);
      document.removeEventListener("touchmove", swipe, false);
      document.removeEventListener("touchend", swipeEnd, false);
    };
  }, [setIsRefresh, isRefresh, setIsRefreshing, isRefreshing]);

  return (
    <>
      <div ref={refReshContainerRef} className="pull-to-refresh-container">
        <p ref={refreshTextRef}>Pull Down to Refresh!</p>
        <div className="refresh-arrow" ref={refreshArrowRef}>
          {isRefreshing ? (
            <div className="loading">
              <span style={{ "--i": 3 }}>.</span>
              <span style={{ "--i": 2 }}>.</span>
              <span style={{ "--i": 1 }}>.</span>
            </div>
          ) : (
            <TiArrowDown />
          )}
        </div>
      </div>
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
            <button className="filter">
              <FiFilter />
            </button>
            <button className="add" onClick={() => setOpenModal(!openModal)}>
              <IoIosAdd />
            </button>
          </div>
        </div>
        <div className="underline"></div>
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
