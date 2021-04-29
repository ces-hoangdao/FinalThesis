import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";

import "./HostManage.css";

import Statistic from "./StatisticForHost";
import HouseManage from "./HouseManage";

function HostManage() {
  const accountId = localStorage.getItem("userId");

  return (
    <div className="host-manager">
      <Tabs defaultActiveKey="home" ClassName="Tabs">
        <Tab eventKey="home" title="Home">
          <Statistic accountId={accountId}></Statistic>
        </Tab>
        <Tab eventKey="listing" title="Listing">
          <HouseManage accountId={accountId}></HouseManage>
        </Tab>
      </Tabs>

      <NotificationContainer></NotificationContainer>
    </div>
  );
}

export default HostManage;
