import styles from "./ContactItem.module.css";

const ContactItem = ({
  data,
  isSelected,
  onDelete,
  onEdit,
  onToggleSelect,
}) => {
  const { id, name, lastName, email, phone } = data;

  return (
    <li className={styles.item}>
     
      
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(id)} 
        />
        
        <p>
          {name} {lastName}
        </p>
        <p>
          <span>📩</span>
          {email}
        </p>
        <p>
          <span>📞</span>
          {phone}
        </p>
     

    
      <div className={styles.actions}>
      
        <button onClick={() => onEdit(id)}>✏️</button>

       
        <button onClick={() => onDelete(id)}>🗑️</button>
      </div>
    </li>
  );
};

export default ContactItem;