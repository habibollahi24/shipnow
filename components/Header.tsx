//MUI
import { Container } from "@mui/system";
import { Box } from "@mui/material";

const Header = () => {
   return (
      <Container maxWidth="md" sx={{ marginBottom: "3rem", marginTop: "4rem" }}>
         <Box sx={{ display: "flex", justifyContent: "flex-end", position: "relative" }}>
            <Box
               sx={{
                  width: "120px",
                  height: "30px",
                  backgroundColor: "#facc15",
                  borderRadius: "10px",
                  textAlign: "end",
                  transform: "rotate(-45deg)",
                  position: "relative",
               }}
            >
               <Box
                  sx={{
                     position: "absolute",
                     width: "60px",
                     height: "30px",
                     backgroundColor: "#eec629",
                     borderRadius: "10px",
                     transform: "translate(-15px ,-15px)rotate(90deg)",
                     left: 0,
                  }}
               ></Box>
            </Box>
         </Box>
      </Container>
   );
};

export default Header;
