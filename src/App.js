import Checkbox from "./components/Checkbox";
import TodoForm from "./components/TodoForm";
import Container from "./UI/Container";
import "./App.css";
import { useState, useContext, useRef, useEffect } from "react";
import TodoContext from "./Context/todo-context";

function App() {
  const ctx = useContext(TodoContext);
  const TodoRef = useRef(null);

  const [additem, setAddItem] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Retrieve the existing localStorage value
    const existingData = localStorage.getItem("mylist");

    // Parse the existing data or use an empty array as a default value
    const existingEvents = JSON.parse(existingData) || [];

    // Filter out events from ctx.events that are already in existingEvents
    const newEvents = ctx.events.filter(
      (event) => !existingEvents.includes(event)
    );

    // Merge the newEvents with the existingEvents
    const updatedEvents = [...existingEvents, ...newEvents];

    // Store the updated events in localStorage
    localStorage.setItem("mylist", JSON.stringify(updatedEvents));
  }, [ctx.events]);

  useEffect(() => {
    let fetcheditems = localStorage.getItem("mylist");
    let parseditems = JSON.parse(fetcheditems);
    ctx.setEvents(parseditems);
  }, []);
  const addTodoHandler = () => {
    setAddItem(true);
  };
  const closeModalHandler = () => {
    setAddItem(false);
  };
  const addEventHandler = (e) => {
    e.preventDefault();
    ctx.setEvents((prevArr) => [...prevArr, TodoRef.current.value]);
    setAddItem(false);
  };
  const removeEventHandler = (itemToRemove) => {
    ctx.setEvents((prevArr) => prevArr.filter((item) => item !== itemToRemove));
  };

  const completedEventHandler = (finished, event) => {
    if (event.target.checked) {
      setCompleted((prevarr) => {
        if (completed.includes(finished)) return;
        return [...prevarr, finished];
      });
    } else {
      setCompleted((prevArr) => prevArr.filter((item) => item !== finished));
    }
  };

  const isAllHandler = () => {
    setIsAll(true);
    setIsCompleted(false);
  };
  const isCompletedHandler = () => {
    setIsAll(false);
    setIsCompleted(true);
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
          <>
            {isAll &&
              ctx.events.map((item, index) => (
                <Checkbox
                  item={item}
                  key={index}
                  removeItem={removeEventHandler}
                  onChange={completedEventHandler}
                />
              ))}
            {isCompleted &&
              completed.map((item, index) => (
                <div className="todo-wrapper" key={index}>
                  <div className="item">
                    <label>{item}</label>
                  </div>
                </div>
              ))}
          </>
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
              <li className={`${isAll ? "active" : ""}`} onClick={isAllHandler}>
                All
              </li>
              {/* <li>Active</li> */}
              <li
                className={`${isCompleted ? "active" : ""}`}
                onClick={isCompletedHandler}
              >
                Completed
              </li>
            </ul>
          </li>
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
