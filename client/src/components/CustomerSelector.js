import React, { useState, useEffect } from "react";
// componenets
import Spinner from "./Spinner";
// icons
import times from "../assets/times.svg";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomers,
  reset,
  resetCustomers,
} from "../features/customers/customerSlice";
import { toast } from "react-toastify";

const CustomerSelector = ({ setOpenCustomer, handleChange, setName }) => {
  const dispatch = useDispatch();
  const { allCustomers, isSucccess, isLoading, isError } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isError) {
      toast.error("Failed To Get Customers");
    }
    dispatch(getCustomers());

    return () => {
      dispatch(reset());
      dispatch(resetCustomers());
    };
  }, [dispatch, isSucccess, isError]);

  return (
    <div className="overlay">
      <div className="overlay-container customer-selector">
        <button
          className="close-overlay"
          onClick={() => setOpenCustomer(false)}
        >
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select customer</h2>
        </div>
        <div className="customer-list">
          {isLoading ? (
            <Spinner top={0} color="white" />
          ) : (
            allCustomers.map((customer) => {
              const { fullname, _id } = customer;
              return (
                <article
                  key={_id}
                  onClick={() => {
                    handleChange("customer", _id);
                    setName(fullname);
                    setOpenCustomer(false);
                  }}
                >
                  {fullname}
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSelector;
