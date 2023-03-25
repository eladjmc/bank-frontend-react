/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ChangeEvent, useState } from "react";
import API from "../services/Api";
import "./UserPage.scss";
import { useNavigate } from "react-router-dom";
import { Pages } from "../constants/pages";

const UserPage = () => {
  const [passportInput, setPassportInput] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [currentUserPassport, setCurrentUserPassport] = useState<string>("");
  
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleRedirectToPage = (page: string) => {
    navigate(`/${page}/${userId}`);
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const result = await API.delete(`/users/${userId}`)
      setCurrentUserPassport("");
      setUserId("");
      setPassportInput("");
      setMessage(result.data.data)
      setUserName("");
      setIsLoading(false);
    } catch (error) {
      setMessage("Error - User Could not be deleted")
      setIsLoading(false);
    }
  }

  const handleAddAccount = async () => {
    try {
      setIsLoading(true);
      const result = await API.post(`/accounts`,{passportID: currentUserPassport})
      setMessage(result.data.data)
      setIsLoading(false);
    } catch (error) {
      setMessage("Error - Account can't be added")
      setIsLoading(false);
    }
  }
 
  const handleGetUser = async () => {
    try {
      setCurrentUserPassport("");
      setMessage("");
      setUserName("");
      setUserId("");
      setIsLoading(true);
      const result = await API.get("/users/getUserByQuery", {
        params: { passportID: passportInput },
      });
      const data = result.data.data[0];
      setUserId(data.id);
      setUserName(data.name);
      setCurrentUserPassport(passportInput);
      setIsLoading(false);
    } catch (error) {
      setUserName("User Does Not Exist");
      setIsLoading(false);
    }
  };

  return (
    <section className="user-page page">
      <div className="form-container">
        <div className="input-container">
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="id"
              name="id"
              id="passport-id"
              required
              value={passportInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassportInput(e.target.value)
              }
            />
            <label htmlFor="id" className="form__label">
              Passport ID
            </label>
          </div>
        </div>
        <a onClick={handleGetUser} className="button1">
          Get user
        </a>
      </div>
      <div className="user-actions-container">
        {isLoading && <h3> Loading...</h3>}
        <h3>{userName}</h3>
        {!!userId && (
          <div className="btn-container">
            <a onClick={()=>handleRedirectToPage(Pages.getInfo)} className="button1">
              User Information
            </a>
            <a onClick={()=>handleRedirectToPage(Pages.depositCash)}  className="button1">
              Deposit Cash
            </a>
            <a onClick={()=>handleRedirectToPage(Pages.withdrawCash)} className="button1">
              Withdraw Cash
            </a>
            <a onClick={()=>handleRedirectToPage(Pages.updateCredit)} className="button1">
              Update Credit
            </a>
            <a onClick={()=>handleRedirectToPage(Pages.transferCash)} className="button1">
              Transfer Cash
            </a>
            <a onClick={handleAddAccount}  className="button1">
              Add Account
            </a>
            <a onClick={handleDeleteUser} className="button1">
              Delete User
            </a>
          </div>
        )}
        <h3>{message}</h3>
      </div>
    </section>
  );
};

export default UserPage;
