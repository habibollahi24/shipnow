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
   todos: Todo[];
   selected: "all" | "completed" | "unCompleted";
   setSelected: React.Dispatch<React.SetStateAction<"all" | "completed" | "unCompleted">>;
}

//component
import TodoItem from "./TodoItem";
import gif from "../public/Vanilla-1s-280px.gif";

const Todos = () => {
   const todos = useSelector((state: RootState) => state.todos.todos);
   const [selected, setSelected] = useState<"all" | "completed" | "unCompleted">("all");

   const filterTodosByStatus = todos.filter((todo) => {
      if (selected === "completed") {
         return todo.status === "completed";
      } else if (selected === "unCompleted") {
         return todo.status === "unCompleted";
      } else {
         return todo;
      }
   });

   const emptyMessage =
      todos.length === 0 ? (
         <Box>
            <Image priority src={gif} alt="gif" />
         </Box>
      ) : (
         ""
      );

   const emptyFilter =
      filterTodosByStatus.filter((todo) => todo.status === "completed").length === 0 &&
      selected === "completed" ? (
         <Box sx={{ textAlign: "center", paddingTop: "5px" , color:"#555" }}>Empty Completed Todo</Box>
      ) : filterTodosByStatus.filter((todo) => todo.status === "unCompleted").length === 0 &&
        selected === "unCompleted" ? (
         <Box sx={{ textAlign: "center", paddingTop: "5px" , color:"#555" }}>Empty Un-Completed Todo </Box>
      ) : (
         ""
      );

   
   return (
      <>
         <ButtonsFilter todos={todos} selected={selected} setSelected={setSelected} />
         {emptyFilter}
         <Grid container sx={{ justifyContent: "center" }}>
            {emptyMessage}
            {filterTodosByStatus.map((t) => {
               return (
                  <Grid key={t.id} item xs={12} md={6}>
                     <TodoItem todo={t} />
                  </Grid>
               );
            })}
         </Grid>
      </>
   );
};

const ButtonsFilter = ({ todos, selected, setSelected }: ButtonFilter) => {
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
         <Badge color="secondary" badgeContent={todos.length}>
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
            badgeContent={todos.filter((todo) => todo.status === "completed").length}
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
            badgeContent={todos.filter((todo) => todo.status === "unCompleted").length}
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
