import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AdminService from "../../services/AdminService";
import Icon from "../Icon/Icon";
import { NotificationManager } from "react-notifications";
import TextHolder from "../PlaceHolder/TextHolder";
import ImageCard from "../PlaceHolder/ImageCard";

function UserManager() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    new AdminService().getAccounts().then((response) => {
      if (response) {
        setAccounts(response.data.listObject);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const banAccount = (accountId, index) => {
    new AdminService().banAccount(accountId).then(
      (res) => {
        NotificationManager.success(res.message);
        const newAccounts = [...accounts];
        newAccounts[index].banned = !newAccounts[index].banned;
        setAccounts(newAccounts);
      },
      (err) => {
        NotificationManager.error("Have Something Wrong");
      }
    );
  };

  return (
    <div>
      <Form.Control
        as="select"
        className="filter-status"
        // onChange={(e) => {
        //   setParams({ ...paramsString, status: e.target.value });
        // }}
      >
        <option value="">All</option>
        <option value="listed">Banned</option>
      </Form.Control>
      <Table id="table-user">
        <thead>
          <tr>
            <th className="text-center text500">STT</th>
            <th className=" text500">Username</th>
            <th></th>
            <th className="text500">Email</th>
            <th className="text500">Address</th>
            <th className="text-center text500">Action</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="U ">
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <ImageCard></ImageCard>
            </th>
            <th className="Name-content">
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th className="text-center">
              <ImageCard></ImageCard>
            </th>
          </tbody>
        ) : (
          <div></div>
        )}
        {accounts &&
          accounts.map((account, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th className="text-center text500">{index}</th>
                  <th className="Icon">
                    {account.image ? (
                      <Icon src={account.image} classIcon="Icon"></Icon>
                    ) : (
                      <Icon src={account} classIcon="Icon"></Icon>
                    )}
                  </th>
                  <th className=" text500 Name-content">{account.username}</th>
                  <th>{account.email}</th>
                  <th className="text500">{account.address}</th>
                  <th className="text-center">
                    {account.banned === false ? (
                      <Button
                        variant="danger"
                        onClick={() => banAccount(account.id, index)}
                      >
                        {" "}
                        Ban User{" "}
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => banAccount(account.id, index)}
                      >
                        {" "}
                        UnBan User{" "}
                      </Button>
                    )}
                  </th>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
}

export default UserManager;
