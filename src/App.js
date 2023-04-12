import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get("https://dummyjson.com/users");
        setFetchData(res.data.users);
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const filter = fetchData.filter((item) => item.height <= 170);
    setFilterData(filter);
  }, [fetchData]);

  useEffect(() => {
    const sort = FilterData.sort((a, b) => b.age - a.age);
    setSortData(sort);
  }, [FilterData]);

  return (
    <div className="App">
      <table>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Age</th>
          <th>Height</th>
        </tr>
        {sortData.slice(0, 10).map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img src={user.image} alt={user.image} />
            </td>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.age}</td>
            <td>{user.height}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
