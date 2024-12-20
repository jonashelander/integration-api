import React from "react";

function VerifyUser({ verifyUser, onInputChange }) {
  return (
    <div>
      <h2>Verifyuser</h2>
      {Object.keys(verifyUser).map((key) => (
        <div key={key}>
          <p>{key}</p>
          <input
            type="text"
            value={verifyUser[key]}
            placeholder={key}
            onChange={(e) => onInputChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default VerifyUser;
