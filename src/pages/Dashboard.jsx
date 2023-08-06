import { useEffect, useState } from "react";

// Data
import data from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";



// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [mockData,setMockData] = useState(data)


  const applyFilter = () => {
    if (!data.results) return; 
    if (searchText.trim() === "") {
      setMockData(data);
      return;
    }
    const filtered = data.results.filter(
      (item) => item["&id"].toString().toLowerCase().includes(searchText.toLowerCase())
    );
    setMockData({ ...mockData, results: filtered }); 
  };
  
  useEffect(() => {
    applyFilter();
  }, [searchText]);
  
  function handleSearch(e){
    setSearchText(e.target.value)
    applyFilter()
  }
  
  
  if (!mockData) {
    return <p>Loading...</p>;
  }


  const handleRowClick = (orderDetails, index) => {
    setSelectedOrderDetails(orderDetails);
    setSelectedOrderTimeStamps(timestamps.results[index].timestamps);
  };

  return (
    <div className="main-container">
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={mockData.results.length+" orders"} />
        <div className={styles.actionBox}>
          <Search
            type="text"
            value={searchText}
            onChange={handleSearch}
            
          />
          <Dropdown 
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={mockData.results} time={timestamps.results} currency={currency} searchText={searchText} onRowClick={handleRowClick}/>
      </div>
    </div>
  );
};

export default Dashboard;
