// Login request

//Authorization request

//Fetch user data request
export const fetchData = async (token) => {
  try {
    if (!token) {
      console.error("No token provided")
    }

  } catch (err) { console.error("No token providedqwer") }

  try {
    const res = await fetch("http://localhost:5000/api/responses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized: Invalid or expired token")
      }
      console.error("Unauthorized: Invalid or expired token")
    }

    const data = await res.json();
    return data; // Return the fetched responses
  } catch (err) {
    console.error(
      "Error fetching data: ",
      err.message
    );
    throw err; // Rethrow the error to handle it in the calling component
  }
};
