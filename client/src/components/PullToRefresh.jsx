import React, { useState, useEffect, useRef } from "react";
import { TiArrowDown } from "react-icons/ti";
import { useDispatch } from "react-redux";

const PullToRefresh = ({
  page,
  updatedArray = null,
  resetArray = null,
  queryObject = null,
}) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refReshContainerRef = useRef(null);
  const refreshArrowRef = useRef(null);
  const refreshTextRef = useRef(null);
  const dispatch = useDispatch();

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
        if (updatedArray.length > 1) {
          updatedArray.forEach((array) => {
            dispatch(array());
          });
        } else {
          resetArray && dispatch(resetArray());
          updatedArray && dispatch(updatedArray(queryObject));
        }

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
      document.removeEventListener("touchstart", swipeStart, false);
      document.removeEventListener("touchmove", swipe, false);
      document.removeEventListener("touchend", swipeEnd, false);
    };
  }, [
    queryObject,
    setIsRefresh,
    isRefresh,
    setIsRefreshing,
    isRefreshing,
    page,
    dispatch,
    resetArray,
    updatedArray,
  ]);

  return (
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
  );
};

export default PullToRefresh;
