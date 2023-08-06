import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";


const List = ({ rows ,time,currency,onRowClick}) => {
  
  function findIndex(id){
    let index = -1;
    for (let i = 0; i < time.length; i++) {
      if (time[i]['&id'] === id) {
        index = i;
        break;
      }
    }
    return index
  }

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows && rows.map((row,idx) => {
            const id =  row["&id"]
            const index = findIndex(id);
            
          return(
          <ListRow key={idx} onRowClick={onRowClick} row={row.executionDetails} index={index}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{time[index].timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
          )
        
          })}
      </tbody>
    </table>
  );
};

export default List;
