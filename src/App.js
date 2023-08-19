import "./App.css";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material/";
import TicketList from "./Components/TicketList";
import "@fontsource/roboto/300.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import "./index.css";



function App() {
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        color="terciary"
        style={{ align: "center", marginBottom: 4 }}
      >
        ISSUE TRACKING SYSTEM
      </Typography>
      <AppBar position="static"></AppBar>
      <TicketList />
    </div>
  );
}

export default App;
