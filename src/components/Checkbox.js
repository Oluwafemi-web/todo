import { MdDeleteOutline } from "react-icons/md";
export default function Checkbox(props) {
  return (
    <div className="todo-wrapper">
      <div className="item">
        <input
          type="checkbox"
          id="task"
          checked={props.checked}
          className="checkbox-round"
          onChange={(e) => props.onChange(props.id, e)}
        />
        <label htmlFor="task">{props.item}</label>
      </div>
      <button onClick={() => props.removeItem(props.id)}>
        <MdDeleteOutline />
      </button>
    </div>
  );
}
