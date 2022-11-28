import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import "./App.css";

import userValues from "./data.json";

function App() {
  const dayDate = new Date().getDay();
  const daysShorten = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayDateShorten = daysShorten[dayDate];

  const monthTotal = () => {
    let total = userValues
      .map((bill) => bill.amount)
      .reduce((acc, amount) => acc + amount);
    return total;
  };

  return (
    <div className="container">
      <div className="balance">
        <div className="balance-text">
          <p>My balance</p>
          <h2>$921.48</h2>
        </div>
        <div className="balance-logo">
          <img src={logo} alt="" height="35"></img>{" "}
        </div>
      </div>

      <div className="chart">
        <div className="chart-title">
          <h2>Spending - Last 7 days</h2>
        </div>
        <div className="chart-chart">
          {userValues.map((item, index) => {
            //transform the size value in percetage, so if the value increase,
            // it wont broke the screen size
            let amountPercentage = (item.amount * 300) / monthTotal();
            let h = {
              height: amountPercentage + "px",
            };
            return (
              <div className="chart-days" key={index}>
                {dayDateShorten === item.day ? (
                  <div
                    className="chart-candle dayCandle"
                    style={h}
                    key={index + 100}
                  >
                    <p>${item.amount}</p>
                  </div>
                ) : (
                  <div className="chart-candle" style={h} key={index + 100}>
                    <p>${item.amount}</p>
                  </div>
                )}
                <p key={index - 100}>{item.day}</p>
              </div>
            );
          })}
        </div>
        <div className="chart-resume">
          <div className="chart-resume-total">
            <p className="total-text">Total this month</p>
            <p className="total">${monthTotal().toFixed(2)}</p>
          </div>
          <div className="chart-resume-percentage">
            <p className="percentage">+2.4%</p>
            <p className="percentage-text">from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
