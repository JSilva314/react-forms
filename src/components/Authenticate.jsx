import { useState } from "react";

const Authenticate = ({ token }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userName, setUsername] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const authResponse = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((result) => result.json());
      setUsername(authResponse.data.username);
      setSuccessMessage(authResponse.message);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="authenticate stylr">
      <h2>Authenticate</h2>
      <br />
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
      {successMessage && userName && (
        <p>{`User ${userName} has been ${successMessage}`}</p>
      )}
    </div>
  );
};

export default Authenticate;
