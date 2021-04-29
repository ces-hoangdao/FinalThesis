import React, { useState, useEffect } from "react";
import { LineChart } from "@toast-ui/react-chart";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import AdminService from "../../services/AdminService";
import { Form } from "react-bootstrap";

function Chart() {
  const [loading, setLoading] = useState(false);
  const [dataHouse, setDataHouse] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [year, setYear] = useState(2021);
  const defaultvalue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May ",
    "June ",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    setLoading(true);
    new AdminService().totalHouseMonthly(year).then((response) => {
      if (response.status < 300) {
        const house = response.data;
        let data = house.map((house) => house.totalHouse);
        setDataHouse(data);
      } else {
        setLoading(false);
        setDataHouse(defaultvalue);
      }
    });
  }, [year]);

  useEffect(() => {
    setLoading(true);
    new AdminService().monthlyRevenue(year).then((response) => {
      if (response) {
        const revenue = response.data;
        let data = revenue.map((revenue) => revenue.revenue);
        setDataRevenue(data);
      } else {
        setLoading(false);
        setDataHouse(defaultvalue);
      }
    });
  }, [year]);

  const dataMoney = {
    categories: categories,
    series: [
      {
        name: year,
        data: dataRevenue,
      },
    ],
  };
  const optionsMoney = {
    chart: { title: "Revenue by month", width: 1400, height: 400 },
    xAxis: {
      title: "Month",
    },
    yAxis: {
      title: "VNĐ",
    },
    tooltip: {
      formatter: (value) => `${value} VNĐ`,
    },
    legend: {
      align: "bottom",
    },
  };

  const data = {
    categories: categories,
    series: [
      {
        name: year,
        data: dataHouse,
      },
    ],
  };
  const options = {
    chart: { title: "House increase", width: 1400, height: 400 },
    xAxis: {
      title: "Month",
    },
    yAxis: {
      title: "House",
    },
    tooltip: {
      formatter: (value) => `${value} House`,
    },
    legend: {
      align: "bottom",
    },
  };
  return (
    <div className="chart">
      <Form.Control
        as="select"
        className="filter-status"
        onChange={(e) => {
          setYear(e.target.value);
        }}
      >
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </Form.Control>
      <LineChart data={data} options={options} />
      <h4 className="text-center text-chart">House increase follow year</h4>
      <LineChart data={dataMoney} options={optionsMoney} />
      <h4 className="text-center text-chart">Revenue by month</h4>
      <></>
    </div>
  );
}

export default Chart;
