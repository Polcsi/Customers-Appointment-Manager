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
import { FiFilter } from "react-icons/fi";

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

    dispatch(getCustomers());

    return (_) => {
      dispatch(reset());
      dispatch(resetCustomers());
      clearInterval(validateSession);
    };
  }, [navigate, dispatch, isError, message]);

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
            <button className="filter">
              <FiFilter />
            </button>
            <button
              className="add"
              onClick={() => setOpenAddCustomerModal(!openAddCustomerModal)}
            >
              <IoIosAdd />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="appointments-container">
          {isLoading ? (
            <Spinner color="white" top={0} position="relative" />
          ) : (
            ""
          )}
          {allCustomers.map((customer, index) => {
            return <Customer key={index} {...customer} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Customers;
