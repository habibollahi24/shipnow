//MUI
import { createTheme, ThemeProvider } from "@mui/material";

//Redux
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";

//style
import "../styles/globals.css";

//type
import type { AppProps } from "next/app";

const theme = createTheme({
   palette: {
      primary: {
         main: "#ccc",
      },
      secondary: {
         main: "#facc15",
      },
   },
   typography: {
      fontFamily: "",
      button: {
         textTransform: "none",
         fontFamily: "cursive",
         fontWeight: "bold",
      },
   },
});

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <Component {...pageProps} />
            </PersistGate>
         </Provider>
      </ThemeProvider>
   );
}

export default MyApp;
