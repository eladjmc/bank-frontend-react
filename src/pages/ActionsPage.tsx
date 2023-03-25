import React, { useEffect, useState } from "react";
import './ActionsPage.scss'
import Table, {
  UserDataStructure,
} from "../components/table/Table";
import API from "../services/Api";

const ActionsPage = () => {
  const [users, setUsers] = useState<UserDataStructure[]>([]);

  const getUsers = async () => {
    try {
      const result = await API.get("/users");
      setUsers(result.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="page actions-page">
      <Table users={users} />
    </section>
  );
};

export default ActionsPage;
