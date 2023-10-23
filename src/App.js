import Checkbox from "./components/Checkbox";
import TodoForm from "./components/TodoForm";
import Container from "./UI/Container";
import "./App.css";
import { useState, useContext, useRef, useEffect } from "react";
import TodoContext from "./Context/todo-context";

function App() {
  // const [additem, setAddItem] = useState(false);
  // const [completed, setCompleted] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const ctx = useContext(TodoContext);
  const TodoRef = useRef(null);

  const [additem, setAddItem] = useState(false);

  useEffect(() => {
    // Retrieve the existing localStorage value
    const existingData = localStorage.getItem("mylist");

    // Parse the existing data or use an empty array as a default value
    const existingEvents = JSON.parse(existingData) || [];

    // Store the updated events in context
    ctx.setEvents(existingEvents);
  }, []);

  const addTodoHandler = () => {
    setAddItem(true);
  };

  const closeModalHandler = () => {
    setAddItem(false);
  };

  const addEventHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.random(0, 100),
      completed: false, // Generate a unique ID, you can use other methods for this
      todo: TodoRef.current.value,
    };
    ctx.setEvents((prevArr) => [newTask, ...prevArr]);
    setAddItem(false);

    // Update local storage with the new task
    localStorage.setItem("mylist", JSON.stringify([newTask, ...ctx.events]));
  };

  const removeEventHandler = (id) => {
    ctx.setEvents((prevArr) => prevArr.filter((event) => id !== event.id));

    // Update local storage after removing the task
    const updatedEvents = ctx.events.filter((event) => id !== event.id);
    localStorage.setItem("mylist", JSON.stringify(updatedEvents));
  };

  // const completedEventHandler = (taskId, events) => {
  //   ctx.setEvents((prevArr) => {
  //     prevArr.forEach((event) => {
  //       if (event.id === taskId) {
  //         if (events.target.checked) {
  //           event.completed = true;
  //           console.log(event.completed);
  //         }
  //       } else return event;
  //     });
  //     return prevArr;
  //   });
  // };
  const completedEventHandler = (taskId, events) => {
    ctx.setEvents((prevArr) => {
      return prevArr.map((event) => {
        if (event.id === taskId) {
          return { ...event, completed: events.target.checked };
        }
        return event;
      });
    });
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
              ctx.events.map((item) => (
                <Checkbox
                  item={item.todo}
                  id={item.id}
                  checked={item.completed}
                  key={item.id}
                  removeItem={removeEventHandler}
                  onChange={completedEventHandler}
                />
              ))}
            {isCompleted &&
              ctx.events
                .filter((event) => event.completed === true)
                .map((item) => (
                  <div className="todo-wrapper" key={item.id}>
                    <div className="item">
                      <label>{item.todo}</label>
                    </div>
                  </div>
                ))}
          </>
        )}
        <ul className="nav">
          {isAll && (
            <li>
              {ctx.events.length === 0
                ? "All done!"
                : `${ctx.events.length} ${
                    ctx.events.length > 1 ? "Items" : "Item"
                  } left`}
            </li>
          )}
          <li>
            <ul className="categories">
              <li className={`${isAll ? "active" : ""}`} onClick={isAllHandler}>
                All
              </li>
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
