import { useEffect, useState } from "react";
import Image from "next/image";
//MUI
import { Grid, Button, Stack, Badge, Box } from "@mui/material";

//redux
import { useSelector } from "react-redux";

//types
import type { RootState } from "../store";
import { Todo } from "./../features/todos/todos-slice";
interface ButtonFilter {
   initialState: Todo[];
   selected: "all" | "completed" | "unCompleted";
   setSelected: React.Dispatch<React.SetStateAction<"all" | "completed" | "unCompleted">>;
}

//component
import TodoItem from "./TodoItem";
import gif from "../public/Vanilla-1s-280px.gif";

const Todos = () => {
   const todos = useSelector((state: RootState) => state.todos.todos);
   const [selected, setSelected] = useState<"all" | "completed" | "unCompleted">("all");

   const [initialState, setInitialState] = useState<Todo[]>([]);
   const [filterTodos, setFilterTodos] = useState<Todo[]>([]);

   useEffect(() => {
      setInitialState(todos);
   }, [todos]);

   useEffect(() => {
      let result = initialState;
      result = result.filter((todo) => todo.status === selected);

      if (result.length === 0) {
         return setFilterTodos(todos);
      }
      setFilterTodos(result);
   }, [selected, initialState, todos]);

   return (
      <>
         <ButtonsFilter initialState={initialState} selected={selected} setSelected={setSelected} />
         <Grid container sx={{ justifyContent: `${filterTodos.length === 0 ? "center" : ""}` }}>
            {filterTodos.length === 0 ? (
               <Box>
                  <Image priority src={gif} alt="gif" />
               </Box>
            ) : (
               filterTodos.map((t) => {
                  return (
                     <Grid key={t.id} item xs={12} md={6}>
                        <TodoItem todo={t} />
                     </Grid>
                  );
               })
            )}
         </Grid>
      </>
   );
};

const ButtonsFilter = ({ initialState, selected, setSelected }: ButtonFilter) => {
   return (
      <Stack
         direction="row"
         pl={1}
         spacing={2}
         sx={{
            justifyContent: "center",
            padding: { xs: "2rem", md: "0" },
         }}
      >
         <Badge color="secondary" badgeContent={initialState.length}>
            <Button
               variant="outlined"
               sx={{
                  backgroundColor: `${selected === "all" ? "#eee" : ""}`,
                  color: "#333",
                  ":hover": {
                     backgroundColor: "#eee",
                  },
               }}
               onClick={() => setSelected("all")}
            >
               All
            </Button>
         </Badge>

         <Badge
            color="secondary"
            badgeContent={initialState.filter((todo) => todo.status === "completed").length}
         >
            <Button
               variant="outlined"
               sx={{
                  backgroundColor: `${selected === "completed" ? "#94be94a3" : ""}`,
                  color: "#333",
                  ":hover": {
                     backgroundColor: "#94be94a3",
                  },
               }}
               onClick={() => setSelected("completed")}
            >
               Completed
            </Button>
         </Badge>

         <Badge
            color="secondary"
            badgeContent={initialState.filter((todo) => todo.status === "unCompleted").length}
         >
            <Button
               sx={{
                  backgroundColor: `${selected === "unCompleted" ? "#ffe16aa8" : ""}`,
                  color: "#333",
                  ":hover": {
                     backgroundColor: "#ffe16aa8",
                  },
               }}
               variant="outlined"
               onClick={() => setSelected("unCompleted")}
            >
               Un-Completed
            </Button>
         </Badge>
      </Stack>
   );
};

export default Todos;
