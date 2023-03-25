import React from "react";
import './Table.scss'
import { TABLE_HEADERS } from "../../constants/tableHeaders";

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
}

const Table = ({ users }: TableProps) => {
  return (
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
                    <button>Deposit</button>
                </td>
                <td>
                    <button>Withdraw</button>
                </td>
                <td>
                    <button>Transfer</button>
                </td>
                <td>
                    <button>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
