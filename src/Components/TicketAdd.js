import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function TicketAdd(props) {
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState({
    Ticket_Title__c: "",
    Status__c: "",
    tier__c: "",
    agent__c: "",
    description__c: "",
    resolution__c: "",
    Ticket_Creation_Date__c: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
    // console.log(props.data.row.Id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setTicket({ ...ticket, [event.target.name]: event.target.value });
  };
  const handleSave = () => {
    props.addTicket(ticket);
    handleClose();
  };

  return (
    <div
      style={{ display: "flex", alignSelf: "center", justifyContent: "center" }}
    >
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        New Ticket
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Ticket</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              name="ticketTitle"
              autoFocus
              variant="standard"
              value={ticket.ticketTitle}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="status"
                id="demo-simple-select"
                value={ticket.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"On Hold"}>On Hold</MenuItem>
                <MenuItem value={"Waiting for Client"}>
                  Waiting for Client
                </MenuItem>
                <MenuItem value={"Escalating Check"}>Escalating Check</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tier"
              name="tier"
              variant="standard"
              value={ticket.tier}
              onChange={handleChange}
            />
            <TextField
              label="Agent"
              name="agent"
              variant="standard"
              value={ticket.agent}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              variant="standard"
              value={ticket.description}
              onChange={handleChange}
            />
            <TextField
              label="Resolution"
              name="resolution"
              variant="standard"
              value={ticket.resolution}
              onChange={handleChange}
            />
            <TextField
              label="Ticket Creation Date"
              name="ticketCreationDate"
              variant="standard"
              value={ticket.ticketCreationDate}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default TicketAdd;
