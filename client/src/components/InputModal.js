import React, { useState, useRef, useEffect } from "react";
import times from "../assets/times.svg";

const InputModal = ({
  type,
  close,
  handleChange,
  changePlaceholder,
  placeholderValue,
}) => {
  const [input, setInput] = useState(placeholderValue);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 1; i < 4; ++i) {
      if (e.target[i].checked) {
        handleChange(type, e.target[i].value);
        changePlaceholder(type, e.target[i].value);
      }
    }
    close(false);
  };

  const saveData = () => {
    handleChange(type, input);
    changePlaceholder(type, input);
    close(false);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  if (type === "privilege") {
    return (
      <div className="overlay">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="overlay-container overlay-input"
        >
          <button
            type="button"
            className="close-overlay"
            onClick={() => close(false)}
          >
            <img src={times} alt="close" />
          </button>
          <div className="header">
            <h2>add {type}</h2>
          </div>
          <div className="overlay-body radio-container" ref={inputRef}>
            <div className="input-radio">
              <input
                type="radio"
                value="owner"
                id="owner"
                name="privilege"
                checked={input === "owner" ? true : false}
                onChange={(e) => setInput(e.target.value)}
              />
              <label htmlFor="owner">owner</label>
            </div>
            <div className="input-radio">
              <input
                type="radio"
                value="admin"
                id="admin"
                name="privilege"
                checked={input === "admin" ? true : false}
                onChange={(e) => setInput(e.target.value)}
              />
              <label htmlFor="admin">admin</label>
            </div>
            <div className="input-radio">
              <input
                type="radio"
                value="member"
                id="member"
                name="privilege"
                checked={input === "member" ? true : false}
                onChange={(e) => setInput(e.target.value)}
              />
              <label htmlFor="member">member</label>
            </div>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay"
              onClick={() => close(false)}
            >
              cancel
            </button>
            <button type="submit" className="btn-overlay">
              save
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="overlay">
        <div className="overlay-container overlay-input">
          <button className="close-overlay" onClick={() => close(false)}>
            <img src={times} alt="close" />
          </button>
          <div className="header">
            <h2>add {type}</h2>
          </div>
          <div className="overlay-body">
            <input
              className="text-field"
              type={type === "password" ? "password" : "text"}
              name={type}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              ref={inputRef}
              value={input}
              autoComplete="off"
            />
          </div>
          <div className="overlay-footer">
            <button className="btn-overlay" onClick={() => close(false)}>
              cancel
            </button>
            <button className="btn-overlay" onClick={() => saveData()}>
              save
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default InputModal;
