import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

import { useDispatch } from "react-redux";
import { editTodo } from "../features/todos/todos-slice";

interface InputsProps {
   id: number | null;
   todo: { title: string; descriptions: string };
   changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Inputs = ({ todo, changeHandler, setOpen, id }: InputsProps) => {
   const dispatch = useDispatch();

   //check form not empty
   let isDisabledButton = todo.title.trim().length === 0 || todo.descriptions.trim().length === 0;

   return (
      <>
         <Stack spacing={2}>
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
            <Button
               disabled={isDisabledButton}
               variant="contained"
               color="secondary"
               type="submit"
               onClick={() => {
                  dispatch(editTodo({ ...todo, id: id }));
                  setOpen(false);
               }}
            >
               ADD
            </Button>
         </Stack>
         {isDisabledButton && (
            <Box component="span" sx={{ marginTop: "0px", color: "#555" }}>
               Please Fill Form
            </Box>
         )}
      </>
   );
};

export default Inputs;
