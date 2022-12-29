import "./App.css";
import { ThemeProvider } from "@mui/material";
import Form from "./Form";
import { createTheme  } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Form/>
    </ThemeProvider>
  );
}

export default App;
