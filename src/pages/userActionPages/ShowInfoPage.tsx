import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/Api";
import "./ShowInfoPage.scss";

const ShowInfoPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      console.log(id);

      setIsLoading(true);
      const result = await API.get(`/users/${id}`);
      setUser(result.data.data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="page user-info-page">
      <h1>User Info:</h1>
      {isLoading && <h2>Loading...</h2>}
      {user && (
        <div className="user-info-container">
          <h3>
            Age: <span className="field-value">{user.age}</span>
          </h3>
          <h3>
            Name: <span className="field-value">{user.name}</span>
          </h3>
          <h3>
            ID: <span className="field-value">{user.passportID}</span>
          </h3>
          <h3>
            Email: <span className="field-value">{user.email}</span>
          </h3>
          <h3>
            Total amount of cash:{" "}
            <span className="field-value">{user.totalCash}</span>
          </h3>
          <h3>
            Total amount of credit:{" "}
            <span className="field-value">{user.totalCash}</span>
          </h3>
          <h3>
            Total amount of accounts:{" "}
            <span className="field-value">
              {user.accounts ? user.accounts.length : 0}
            </span>
          </h3>
        </div>
      )}
    </section>
  );
};

export default ShowInfoPage;
