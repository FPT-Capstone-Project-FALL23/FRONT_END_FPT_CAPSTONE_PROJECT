import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import "../../Assets/CSS/Organizer/CreateTiket.css";

function CreateTicket() {
  const [countForm, setCountForm] = useState(1);
  const [countTicket, setTountTicket] = useState(1);
  const [eventDate, setEventDate] = useState([
    {
      id: countForm,
      dateEvent: "",
    },
  ]);
  console.log(eventDate);

  const [ticket, setTicket] = useState([
    {
      id: countTicket,
      name_ticket: "",
      total_row: "",
      total_seat: "",
      ticket_price: "",
    },
  ]);

  console.log(ticket);

  const addForm = () => {
    const newForm = {
      id: countForm + 1,
      dateEvent: "",
    };
    setEventDate([...eventDate, newForm]);
    setCountForm(countForm + 1);
  };

  const addTicket = () => {
    const newTicket = {
      id: countTicket + 1,
      name_ticket: "",
      total_row: "",
      total_chair: "",
      ticket_price: "",
    };
    setTicket([...ticket, newTicket]);
    setTountTicket(countTicket + 1);
  };

  const removeForm = (formId) => {
    const updatedForms = eventDate.filter((form) => form.id !== formId);
    setEventDate(updatedForms);
  };

  const removeTicket = (ticketId) => {
    const updateTicket = ticket.filter((form) => form.id !== ticketId);
    setTicket(updateTicket);
  };

  const handleDateChange = (event, formId) => {
    const updatedForms = eventDate.map((form) => {
      if (form.id === formId) {
        return { ...form, dateEvent: event.target.value };
      }
      return form;
    });

    setEventDate(updatedForms);
  };

//Value Name Ticket
  const handleNameTicketChange = (event, formId) => {
    const updatedForms = ticket.map((form) => {
      if (form.id === formId) {
        return { ...form, name_ticket: event.target.value };
      }
      return form;
    });

    setTicket(updatedForms);
  };
//Value Price Ticket
  const handlePriceTicketChange = (event, formId) => {
    const updatedForms = ticket.map((form) => {
      if (form.id === formId) {
        return { ...form, ticket_price: event.target.value };
      }
      return form;
    });

    setTicket(updatedForms);
  };
//Value Total Row
  const handleTotalRowChange = (event, formId) => {
    const updatedForms = ticket.map((form) => {
      if (form.id === formId) {
        return { ...form, total_row: event.target.value };
      }
      return form;
    });

    setTicket(updatedForms);
  };
//Value Total seat
  const handleTotalSeatChange = (event, formId) => {
    const updatedForms = ticket.map((form) => {
      if (form.id === formId) {
        return { ...form, total_seat: event.target.value };
      }
      return form;
    });

    setTicket(updatedForms);
  };

  return (
    <>
      <Grid fullwidth>
        <Grid style={{ display: "flex", justifyContent: "start" }}>
          <h2>Choose Layout</h2>
        </Grid>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Grid style={{ display: "flex", justifyContent: "start" }}>
          <h2>New event</h2>
        </Grid>

        <Grid fullWidth>
          {eventDate.map((form) => (
            <Grid className="formEventDate" key={form.id}>
              <Grid className="headerFormEventDate" fullWidth>
                <p style={{ margin: "0px" }}>Event Date {form.id}</p>
                <Button variant="contained" onClick={() => removeForm(form.id)}>
                  Delete Form
                </Button>
              </Grid>

              <Grid className="bodyFormEventDate" fullWidth>
                <Grid style={{ width: "48%", display: "flex" }}>
                  <p>Date and time start &nbsp;&nbsp;</p>
                  <TextField
                    style={{ width: "70%" }}
                    type="datetime-local"
                    label=""
                    variant="outlined"
                    name="dateEvent"
                    value={eventDate.dateEvent}
                    onChange={(e) => handleDateChange(e, form.id)}
                  />
                </Grid>
              </Grid>

              {/* CREATE TICKET */}
              <Grid className="formTicketTitle">
                <h2 style={{ margin: "0px" }}>New Ticket</h2>
              </Grid>
              {ticket.map((form) => (
                <Grid className="formTicket" key={form.id}>
                  <Grid className="headerFormTicket" fullWidth>
                    <TextField
                      style={{
                        width: "80%",
                        backgroundColor: "white",
                        border: "none",
                      }}
                      type="text"
                      label="Name Ticket"
                      variant="filled"
                      name="name_ticket"
                      value={ticket.name_ticket}
                      onChange={(e) => handleNameTicketChange(e, form.id)}
                    />
                    <Button
                      variant="contained"
                      onClick={() => removeTicket(form.id)}
                    >
                      Delete Ticket
                    </Button>
                  </Grid>

                  <Grid className="bodyFormTicket" fullWidth>
                    <Grid
                      className="boxTicket"
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <p>Price &nbsp;(VND)</p>
                      <TextField
                        style={{
                          marginBottom: "10px",
                          width: "80%",
                        }}
                        type="text"
                        label=""
                        variant="outlined"
                        name="ticket_price"
                        value={ticket.ticket_price}
                        onChange={(e) => handlePriceTicketChange(e, form.id)}
                      />
                    </Grid>
                    <Grid
                      className="boxTicket"
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <p>Total row</p>
                      <TextField
                        style={{
                          marginBottom: "10px",
                          width: "80%",
                        }}
                        type="text"
                        label=""
                        variant="outlined"
                        name="total_row"
                        value={ticket.total_row}
                        onChange={(e) => handleTotalRowChange(e, form.id)}
                      />
                    </Grid>
                    <Grid
                      className="boxTicket"
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <p>Total seat of row</p>
                      <TextField
                        style={{ width: "80%" }}
                        type="text"
                        label=""
                        variant="outlined"
                        name="total_seat"
                        value={ticket.total_seat}
                        onChange={(e) => handleTotalSeatChange(e, form.id)}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="DateFormTicket" fullWidth>
                    <Grid style={{ width: "48%", display: "flex" }}>
                      <p>Start sale date &nbsp;</p>
                      <TextField
                        style={{ width: "70%" }}
                        type="date"
                        label=""
                        variant="outlined"
                        // value={}
                      />
                    </Grid>
                    <Grid style={{ width: "48%", display: "flex" }}>
                      <p>End sale date &nbsp;</p>
                      <TextField
                        style={{ width: "70%" }}
                        type="date"
                        label=""
                        variant="outlined"
                        // value={}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              <Grid style={{ border: "1px solid #ccc", margin: "20px" }}>
                <Button fullWidth onClick={addTicket}>
                  Add Ticket
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid style={{ border: "1px solid #ccc" }}>
            <Button fullWidth onClick={addForm}>
              Add Another Event Time
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateTicket;
