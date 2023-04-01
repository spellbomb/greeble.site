import styles from "./grid.module.css";

const Grid = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.gridItem} style={{gridColumn: "span 2"}}><p>first item</p></div>
      <div className={styles.gridItem}><p>second item</p></div>
      <div className={styles.gridItem}><p>third item</p></div>
      <div className={styles.gridItem} style={{gridRow: "span 2"}}><p>another item</p></div>
      <div className={styles.gridItem}><p>another item</p></div>
      <div className={styles.gridItem}><p>another item</p></div>
      <div className={styles.gridItem}><p>another item</p></div>
    </div>
  );
};

export default Grid;
