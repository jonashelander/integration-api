import { useEffect, useState } from 'react';
import './App.css';
import VerifyUser from './responses/VerifyUser';

function App() {
  const [responses, setResponses] = useState({
    verifyUser: {},
    authorize: {},
    transfer: {},
    cancel: {},h
  });

  const handleChangeInput = (field, value) => {
    setResponses((prevState) => ({
      ...prevState,
      verifyUser: {
        ...prevState.verifyUser,
        [field]: value,
      },
    }));
  };

  const responseUrl = "http://localhost:5000/api/responses";
  useEffect(() => {
    fetch(responseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponses(data);
      });
  }, []);

  return (
    <div className="App">
      <VerifyUser
        verifyUser={responses.verifyUser}
        onInputChange={handleChangeInput}
      />
      <button
        onClick={console.log("Hello")}
      >
        SAVE
      </button>
    </div>
  );
}

export default App;
