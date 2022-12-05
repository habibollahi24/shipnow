//material
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

//type
import type { NextPage } from "next";

//components
import Header from "../components/Header";
import Form from "../components/Form";
import Todos from "../components/Todos";

const Home: NextPage = () => {
   return (
      <>
         <Header />
         <Container maxWidth="md">
            <Grid container>
               <Grid item xs={12} md={4} px={1}>
                  <Form />
               </Grid>
               <Grid item xs={12} md={8} px={1}>
                  <Todos />
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

export default Home;
