import styles from "./Search.module.css";

const Search = ({ value, onChange }) => {
  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Search;
