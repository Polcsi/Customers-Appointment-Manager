import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkCookieExists } from "../vaidateSession";
// components
import PullToRefresh from "../components/PullToRefresh";
import Spinner from "../components/Spinner";
import Customer from "../components/Customer";
import AddCustomer from "../components/AddCustomer";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomers,
  resetCustomers,
  reset,
  resetDelete,
} from "../features/customers/customerSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    allCustomers,
    isLoading,
    isError,
    message,
    isSuccessDelete,
    isLoadingDelete,
    isErrorDelete,
    messageDelete,
  } = useSelector((state) => state.customer);
  const page = useRef(null);
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [queryObject, setQueryObject] = useState({ sort: "fullname" });
  const [active, setActive] = useState("sort");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("Customer Deleted");
    }
    if (isErrorDelete) {
      toast.error(messageDelete);
    }
    dispatch(resetDelete());
  }, [
    isSuccessDelete,
    isLoadingDelete,
    isErrorDelete,
    messageDelete,
    dispatch,
  ]);

  useEffect(() => {
    if (!checkCookieExists()) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }

    const validateSession = setInterval(() => {
      console.log("check Customer Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    dispatch(getCustomers(queryObject));

    return (_) => {
      dispatch(reset());
      dispatch(resetCustomers());
      clearInterval(validateSession);
    };
  }, [navigate, dispatch, isError, message, queryObject]);

  return (
    <>
      {openAddCustomerModal && (
        <AddCustomer
          openModal={openAddCustomerModal}
          setOpenModal={setOpenAddCustomerModal}
        />
      )}
      <PullToRefresh
        page={page}
        updatedArray={getCustomers}
        resetArray={resetCustomers}
      />
      <div className="dashboard" ref={page}>
        <div className="header">
          <h1>Customers</h1>
          <div className="btns">
            <div className="operation-btn-container search">
              <input
                ref={searchBarRef}
                className="search-bar"
                type="text"
                placeholder="Name"
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
                    searchBarRef.current.style.width = "160px";
                  } else {
                    searchBarRef.current.style.width = "0px";
                  }
                  setShowSearchBar(!showSearchBar);
                }}
              >
                <AiOutlineSearch />
              </button>
            </div>
            <div className="operation-btn-container">
              <button
                className="add"
                type="button"
                onClick={() => setOpenAddCustomerModal(!openAddCustomerModal)}
              >
                <IoIosAdd />
              </button>
            </div>
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
          {isLoading ? (
            <Spinner color="white" top={0} position="relative" />
          ) : (
            ""
          )}
          {allCustomers.length > 0 ? (
            allCustomers.map((customer, index) => {
              return <Customer key={index} {...customer} />;
            })
          ) : (
            <div>Not Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Customers;
