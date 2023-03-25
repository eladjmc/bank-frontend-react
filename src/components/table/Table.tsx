import React, { useState } from "react";
import "./Table.scss";
import { TABLE_HEADERS } from "../../constants/tableHeaders";
import API from "../../services/Api";
import { useNavigate } from "react-router";
import { Pages } from "../../constants/pages";

export interface Account {
  _id: string;
  cash: number;
  credit: number;
}
export interface UserDataStructure {
  _id: string;
  name: string;
  age: number;
  passportID: string;
  totalCash: number;
  totalCredit: number;
  email: string;
  accounts: Account[];
}

export interface TableProps {
  users: UserDataStructure[];
  setGetUsers: (value:boolean)=>void;
}

const Table = ({ users , setGetUsers: setGetUsersList}: TableProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleRedirectToPage = (page: string,userId:string) => {
    navigate(`/${page}/${userId}`);
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      setIsLoading(true);

      const result = await API.delete(`/users/${userId}`);

      setMessage(result.data.data);
      setIsLoading(false);
      setGetUsersList(true)
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* need to add spinner */}
      {isLoading && <h2>I'm a Spinner</h2>}
      {!!message && <h2>{message}</h2>}
      {!isLoading && !message && (
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                {TABLE_HEADERS.map((title, index) => {
                  return <th key={index}>{title}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.passportID}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.totalCash}</td>
                    <td>{user.totalCredit}</td>
                    <td>{user.accounts.length}</td>
                    <td>
                      <button onClick={() => handleRedirectToPage(Pages.depositCash,user._id)}>Deposit</button>
                    </td>
                    <td>
                      <button onClick={() => handleRedirectToPage(Pages.withdrawCash,user._id)}>Withdraw</button>
                    </td>
                    <td>
                      <button onClick={() => handleRedirectToPage(Pages.transferCash,user._id)}>Transfer</button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleRemoveUser(user._id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
