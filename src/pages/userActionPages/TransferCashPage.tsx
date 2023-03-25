import React, { ChangeEvent, useEffect, useState } from 'react'
import API from '../../services/Api';
import { useParams } from "react-router-dom";
import './TransferCashPage.scss'
import { AccountData, User } from './UpdateCashPage';

const TransferCashPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [accountIndex, setAccountIndex] = useState<number>(0);
    const [receiverAccountIndex, setReceiverAccountIndex] = useState<number>(0);
    const [receiverAccount, setReceiverAccount] = useState<AccountData | null>(null);
    const [user, setUser] = useState<User>({ accounts: [] });
    const [msg, setMsg] = useState<string>("");
    const [receiverPassport, setReceiverPassport] = useState<string>("");
    const [receiver, setReceiver] = useState<User | null>(null);
    
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

      const handleGetReceiver = async() =>{
        try {
            setMsg("");
            setIsLoading(true);
            const result = await API.get(`/users/getUserByQuery`,{params: {passportID: receiverPassport}});
            setReceiver(result.data.data[0]);
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
      }
    useEffect(() => {
        getUser();
      }, []);
    

    const handleChangeInput = (amount: string) => {
        if(parseInt(amount) < 0){
            setAmount(0);
        }
        setAmount(parseInt(amount));
    };

    const handleSubmitForm = async () => {
        const moneyToUpdate = { cash: -amount , credit:0};
        const moneyToUpdateReceiver = { cash: amount, credit: 0 };
        const accountToFetch: AccountData = user.accounts[accountIndex];
        const accountId = accountToFetch._id;
        
        try {
          setIsLoading(true);
          setMsg("");
          await API.put(`/accounts/updateBalance/${accountId}`, moneyToUpdate);
          await API.put(`/accounts/updateBalance/${receiverAccount}`, moneyToUpdateReceiver);
          setMsg("Transfer was successful!")
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
   <section className='page transfer-page'>
    <h1>Transfer Cash:</h1>
              {!isLoading && receiverAccount && (
        <div className="form-container">
          <span>Amount:</span>
          <input
          className='input'
            type="number"
            min={0}
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e.target.value)
            }
          />
          <span >Account:</span>
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
          <button className='button1' onClick={handleSubmitForm}>Transfer</button>
        </div>
      )}
      {!receiver && !receiverAccount && <div className='receiver-form'>
        <span>Transfer to:</span>
        <input className='input' onChange={(e: ChangeEvent<HTMLInputElement>)=>setReceiverPassport(e.target.value)} id="receiver-passport" name='receiver-passport' type="text" />
        <button className='button1' onClick={handleGetReceiver} >Submit</button>
        </div>}
        {receiver && !receiverAccount && <>
        <span className='sender-span'>Choose Receiver Account</span>
            <select
            name="receiver-account"
            id="receiver-account"
            value={receiverAccountIndex}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setReceiverAccountIndex(parseInt(e.target.value))
            }
          >
            {receiver.accounts.map((account, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <button className='button1' onClick={()=>setReceiverAccount(receiver.accounts[receiverAccountIndex])}>Submit</button>
          </>
        }
      {isLoading && <h2>Loading...</h2>}
      <h3>{msg}</h3>
   </section>
  )
}

export default TransferCashPage