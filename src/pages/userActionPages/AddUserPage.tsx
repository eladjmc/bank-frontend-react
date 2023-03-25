import React, { ChangeEvent, FormEvent, useState } from "react";
import API from "../../services/Api";
import "./AddUserPage.scss";

const AddUserPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [passport, setPassport] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(event.currentTarget); // Get the form data
  
    try {
      setIsLoading(true);
      setMessage("");

      const name = formData.get("name") as string;
      const age = parseInt(formData.get("age") as string);
      const email = formData.get("email") as string;
      const passportID = formData.get("passport") as string;
  
      await API.post("/users", {
        name,
        age,
        email,
        passportID,
      });
      setIsLoading(false);
      setMessage("User was added successfully!");
    } catch (error: any) {
      setIsLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.error;
        setMessage(errorMessage);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="page add-user-page">
      <h1>Add User</h1>
      {isLoading && <h2>Loading..,</h2>}
      {!isLoading && (
        <form onSubmit={handleCreateUser}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
            name="name"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="input"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            min={18}
            id="age"
            name="age"
            className="input"
            value={age}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAge(parseInt(e.target.value))
            }
          />

          <label htmlFor="passport">Passport ID</label>
          <input
          className="input"
            type="text"
            id="passport"
            name="passport"
            value={passport}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassport(e.target.value)
            }
          />

          <input className="submit-btn button1" type="submit" value={"Add User"} />
        </form>
      )}
      {!!message && <h3>{message}</h3>}
    </section>
  );
};

export default AddUserPage;
