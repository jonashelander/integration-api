import React from "react";

function VerifyUser({ verifyUser, onInputChange }) {
  return (
    <div>
      <h2>Verify User</h2>
      <div>
        <p>Firstname</p>
        <input
          type="text"
          value={verifyUser.firstName}
          placeholder="Firstname"
          onChange={(e) => onInputChange("firstName", e.target.value)}
        />
      </div>
      <div>
        <p>Lastname</p>
        <input
          type="text"
          value={verifyUser.lastName}
          placeholder="Lastname"
          onChange={(e) => onInputChange("lastName", e.target.value)}
        />
      </div>
      <div>
        <p>User ID</p>
        <input
          type="text"
          value={verifyUser.userId}
          placeholder="User ID"
          onChange={(e) => onInputChange("userId", e.target.value)}
        />
      </div>
      <div>
        <p>Success</p>
        <input
          type="text"
          value={verifyUser.success}
          placeholder="Success"
          onChange={(e) => onInputChange("success", e.target.value)}
        />
      </div>
      <div>
        <p>KYC Status</p>
        <input
          type="text"
          value={verifyUser.kycStatus}
          placeholder="KYC Status"
          onChange={(e) => onInputChange("kycStatus", e.target.value)}
        />
      </div>
      <div>
        <p>City</p>
        <input
          type="text"
          value={verifyUser.city}
          placeholder="City"
          onChange={(e) => onInputChange("city", e.target.value)}
        />
      </div>
      <div>
        <p>Country</p>
        <input
          type="text"
          value={verifyUser.country}
          placeholder="Country"
          onChange={(e) => onInputChange("country", e.target.value)}
        />
      </div>
      <div>
        <p>Email</p>
        <input
          type="text"
          value={verifyUser.email}
          placeholder="Email"
          onChange={(e) => onInputChange("email", e.target.value)}
        />
      </div>
      <div>
        <p>Date of Birth</p>
        <input
          type="text"
          value={verifyUser.dob}
          placeholder="Date of Birth"
          onChange={(e) => onInputChange("dob", e.target.value)}
        />
      </div>
      <div>                                   
        <p>Balance</p>
        <input
          type="text"
          value={verifyUser.balance}
          placeholder="Balance"
          onChange={(e) => onInputChange("balance", e.target.value)}
        />
      </div>
      <div>
        <p>Currency</p>
        <input
          type="text"
          value={verifyUser.balanceCy}
          placeholder="Currency"
          onChange={(e) => onInputChange("balanceCy", e.target.value)}
        />
      </div>
      <div>
        <p>Locale</p>
        <input
          type="text"
          value={verifyUser.locale}
          placeholder="Locale"
          onChange={(e) => onInputChange("locale", e.target.value)}
        />
      </div>
    </div>
  );
}

export default VerifyUser;
