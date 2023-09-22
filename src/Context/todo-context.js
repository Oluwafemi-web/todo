import { createContext } from "react";
const TodoContext = createContext({
  events: [],
  setEvents: () => {},
});

export default TodoContext;
