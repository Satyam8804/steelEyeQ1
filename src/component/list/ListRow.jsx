import styles from "./ListRow.module.css";

const ListCell = ({ children ,onRowClick,row,index}) => {
  return <tr className={styles.cell} onClick={()=>{onRowClick(row,index)}}>{children}</tr>;
};

export default ListCell;
