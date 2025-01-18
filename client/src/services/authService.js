// Login
export const handleLogin = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid username or password");
      }
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the backend responds with a token
    if (data.token) {
      localStorage.setItem("token", data.token); // Save the token in localStorage
      
      return { success: true, token: data.token }; // Return success status and the token
    } else {
      throw new Error("Login successful, but no token provided in the response");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return { success: false, error: error.message }; // Return failure status and error message
  }
};


//Auth Token
export const validateToken = async (token) => {
  if (!token) {
    console.error("No token provided");
    throw new Error("No token provided");
  }

  try {
    const res = await fetch("http://localhost:5000/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log("res not ok");
      if (res.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        throw new Error("Unauthorized: Invalid or expired token");
      }
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data; // Return the fetched responses
  } catch (err) {
    console.error("Error fetching data: ", err.message);
    throw err; // Rethrow the error to handle it in the calling component
  }
};

/* export const validateToken = async (token) => {
  if (!token) {
    console.warn("No token provided");
    return { valid: false, message: "No token provided" };
  }

  try {
    const response = await fetch("http://localhost:5000/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle response errors
    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized: Invalid or expired token");
        return { valid: false, message: "Invalid or expired token" };
      }
      console.error(`HTTP error: ${response.status}`);
      return { valid: false, message: `HTTP error: ${response.status}` };
    }

    // Parse response JSON
    const data = await response.json();
    return { valid: true, user: data.user }; // Assuming the user info is included in the response
  } catch (error) {
    console.error("Error validating token: ", error.message);
    return {
      valid: false,
      message: "An error occurred while validating the token",
    };
  }
}; */

//Fetch user data
export const fetchData = async (token) => {
  try {
    if (!token) {
      console.error("No token provided");
    }
  } catch (err) {
    console.error("No token providedqwer");
  }

  try {
    const res = await fetch("http://localhost:5000/api/responses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
      }
      console.error("Unauthorized: Invalid or expired token");
    }

    const data = await res.json();
    return data; // Return the fetched responses
  } catch (err) {
    console.error("Error fetching data: ", err.message);
    throw err; // Rethrow the error to handle it in the calling component
  }
};
