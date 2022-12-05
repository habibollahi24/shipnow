import React, { useState } from "react";

//MUI
import {
   Card,
   CardContent,
   Typography,
   Button,
   CardActions,
   Box,
   Modal,
   IconButton,
   TextField,
   TextareaAutosize,
   Stack,
   Tooltip,
} from "@mui/material";

//MUI ICON
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

//Redux and actions
import { useDispatch, useSelector } from "react-redux";
import {
   deletTodo,
   editTodo,
   onCompletById,
   onUnCompletById,
   Todo,
} from "../features/todos/todos-slice";

//Type

import ModalComponent from "./ModalComponent";
interface TodoProps {
   todo: Todo;
}

const TodoItem = ({ todo }: TodoProps) => {
   const dispatch = useDispatch();
   const [open, setOpen] = React.useState(false);
   const [idForEdit, setIdForEdit] = useState<number | null>(null);

   const handleOpen = (id: number) => {
      setOpen(true);
      setIdForEdit(id);
   };
   const handleClose = () => setOpen(false);

   return (
      <Box>
         <Card
            sx={{
               margin: "10px",
               position: "relative",
               backgroundColor: `${todo.status === "completed" ? "#94be94a3" : "#ffe16aa8"}`,
            }}
         >
            <CardContent>
               <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                  {todo.status === "completed" ? (
                     <Tooltip title="select to un-completed">
                        <IconButton
                           color="primary"
                           sx={{ color: "green" }}
                           onClick={() =>
                              dispatch(onCompletById({ newStatus: "unCompleted", id: todo.id }))
                           }
                        >
                           <DoneAllIcon />
                        </IconButton>
                     </Tooltip>
                  ) : (
                     <Tooltip title="select to completed">
                        <IconButton
                           color="primary"
                           sx={{ color: "#444" }}
                           onClick={() =>
                              dispatch(onUnCompletById({ newStatus: "completed", id: todo.id }))
                           }
                        >
                           <DoneIcon />
                        </IconButton>
                     </Tooltip>
                  )}
               </Box>
               <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                  {todo.title}
               </Typography>
               <Typography color="text.secondary">{todo.descriptions}</Typography>
            </CardContent>
            <CardActions>
               <Button
                  sx={{ fontSize: "1rem" }}
                  color="info"
                  size="small"
                  onClick={() => handleOpen(todo.id)}
               >
                  Edit
               </Button>

               <Button
                  onClick={() => dispatch(deletTodo(todo.id))}
                  size="small"
                  sx={{ color: "tomato", fontSize: "1rem" }}
               >
                  Delete
               </Button>
            </CardActions>
         </Card>

         {open && (
            <ModalComponent
               open={open}
               handleClose={handleClose}
               id={idForEdit}
               setOpen={setOpen}
            />
         )}
      </Box>
   );
};

export default TodoItem;
