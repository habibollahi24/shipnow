import React, { useState } from "react";

//MUI
import Box from "@mui/material/Box";
import { Typography, TextField, Stack, Button, TextareaAutosize } from "@mui/material";

//dispatchs
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todos-slice";

const Form = () => {
   const dispatch = useDispatch();
   const [todo, setTodo] = useState<{ title: string; descriptions: string }>({
      title: "",
      descriptions: "",
   });

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTodo({
         ...todo,
         [event.target.name]: event.target.value,
      });
   };

   const subHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(addTodo(todo));
      setTodo({ title: "", descriptions: "" });
   };

   //check form is empty or no empty
   let isDisabledButton = todo.title.trim().length === 0 || todo.descriptions.trim().length === 0;

   return (
      <Box component="form" onSubmit={subHandler} sx={{ position: "sticky", top: "20px" }}>
         <Stack spacing={2}>
            <Typography variant="h6">Add One Todo ... </Typography>
            <TextField
               sx={{ backgroundColor: "#fff" }}
               value={todo.title}
               name="title"
               id="standard-basic1"
               label="Todo"
               variant="outlined"
               onChange={changeHandler}
               size="small"
            />
            <TextareaAutosize
               value={todo.descriptions}
               name="descriptions"
               onChange={changeHandler}
               aria-label="minimum height"
               minRows={5}
               placeholder="Descreptions ..."
               style={{
                  resize: "vertical",
                  padding: "5px 10px",
                  fontFamily: "cursive",
                  fontSize: "1rem",
                  borderColor: "#ccc",
                  borderRadius: "3px",
               }}
            />
            <Button variant="contained" color="secondary" type="submit" disabled={isDisabledButton}>
               ADD
            </Button>
         </Stack>
         {isDisabledButton && (
            <Box component="span" sx={{ marginTop: "0px", color: "#555" }}>
               Please Fill Form
            </Box>
         )}
      </Box>
   );
};

export default Form;
