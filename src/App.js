import Checkbox from "./components/Checkbox";
import TodoForm from "./components/TodoForm";
import Container from "./UI/Container";
import "./App.css";
import { useState, useContext, useRef } from "react";
import TodoContext from "./Context/todo-context";

function App() {
  const ctx = useContext(TodoContext);
  const TodoRef = useRef(null);

  const [additem, setAddItem] = useState(false);
  const [completed, setCompleted] = useState([]);
  const addTodoHandler = () => {
    setAddItem(true);
  };
  const closeModalHandler = () => {
    setAddItem(false);
  };
  const addEventHandler = (e) => {
    e.preventDefault();
    ctx.setEvents((prevArr) => [...prevArr, TodoRef.current.value]);
    console.log(ctx, TodoRef.current.value);
    setAddItem(false);
  };
  const removeEventHandler = (itemToRemove) => {
    ctx.setEvents((prevArr) => prevArr.filter((item) => item !== itemToRemove));
  };

  const completedEventHandler = (finished, event) => {
    if (event.target.checked) {
      setCompleted((prevarr) => [...prevarr, finished]);
    }
    console.log(completed);
  };

  return (
    <div className="App">
      <Container>
        <ul className="top-nav">
          <li>Add new tasks</li>
          <li>
            <button onClick={addTodoHandler}>+</button>
          </li>
        </ul>

        {ctx.events.length === 0 ? (
          <div className="todo-wrapper">
            <div className="item">
              <label>Nothing on your list yet!</label>
            </div>
          </div>
        ) : (
          ctx.events.map((item, index) => (
            <Checkbox
              item={item}
              key={index}
              removeItem={removeEventHandler}
              onChange={completedEventHandler}
            />
          ))
        )}
        <ul className="nav">
          <li>
            {ctx.events.length === 0
              ? "All done!"
              : `${ctx.events.length} ${
                  ctx.events.length > 1 ? "Items" : "Item"
                } left`}
          </li>
          <li>
            <ul className="categories">
              <li className="active">All</li>
              <li>Active</li>
              <li>Completed</li>
            </ul>
          </li>
          <li>Clear completed</li>
        </ul>
      </Container>
      {additem && (
        <TodoForm
          closeModal={closeModalHandler}
          ref={TodoRef}
          addEventHandler={addEventHandler}
        />
      )}
    </div>
  );
}

export default App;
