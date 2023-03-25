/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./ActionsPage.scss";
import Table, { UserDataStructure } from "../components/table/Table";
import API from "../services/Api";
import { useNavigate } from "react-router";
import { Pages } from "../constants/pages";

const ActionsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserDataStructure[]>([]);
  const [getUsersList, setGetUsersList] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      const result = await API.get("/users");
      setUsers(result.data.data);
    } catch (error) {}
  };

  const handleRedirectToPage = (page: string) => {
    navigate(`/${page}`);
  };

  useEffect(() => {
    getUsers();
  }, [getUsersList]);

  return (
    <section className="page actions-page">
      <a
        onClick={() => handleRedirectToPage(Pages.addUser)}
        className="button1"
      >
        Add User
      </a>
      {!!users.length && <Table users={users} setGetUsers={setGetUsersList} />}
      {!users.length && <h3>Loading...</h3>}
    </section>
  );
};

export default ActionsPage;
