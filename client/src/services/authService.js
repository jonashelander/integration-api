// Login request

//Authorization request

//Fetch user data request
export const fetchData = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

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
        throw new Error("Unauthorized: Invalid or expired token");
      }
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data; // Return the fetched responses
  } catch (err) {
    console.error(
      "Error fetching data: ",
      err.message + "öalksdflöasdkjsödklf"
    );
    throw err; // Rethrow the error to handle it in the calling component
  }
};
