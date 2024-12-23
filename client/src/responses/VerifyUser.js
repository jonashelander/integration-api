import React from "react";

const VerifyUser = React.memo(({ verifyUser, onInputChange }) => {
  return (
    <div>
      <h2>Verify User</h2>
      {Object.keys(verifyUser).map((key) => (
        <div key={key}>
          <p>{key}</p>
          <input
            type="text"
            value={verifyUser[key] || ""}
            placeholder={key}
            onChange={(e) => onInputChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
});

export default VerifyUser;
