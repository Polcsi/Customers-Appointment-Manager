import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
// icons
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import times from "../assets/times.svg";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomer,
  resetUpdate,
  resetGet,
  resetSingleCustomer,
  getSingleCustomer,
} from "../features/customers/customerSlice";
// components
import Spinner from "./Spinner";
import InputModal from "./InputModal";

const UpdateCustomer = ({
  openModal,
  setOpenModal,
  id,
  openedOverLay = null,
  setOpenedOverlay = null,
}) => {
  const dispatch = useDispatch();
  const {
    isErrorUpdate,
    isSuccessUpdate,
    isSuccessGet,
    messageUpdate,
    isLoadingUpdate,
    isLoadingGet,
    singleCustomer,
  } = useSelector((state) => state.customer);

  const updatingCustomer = () => {
    dispatch(updateCustomer(customerData));
  };

  const [customerData, setCustomerData] = useState({
    firstname: "",
    lastname: "",
    town: "",
    email: "",
    phone: "",
    id: "",
  });
  const [placeholders, setPlaceholders] = useState({
    firstname: "No Firstname",
    lastname: "No Last Name",
    town: "No Town",
    email: "No Email Address",
    phone: "No Phone Number",
  });
  const [openFirstname, setOpenFirstname] = useState(false);
  const [openLastname, setOpenLastname] = useState(false);
  const [openTown, setOpenTown] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [renderOnce, setRenderOnce] = useState(true);

  const close = useCallback(() => {
    dispatch(resetSingleCustomer());
    dispatch(resetGet());
    dispatch(resetUpdate());
    if (openedOverLay || setOpenedOverlay) {
      setOpenedOverlay(!openedOverLay);
    }
    setOpenModal(!openModal);
  }, [setOpenModal, openModal, setOpenedOverlay, openedOverLay]);

  const changeCustomerData = useCallback(
    (name, value) => {
      setCustomerData({ ...customerData, [name]: value });
    },
    [setCustomerData, customerData]
  );
  const changePlacehoderData = (name, value) => {
    if (value.length === 0) {
      value = "REQUIRED";
    }
    if (value.length > 15) {
      let str = value.substring(0, 15);
      value = `${str}...`;
    }
    setPlaceholders({ ...placeholders, [name]: value });
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success("Customer Updated");
      dispatch(resetUpdate());
      close();
    }
    if (isErrorUpdate) {
      toast.error(messageUpdate);
      dispatch(resetUpdate());
    }
    if (singleCustomer === null) {
      dispatch(getSingleCustomer(id));
    }
    if (isSuccessGet && renderOnce) {
      setCustomerData((prevState) => {
        return {
          ...prevState,
          firstname: singleCustomer.firstname,
          lastname: singleCustomer.lastname,
          town: singleCustomer.town,
          email: singleCustomer.email,
          phone: singleCustomer.phone,
          id: id,
        };
      });
      setPlaceholders((prevState) => {
        return {
          ...prevState,
          firstname: singleCustomer.firstname,
          lastname: singleCustomer.lastname,
          town: singleCustomer.town,
          email:
            singleCustomer.email.length > 15
              ? `${singleCustomer.email.substring(0, 15)}...`
              : singleCustomer.email,
          phone: singleCustomer.phone,
        };
      });
      setRenderOnce(() => {
        return false;
      });
    }

    return (_) => {};
  }, [
    dispatch,
    id,
    isSuccessGet,
    isErrorUpdate,
    isSuccessUpdate,
    messageUpdate,
    singleCustomer,
    renderOnce,
    close,
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return (_) => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isSuccessGet) {
    return (
      <>
        <div className="addModal">
          {openFirstname && (
            <InputModal
              type={"firstname"}
              close={setOpenFirstname}
              handleChange={changeCustomerData}
              changePlaceholder={changePlacehoderData}
              placeholderValue={customerData.firstname}
            />
          )}
          {openLastname && (
            <InputModal
              type={"lastname"}
              close={setOpenLastname}
              handleChange={changeCustomerData}
              changePlaceholder={changePlacehoderData}
              placeholderValue={customerData.lastname}
            />
          )}
          {openTown && (
            <InputModal
              type={"town"}
              close={setOpenTown}
              handleChange={changeCustomerData}
              changePlaceholder={changePlacehoderData}
              placeholderValue={customerData.town}
            />
          )}
          {openEmail && (
            <InputModal
              type={"email"}
              close={setOpenEmail}
              handleChange={changeCustomerData}
              changePlaceholder={changePlacehoderData}
              placeholderValue={customerData.email}
            />
          )}
          {openPhone && (
            <InputModal
              type={"phone"}
              close={setOpenPhone}
              handleChange={changeCustomerData}
              changePlaceholder={changePlacehoderData}
              placeholderValue={customerData.phone}
            />
          )}
          <div className="modal-header">
            <button type="button">
              <img
                src={times}
                alt="times"
                onClick={() => {
                  document.body.style.overflow = "auto";
                  close();
                }}
              />
            </button>
            <h1>Update Customer</h1>
            <button type="button" onClick={() => updatingCustomer()}>
              <MdDone />
            </button>
          </div>
          {isLoadingUpdate && <Spinner color="white" top={0} />}
          <div className="modal-inputs">
            <div className="input" onClick={() => setOpenFirstname(true)}>
              <div className="title">first name</div>
              <div>
                <span>{placeholders.firstname}</span>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="input" onClick={() => setOpenLastname(true)}>
              <div className="title">last name</div>
              <div>
                <span>{placeholders.lastname}</span>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="input" onClick={() => setOpenTown(true)}>
              <div className="title">town</div>
              <div>
                <span>{placeholders.town}</span>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="input" onClick={() => setOpenEmail(true)}>
              <div className="title">email address</div>
              <div>
                <span>{placeholders.email}</span>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="input" onClick={() => setOpenPhone(true)}>
              <div className="title">phone number</div>
              <div>
                <span>{placeholders.phone}</span>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="addModal">
          <div className="modal-header">
            <button type="button">
              <img
                src={times}
                alt="times"
                onClick={() => {
                  document.body.style.overflow = "auto";
                  close();
                }}
              />
            </button>
            <h1>Add Administrator</h1>
            <button type="button" onClick={() => updatingCustomer()}>
              <MdDone />
            </button>
          </div>
          {isLoadingGet && <Spinner color="white" top={0} />}
          <div className="modal-inputs"></div>
        </div>
      </>
    );
  }
};

export default UpdateCustomer;
