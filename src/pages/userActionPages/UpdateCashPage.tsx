import React, { ChangeEvent, useEffect, useState } from "react";
import API from "../../services/Api";
import "./UpdateCashPage.scss";
import { useParams } from "react-router-dom";

interface Props {
  isAdding: boolean;
  isCash: boolean;
}

type AccountData = {
  _id: string;
  credit: number;
  cash: number;
};

interface User {
  accounts: AccountData[];
}

interface Account {
  id: number;
  name: string;
}

const UpdateCashPage = ({ isAdding, isCash }: Props) => {
  const { id } = useParams();

  const [user, setUser] = useState<User>({ accounts: [] });
  const [amount, setAmount] = useState<number>(0);
  const [accountIndex, setAccountIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  const getUser = async () => {
    try {
      setMsg("");
      setIsLoading(true);
      const result = await API.get(`/users/${id}`);
      setUser(result.data.data);
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setMsg(errorMessage);
      } else {
        setMsg("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeInput = (amount: string) => {
    if (isNaN(parseInt(amount))) {
      setAmount(0);
    }

    if (!isCash && parseInt(amount) < 0) {
      setAmount(0);
    } else {
      setAmount(parseInt(amount));
    }
  };

  const handleSubmitForm = async () => {
    const moneyToUpdate = isCash ? { cash: amount } : { credit: amount };
    const accountToFetch: AccountData = user.accounts[accountIndex];
    const accountId = accountToFetch._id;

    try {
      setIsLoading(true);
      setMsg("");
      await API.put(`/accounts/updateBalance/${accountId}`, moneyToUpdate);
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setMsg(errorMessage);
      } else {
        setMsg("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  return (
    <section className="page update-cash-page">
      {isCash && <h1>{isAdding ? "Deposit" : "withdraw"} Cash</h1>}
      {!isCash && <h1>Update Credit</h1>}
      {!isLoading && (
        <div className="form-container">
          <span>Amount:</span>
          <input
            type="number"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e.target.value)
            }
          />
          <select
            name="account"
            id="account"
            value={accountIndex}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setAccountIndex(parseInt(e.target.value))
            }
          >
            {user.accounts.map((account, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <button onClick={handleSubmitForm}>Submit</button>
        </div>
      )}
      {isLoading && <h2>Loading...</h2>}
      <h3>{msg}</h3>
    </section>
  );
};

export default UpdateCashPage;
