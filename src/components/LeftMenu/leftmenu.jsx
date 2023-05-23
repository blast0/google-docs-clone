import React from "react";
import "./leftmenu.css";

const Leftmenu = () => {
  return (
    <div className="leftmenu ">
      <div></div>
      <div className="menu-home">
        <div className="item google-docs-icon">
          <img
            className="google-image"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c51f.png"
            alt=""
          />
          <h2 className="md:inline-flex ml-2 text-gray-700 text-2xl pointer">
            Docs
          </h2>
        </div>
      </div>
      <div className="menu-apps">
        <div
          className="menu-docs"
          style={{
            marginTop: "12px",
          }}
        >
          <img
            className="docs-image"
            src="https://i0.wp.com/www.techbooky.com/wp-content/uploads/2021/05/1200px-Google_Docs_2020_Logo.svg.png?fit=1200%2C1650&ssl=1"
            height="16px"
            width="16px"
            alt=""
          />
          Docs
        </div>
        <div className="menu-sheets">
          <img
            height="16px"
            width="16px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWkrBZeUL0wODCW5SAEPfLqp_8ViBrcyvhOmAAD4-g6BjfSC-Y9Fb8_jHG7AyvDS9iaA&usqp=CAU"
            alt=""
          />
          Sheets
        </div>
        <div className="menu-slides">
          <img
            height="16px"
            width="16px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Google_Slides_2020_Logo.svg/1489px-Google_Slides_2020_Logo.svg.png"
            alt=""
          />
          Slides
        </div>
        <div className="menu-forms">
          <img
            height="16px"
            width="16px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Forms_2020_Logo.svg/1489px-Google_Forms_2020_Logo.svg.png"
            alt=""
          />
          Forms
        </div>
      </div>
      <div className="menu-config">
        <div
          className="menu-settings"
          style={{
            marginTop: "12px",
          }}
        >
          <img
            height="20px"
            width="25px"
            src="https://static.thenounproject.com/png/1524589-200.png"
            alt=""
          />
          Settings
        </div>
        <div className="menu-help">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#3c4043"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#3c4043"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          Help & Feedback
        </div>
      </div>
      <div className="drive-section">
        <div
          className="menu-drive"
          style={{
            marginTop: "12px",
            marginBottom: "12px",
          }}
        >
          <img
            width="35px"
            height="35px"
            src="https://logos-world.net/wp-content/uploads/2020/11/Google-Drive-Logo.png"
            alt=""
          />
          Drive
        </div>
      </div>
      <div className="policy">
        <a href="#">Privacy Policy</a>•<a href="#">Terms of Service</a>
      </div>
    </div>
  );
};

export default Leftmenu;
