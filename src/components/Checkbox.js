import { MdDeleteOutline } from "react-icons/md";
export default function Checkbox(props) {
  return (
    <div className="todo-wrapper">
      <div className="item">
        <input
          type="checkbox"
          id="task"
          className="checkbox-round"
          onChange={(e) => props.onChange(props.item, e)}
        />
        <label htmlFor="task">{props.item}</label>
      </div>
      <button onClick={() => props.removeItem(props.item)}>
        <MdDeleteOutline />
      </button>
    </div>
  );
}
