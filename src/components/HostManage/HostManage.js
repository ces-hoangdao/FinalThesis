import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import { useHistory } from "react-router-dom";
import "./HostManage.css";

import Statistic from "./StatisticForHost";
import HouseManage from "./HouseManage";

function HostManage() {
  const accountId = localStorage.getItem("userId");
  const role = localStorage.getItem("role")
  let history = useHistory();
  if(role !== "host"){
    history.push("/hostregister");
  }
  return (
    <div className="host-manager">
      <Tabs defaultActiveKey="home" ClassName="Tabs host-link" variant="pills" >
        <Tab eventKey="home" title="Home">
          <Statistic accountId={accountId}></Statistic>
        </Tab>
        <Tab eventKey="listing" title="Listing" ClassName=" host-link" variant="pills" >
          <HouseManage accountId={accountId}></HouseManage>
        </Tab>
      </Tabs>

      <NotificationContainer></NotificationContainer>
    </div>
  );
}

export default HostManage;
