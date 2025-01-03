import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Images/404.png';

const Error = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#080474'
        }}
      >
        <p className="text-2xl md:text-4xl my-2" style={{ color: '#080474' }}>
          Are you lost?
        </p>
        <div className="mt-8 flex justify-center gap-7">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button
              className="mt-6 w-full rounded-[12px] py-[12px] px-[12px] font-medium"
              style={{ backgroundColor: "#080474", border: "2px solid #080474", color: "#fff", cursor: "pointer" }}
            >
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={backgroundImage}
          alt="Error 404"
          style={{
            maxHeight: "500px",
            maxWidth: "100%",
            width: "auto",
            display: "block"
          }}
        />
      </div>
    </div>
  );
};

export default Error;
