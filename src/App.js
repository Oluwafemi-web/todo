import Checkbox from "./components/Checkbox";
import TodoForm from "./components/TodoForm";
import Container from "./UI/Container";
import "./App.css";
import { useState, useContext, useRef, useEffect } from "react";
import TodoContext from "./Context/todo-context";

function App() {
  // const [additem, setAddItem] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // useEffect(() => {
  //   // Retrieve the existing localStorage value
  //   const existingData = localStorage.getItem("mylist");

  //   // Parse the existing data or use an empty array as a default value
  //   const existingEvents = JSON.parse(existingData) || [];

  //   // Filter out events from ctx.events that are already in existingEvents
  //   const newEvents = ctx.events.filter((event) =>
  //     existingEvents.includes(event.todo)
  //   );
  //   // Merge the newEvents with the existingEvents
  //   const updatedEvents = [...existingEvents, ...newEvents];

  //   // Store the updated events in localStorage
  //   localStorage.setItem("mylist", JSON.stringify(updatedEvents));
  // }, [ctx.events]);

  // useEffect(() => {
  //   let fetcheditems = localStorage.getItem("mylist");
  //   let parseditems = JSON.parse(fetcheditems);
  //   ctx.setEvents(parseditems);
  // }, []);
  // const addTodoHandler = () => {
  //   setAddItem(true);
  // };
  // const closeModalHandler = () => {
  //   setAddItem(false);
  // };
  // const addEventHandler = (e) => {
  //   e.preventDefault();
  //   ctx.setEvents((prevArr) => [
  //     { id: TodoRef.current.value, todo: TodoRef.current.value },
  //     ...prevArr,
  //   ]);
  //   setAddItem(false);
  // };
  // const removeEventHandler = (id) => {
  //   ctx.setEvents((prevarr) => prevarr.filter((event) => id !== event.id));
  // };

  // const completedEventHandler = (finished, event) => {
  //   if (event.target.checked) {
  //     setCompleted((prevarr) => {
  //       if (completed.includes(finished)) return;
  //       return [...prevarr, finished];
  //     });
  //   } else {
  //     setCompleted((prevArr) => prevArr.filter((item) => item !== finished));
  //   }
  // };

  const ctx = useContext(TodoContext);
  const TodoRef = useRef(null);

  const [additem, setAddItem] = useState(false);
  console.log(ctx.events);

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
      id: Math.random(0, 100), // Generate a unique ID, you can use other methods for this
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

  const completedEventHandler = (taskId, event) => {
    setCompleted((prevCompleted) => {
      if (event.target.checked) {
        return [...prevCompleted, taskId];
      } else {
        return prevCompleted.filter(
          (completedTaskId) => completedTaskId !== taskId
        );
      }
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
              ctx.events.map((item, index) => (
                <Checkbox
                  item={item.todo}
                  id={item.id}
                  key={item.id}
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
