import React from "react";
import TodoContext from "./todo-context";
import { useState } from "react";
export default function TodoProvider(props) {
  const [events, setEvents] = useState([]);
  localStorage.setItem("mylist", events);
  const Context = {
    events: events,
    setEvents,
  };
  return (
    <TodoContext.Provider value={Context}>
      {props.children}
    </TodoContext.Provider>
  );
}
