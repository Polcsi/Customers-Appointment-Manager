import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
// components
import InputModal from "./InputModal";
import Spinner from "./Spinner";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { addCustomer, resetAdd } from "../features/customers/customerSlice";
// icons
import times from "../assets/times.svg";
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";

const AddCustomer = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const { isErrorAdd, isSuccessAdd, messageAdd, isLoadingAdd } = useSelector(
    (state) => state.customer
  );

  const addingCustomer = () => {
    dispatch(addCustomer(customerData));
  };

  const [customerData, setCustomerData] = useState({
    firstname: "",
    lastname: "",
    town: "",
    email: "",
    phone: "",
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

  const close = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal, setOpenModal]);

  const changeCustomerData = (name, value) => {
    setCustomerData({ ...customerData, [name]: value });
  };
  const changePlacehoderData = (name, value) => {
    if (value.length === 0) {
      value = "REQUIRED";
    }
    if (value.length > 17) {
      let str = value.substring(0, 16);
      value = `${str}...`;
    }
    setPlaceholders({ ...placeholders, [name]: value });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return (_) => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (isSuccessAdd) {
      toast.success("Customer Created");
      close();
    }
    if (isErrorAdd) {
      if (messageAdd.includes(",")) {
        let errorMessages = messageAdd.split(",");
        errorMessages.forEach((err) => {
          toast.error(err);
        });
      } else {
        toast.error(messageAdd);
      }
    }
    return (_) => {
      dispatch(resetAdd());
    };
  }, [dispatch, close, isLoadingAdd, isErrorAdd, isSuccessAdd, messageAdd]);

  return (
    <>
      <div className="addModal">
        {openFirstname && (
          <InputModal
            type={"firstname"}
            inputPlaceHolder="Noah, Emma..."
            close={setOpenFirstname}
            handleChange={changeCustomerData}
            changePlaceholder={changePlacehoderData}
            placeholderValue={customerData.firstname}
          />
        )}
        {openLastname && (
          <InputModal
            type={"lastname"}
            inputPlaceHolder="Johnson, Brown..."
            close={setOpenLastname}
            handleChange={changeCustomerData}
            changePlaceholder={changePlacehoderData}
            placeholderValue={customerData.lastname}
          />
        )}
        {openTown && (
          <InputModal
            type={"town"}
            inputPlaceHolder="Budapest, Berlin, Madrid..."
            close={setOpenTown}
            handleChange={changeCustomerData}
            changePlaceholder={changePlacehoderData}
            placeholderValue={customerData.town}
          />
        )}
        {openEmail && (
          <InputModal
            type={"email"}
            inputPlaceHolder="emmabrown@onlinemail.com"
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
          <h1>Add Customer</h1>
          <button type="button" onClick={() => addingCustomer()}>
            <MdDone />
          </button>
        </div>
        {isLoadingAdd && <Spinner color="white" top={0} />}
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
};

export default AddCustomer;
