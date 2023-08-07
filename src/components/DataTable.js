import React, { useState } from "react";
import { Table } from "react-bootstrap";
import sortIcon from "../icons/icon_sort.png";
import ascIcon from "../icons/icon_asc.png";
import descIcon from "../icons/icon_desc.png";

const DataTable = (props) => {
  const type = props.type;
  const data = props.data.data;
  const num_people = data.length;

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [visible, setVisible] = useState(false);

  const processData = () => {
    const res = [];
    const target = Object.values(data).map((item) => item[type]);
    for (let i = 0; i < num_people; i++) {
      let tmp = {};
      tmp.name = data[i].name;
      if (type === "win" || type === "alive") {
        for (const key in target[0]) {
          if (data[i]["game"][key] === 0) continue;
          tmp[key] = target[i][key] / data[i]["game"][key];
        }
      } else if (type === "divine" || type === "guard" || type === "attack") {
        tmp["success"] = target[i]["success"] / target[i]["challenge"];
        if (type === "attack") tmp["score"] = target[i]["score"] / target[i]["challenge"];
      }
      res.push(tmp);
    }
    return res;
  }

  const handleHeaderClick = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const processedData = processData();

  const sortedData = [...processedData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  return (
    <div>
      <a href="#" style={{ color: 'black', textDecoration: 'none' }} onClick={() => setVisible(!visible)}>{visible ? "▼" : "▶"}分析結果を確認</a>
      {visible && <Table striped bordered hover>
        <thead>
          {(type === "win" || type === "alive") ? (
          <tr className="bg-primary text-white">
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick('name')}>
              <span>Agent {sortBy === 'name' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick('TOTAL')}>
              <span>Total {sortBy === 'TOTAL' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("VILLAGER")}>
              <span>Villager {sortBy === 'VILLAGER' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("SEER")}>
              <span>Seer {sortBy === 'SEER' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            {num_people === 15 &&
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("MEDIUM")}>
              <span>Medium {sortBy === 'MEDIUM' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            }
            {num_people === 15 &&
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("BODYGUARD")}>
              <span>Bodyguard {sortBy === 'BODYGUARD' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            }
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("WEREWOLF")}>
              <span>Werewolf {sortBy === 'WEREWOLF' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick("POSSESSED")}>
              <span>Possessed {sortBy === 'POSSESSED' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
          </tr>
          ) : (
          <tr className="bg-primary text-white">
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick('name')}>
              <span>Agent {sortBy === 'name' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick('success')}>
              <span>Success {sortBy === 'success' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            {type === "attack" &&
            <th style={{ width: "12.5%" }} onClick={() => handleHeaderClick('score')}>
              <span>Score {sortBy === 'score' ? (sortOrder === 'asc' ? <img src={ascIcon} alt="↓" style={{ height: "1.5rem", width: "1.5rem" }} /> : <img src={descIcon} alt="↑" style={{ height: "1.5rem", width: "1.5rem" }} />) : <img src={sortIcon} alt="..." style={{ height: "1.5rem", width: "1.5rem" }} />}</span>
            </th>
            }
          </tr>
          )}
        </thead>
        <tbody>
          {(type === "win" || type === "alive") ? sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.TOTAL.toFixed(3)}</td>
              <td>{item.VILLAGER.toFixed(3)}</td>
              <td>{item.SEER.toFixed(3)}</td>
              {num_people === 15 &&
              <td>{item.MEDIUM.toFixed(3)}</td>}
              {num_people === 15 &&
              <td>{item.BODYGUARD.toFixed(3)}</td>}
              <td>{item.WEREWOLF.toFixed(3)}</td>
              <td>{item.POSSESSED.toFixed(3)}</td>
            </tr>
          )) : (sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.success.toFixed(3)}</td>
              {type === "attack" &&
              <td>{item.score.toFixed(3)}</td>}
            </tr>
          )))}
        </tbody>
      </Table>}
    </div>
  );
}

export default DataTable;