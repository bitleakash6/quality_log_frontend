import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Typewriter from "typewriter-effect";
import axios from "axios";
import "../Style/filter.css";

const Filter = () => {
  const location = useLocation();
  const username = location.state?.name;

  const [data, setData] = useState([]);
  const [greeting, setGreeting] = useState("");

  const [formData, setFormData] = useState({
    level: "",
    log_string: "",
    startDate: "",
    endDate: "",
  });

  const handleReset = () => {
    setFormData({
      level: "",
      log_string: "",
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    const getGreeting = () => {
      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        return "Good morning";
      } else if (currentTime >= 12 && currentTime < 17) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    setGreeting(getGreeting());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quality-log-backend.onrender.com/level/",
        formData
      );

      setData(response.data);
    } catch (error) {
      console.error("Error:", error.log_string);
    }
  }, [formData]);

  return (
    <div
      className="filter-top"
      style={{
        color: "white",
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="filter-type"
        style={{
          position: "relative",
          top: "100px",
          marginInlineStart: "380px",
          fontSize: "50px",
          marginInline: "200px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "25px", color: "white" }}>
          {greeting} <span style={{ color: "red" }}> {username} </span>!
        </div>
        <div>
          <Typewriter
            options={{
              strings: ["Simple Query Interface", "Efficient Log Ingestor"],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 100,
            }}
          />
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "white",
            marginBlockStart: "20px",
          }}
        >
          Filtering Your Logs: Quick and Seamless
        </div>
      </div>
      <form
        className="filter-input"
        style={{
          position: "relative",
          top: "120px",
          height: "max-content",
          backgroundColor: "#1f1f1f",
          marginInline: "90px",
          color: "black",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          placeholder="Level"
        />
        <input
          type="text"
          name="log_string"
          value={formData.log_string}
          onChange={handleInputChange}
          placeholder="Log_String"
        />
        <div>
          <span style={{ color: "white" }}>Search From</span>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            placeholder="Start Date"
          />
          <span style={{ color: "white" }}> To</span>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            placeholder="End Date"
          />
        
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              border: "none",
              padding: "10px",
              float: "right",
              fontSize: "15px",
              backgroundColor: "white",
              borderRadius: "10px",
              fontFamily: "Montserrat",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginLeft: "10px",
              border: "none",
              padding: "10px",
              float: "right",
              fontSize: "15px",
              backgroundColor: "white",
              borderRadius: "10px",
              fontFamily: "Montserrat",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {data.length === 0 ? (
        <></>
      ) : (
        <>
          <div
            className="filter-input"
            style={{
              position: "relative",
              top: "140px",
              height: "max-content",
              backgroundColor: "#1f1f1f",
              marginInline: "90px",
              color: "black",
              padding: "10px",
            }}
          >
            <div style={{ marginInline: "20px", color: "white" }}>
              {data.length} results found
            </div>

            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  margin: "20px",
                  backgroundColor: "white",
                  height: "max-content",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    lineHeight: "25px",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    <span className="log-title">Level: </span>
                    {item.level}
                  </div>
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    <span className="log-title">Log_String: </span>
                    {item.log_string}
                  </div>
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    <span className="log-title">Time Stamp: </span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }).format(new Date(item.timestamp))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
