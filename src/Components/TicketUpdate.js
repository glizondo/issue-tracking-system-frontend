import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function TicketUpdate(props) {
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState({
    Id: "",
    Ticket_Title__c: "",
    Status__c: "",
    tier__c: "",
    agent__c: "",
    description__c: "",
    resolution__c: "",
  });
  const handleClickOpen = () => {
    setTicket({
      sfId: props.data.row.Id,
      ticketTitle: props.data.row.Ticket_Title__c,
      status: props.data.row.Status__c,
      tier: props.data.row.Tier__c,
      agent: props.data.row.Agent__c,
      description: props.data.row.Description__c,
      resolution: props.data.row.Resolution__c,
    });
    setOpen(true);
    console.log(props.data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setTicket({ ...ticket, [event.target.name]: event.target.value });
  };
  const handleSave = () => {
    props.updateTicket(ticket, props.data.row.Id);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default TicketUpdate;
