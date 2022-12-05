import React, { useState } from "react";

//MUI
import { Box, Modal } from "@mui/material";

//redux and actions
import { useSelector } from "react-redux";

//types
import type { RootState } from "../store";
import Inputs from "./Inputs";
interface ModalProps {
   id: number | null;
   open: boolean;
   handleClose: () => void;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   borderRadius: "5px",
   boxShadow: 24,
   p: 4,
};

const ModalComponent = ({ open, handleClose, id, setOpen }: ModalProps) => {
   const todos = useSelector((state: RootState) => state.todos.todos);
   //find todo that have edit
   const currentTodo = todos.find((todo) => todo.id === id)!;

   const [todo, setTodo] = useState<{ title: string; descriptions: string }>({
      title: currentTodo?.title,
      descriptions: currentTodo?.descriptions,
   });

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTodo({
         ...todo,
         [event.target.name]: event.target.value,
      });
   };

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <Inputs todo={todo} changeHandler={changeHandler} setOpen={setOpen} id={id} />
         </Box>
      </Modal>
   );
};

export default ModalComponent;
