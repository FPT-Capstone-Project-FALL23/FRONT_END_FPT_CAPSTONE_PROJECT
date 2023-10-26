import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import { handleFileInputChange } from "../Client/ProfileClient";
import "../../Assets/CSS/Organizer/CreateTiket.css";
import ApiEvent from "../../API/Event/ApiEvent";
import InputCustom from "../../Components/Common/Input/InputCustom";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 400,
  maxHeight: 400,
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateTicket() {
  const [countForm, setCountForm] = useState(1);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const location = useLocation();

  const { newEvent } = location.state;

  console.log(newEvent);

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const [eventDate, setEventDate] = useState([
    {
      date_number: 1,
      dateEvent: "",
      tickets: [
        {
          id: Date.now(),
          name_ticket: "",
          total_row: "",
          ticket_price: "",
          rows: [
            {
              row_name: "",
              total_seat: "",
            },
          ],
        },
      ],
    },
  ]);

  const [tickets, setTickets] = useState([
    {
      id: Date.now(),
      name_ticket: "",
      total_row: "",
      ticket_price: "",
      rows: [],
    },
  ]);

  const [eventInfo, setEventInfo] = useState({
    event_name: newEvent.event_name,
    type_of_event: newEvent.type_of_event.join(", "),
    eventImage: newEvent.eventImage,
    type_layout: "",
    event_description: newEvent.event_description,
    sales_date: {
      start_sale_date: newEvent.start_sale_date,
      end_sale_date: newEvent.end_sale_date,
    },
    event_location: {
      city: newEvent.address.city,
      district: newEvent.address.district,
      ward: newEvent.address.ward,
      specific_address: newEvent.address.specific_address,
    },
    event_date: [
      {
        date_number: "",
        dateEvent: "",
        event_areas: [
          {
            name_areas: "",
            total_row: "",
            ticket_price: "",
            rows: [
              {
                row_name: "",
                total_chair: "",
              },
            ],
          },
        ],
      },
    ],
    isActive: false,
  });

  const updatedEventInfo = {
    ...eventInfo, // Giữ nguyên các thuộc tính hiện tại của eventInfo
    event_date: eventDate.map((date) => ({
      day_number: date.date_number,
      date: date.dateEvent,
      event_areas: date.tickets.map((ticket) => ({
        name_areas: ticket.name_ticket,
        total_row: ticket.total_row,
        ticket_price: ticket.ticket_price,
        rows: ticket.rows.map((row) => ({
          row_name: row.row_name,
          total_chair: row.total_seat,
        })),
      })),
    })),
  };

  console.log(eventInfo);

  const addForm = () => {
    const newForm = {
      date_number: countForm + 1,
      dateEvent: "",
      tickets: [],
    };
    setEventDate([...eventDate, newForm]);
    setCountForm(countForm + 1);
    setEventInfo(updatedEventInfo);
  };

  const addTicket = (formId) => {
    const updatedEventDates = eventDate.map((form) => {
      console.log(form.date_number);
      console.log(formId);
      if (form.date_number === formId) {
        const newTicket = {
          id: Date.now(),
          name_ticket: "",
          total_row: "",
          ticket_price: "",
          rows: [],
        };
        setTickets([...form.tickets, newTicket]);
        return {
          ...form,
          tickets: [...form.tickets, newTicket],
        };
      } else {
        return form;
      }
    });

    setEventDate(updatedEventDates);
  };

  const removeForm = (formId) => {
    const updatedForms = eventDate.filter(
      (form) => form.date_number !== formId
    );
    setEventDate(updatedForms);
  };

  //Lỗi ID form
  const removeTicket = (ticketId) => {
    const updateTicket = tickets.filter(
      (formTicket) => formTicket.id !== ticketId
    );
    setTickets(updateTicket);
  };

  const handleDateChange = (event, formId) => {
    const updatedEventDates = eventDate.map((form) => {
      if (form.date_number === formId) {
        const newDate = event instanceof Date ? event : event.target.value;
        return { ...form, dateEvent: newDate };
      }
      return form;
    });
    setEventDate(updatedEventDates);
  };

  //Value Name Ticket
  const handleNameTicketChange = (event, formId, ticketId) => {
    const updatedEventDates = eventDate.map((form) => {
      if (form.date_number === formId) {
        const updatedTickets = form.tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return { ...ticket, name_ticket: event.target.value };
          }
          return ticket;
        });
        return { ...form, tickets: updatedTickets };
      }
      return form;
    });
    setEventDate(updatedEventDates);
  };

  //Value Price Ticket
  const handlePriceTicketChange = (event, formId, ticketId) => {
    setEventDate((prevEventDate) =>
      prevEventDate.map((form) => {
        if (form.date_number === formId) {
          return {
            ...form,
            tickets: form.tickets.map((ticket) => {
              if (ticket.id === ticketId) {
                return { ...ticket, ticket_price: event.target.value };
              }
              return ticket;
            }),
          };
        }
        return form;
      })
    );
  };

  //Value Total Row
  const handleTotalRowChange = (event, formId, ticketId) => {
    const updatedEventDates = eventDate.map((form) => {
      if (form.date_number === formId) {
        const updatedTickets = form.tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return { ...ticket, total_row: event.target.value };
          }
          return ticket;
        });
        return { ...form, tickets: updatedTickets };
      }
      return form;
    });
    setEventDate(updatedEventDates);
  };

  const handleOpen = (ticketId) => {
    const updatedEventDate = eventDate.map((event) => {
      return {
        ...event,
        tickets: event.tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            const totalRow = parseInt(ticket.total_row, 10); // Chuyển TotalRow thành số nguyên
            const updatedRows = [];
            for (let i = 0; i < totalRow; i++) {
              updatedRows.push({
                // id: Date.now(),
                row_name: alphabet[i], // Sử dụng ký tự từ mảng alphabet
                total_seat: "",
              });
            }
            return {
              ...ticket,
              rows: updatedRows,
            };
          }
          return ticket;
        }),
      };
    });
    setEventDate(updatedEventDate);
    setOpen(true);
  };

  // Hàm cập nhật số lượng ghế của một hàng
  const updateSeatCountInRow = (ticket, rowIndex, newSeatCount) => {
    return ticket.rows.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          total_seat: newSeatCount,
        };
      }
      return row;
    });
  };

  // Hàm cập nhật danh sách hàng cho một vé
  const updateRowsInTicket = (ticket, rowIndex, newSeatCount) => {
    const updatedRows = updateSeatCountInRow(ticket, rowIndex, newSeatCount);
    return {
      ...ticket,
      rows: updatedRows,
    };
  };

  // Hàm cập nhật danh sách vé trong biểu mẫu sự kiện
  const updateTicketsInForm = (form, ticketId, rowIndex, newSeatCount) => {
    return form.tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return updateRowsInTicket(ticket, rowIndex, newSeatCount);
      }
      return ticket;
    });
  };

  // Hàm cập nhật biểu mẫu sự kiện chứa thông tin vé đã được cập nhật
  const updateEventDate = (formId, ticketId, rowIndex, newSeatCount) => {
    const updatedEventDates = eventDate.map((form) => {
      if (form.date_number === formId) {
        return {
          ...form,
          tickets: updateTicketsInForm(form, ticketId, rowIndex, newSeatCount),
        };
      }
      return form;
    });
    setEventDate(updatedEventDates);
    setEventInfo(updatedEventInfo);
  };

  // Hàm xử lý sự kiện thay đổi số lượng ghế của một hàng
  const handleSeatChange = (event, formId, ticketId, rowIndex) => {
    const newSeatCount = event.target.value;
    updateEventDate(formId, ticketId, rowIndex, newSeatCount);
    setEventInfo(updatedEventInfo);
  };

  const handleClose = () => {
    setOpen(false);
    setEventInfo(updatedEventInfo);
  };

  console.log(eventDate);

  const callApiCreateEvent = async (_idOrganizer, eventInfo) => {
    try {
      const respont = await ApiEvent.createEvent({
        _idOrganizer: "65129684a666ee1a54b54232",
        eventInfo: eventInfo,
      });
      console.log(respont.status);
      console.log(respont.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    callApiCreateEvent("65129684a666ee1a54b54232", eventInfo);
  };

  return (
    <>
      <Grid fullwidth>
        <FormSubmit onSubmit={handleFormSubmit}>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>Add Photo Layout</h3>
          </Grid>
          <Grid
            style={{
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                height: "500px",
                width: "80%",
                borderRadius: "0px",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                src={avatar}
                alt=""
              />
            </Avatar>

            <MonochromePhotosIcon
              style={{
                marginLeft: "50%",
                fontSize: "60px",
                marginTop: "-25px",
                position: "relative",
              }}
              onClick={handleIconClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileInputChange(e, setSelectedFile, setAvatar)
              }
            />
          </Grid>

          <Stack
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Stack style={{ width: "45%" }}>
              <InputCustom
                type="date"
                id="start_sale_date"
                name="start_sale_date"
                value={newEvent.start_sale_date}
                // setValue={(value) =>
                //   handleInputChange("start_sale_date", value)
                // }
                label="Start Date"
              />
            </Stack>
            <Stack style={{ width: "45%" }}>
              <InputCustom
                type="date"
                id="end_sale_date"
                name="end_sale_date"
                value={newEvent.end_sale_date}
                // setValue={(value) => handleInputChange("end_sale_date", value)}
                label="End Date"
              />
            </Stack>
          </Stack>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>Event Time</h3>
          </Grid>

          <Grid fullWidth>
            {eventDate?.map((form) => (
              <Grid className="formEventDate" key={form.date_number}>
                <Grid className="headerFormEventDate" fullWidth>
                  <p style={{ margin: "0px" }}>Event Date {form.date_number}</p>
                  <Button
                    variant="contained"
                    onClick={() => removeForm(form.date_number)}
                  >
                    Delete Form
                  </Button>
                </Grid>

                <Grid className="bodyFormEventDate" fullWidth>
                  <Grid
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ display: "flex", alignItems: "center" }}>
                      Date and time start &nbsp;&nbsp;
                    </p>
                    <TextField
                      style={{ width: "50%" }}
                      type="datetime-local"
                      label=""
                      variant="outlined"
                      name="dateEvent"
                      value={form.dateEvent}
                      onChange={(e) => handleDateChange(e, form.date_number)}
                    />
                  </Grid>
                </Grid>

                {/* CREATE TICKET */}
                <Grid className="formTicketTitle">
                  <h3 style={{ margin: "0px" }}>New Ticket</h3>
                </Grid>
                {form.tickets?.map((formTicket) => (
                  <Grid className="formTicket" key={formTicket.id}>
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
                        value={formTicket.name_ticket}
                        onChange={(e) =>
                          handleNameTicketChange(
                            e,
                            form.date_number,
                            formTicket.id
                          )
                        }
                      />
                      <Button
                        variant="contained"
                        onClick={() => removeTicket(formTicket.id)}
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
                          value={formTicket.ticket_price}
                          onChange={(e) =>
                            handlePriceTicketChange(
                              e,
                              form.date_number,
                              formTicket.id
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        className="boxTicket"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <p>Total row</p>
                        <Grid
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <TextField
                            style={{
                              marginBottom: "10px",
                              width: "50%",
                            }}
                            type="text"
                            label=""
                            variant="outlined"
                            name="total_row"
                            value={formTicket.total_row}
                            onChange={(e) =>
                              handleTotalRowChange(
                                e,
                                form.date_number,
                                formTicket.id
                              )
                            }
                          />

                          <Grid className="enterSeat">
                            <Button onClick={() => handleOpen(formTicket.id)}>
                              Enter seats
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Grid fullWidth>
                                  {formTicket.rows.map((row, index) => (
                                    <Grid
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      key={row.id}
                                    >
                                      <Typography style={{ width: "20%" }}>
                                        Row &nbsp;{row.row_name} &nbsp;
                                      </Typography>
                                      <TextField
                                        style={{
                                          marginBottom: "10px",
                                          width: "70%",
                                        }}
                                        type="text"
                                        label=""
                                        variant="outlined"
                                        name="total_seat"
                                        value={row.total_seat} // Thêm value để hiển thị giá trị của seat
                                        onChange={(e) =>
                                          handleSeatChange(
                                            e,
                                            form.date_number,
                                            formTicket.id,
                                            index
                                          )
                                        }
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            </Modal>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid className="DateFormTicket" fullWidth>
                      <Grid style={{ width: "48%", display: "flex" }}>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          Start sale date &nbsp;
                        </p>
                        <TextField
                          style={{ width: "70%" }}
                          type="date"
                          label=""
                          variant="outlined"
                          // value={}
                        />
                      </Grid>
                      <Grid style={{ width: "48%", display: "flex" }}>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          End sale date &nbsp;
                        </p>
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

                <Grid style={{ border: "1px dashed black", margin: "20px" }}>
                  <Button
                    className="buttonCreateEvent"
                    fullWidth
                    onClick={() => addTicket(form.date_number)}
                  >
                    Add Ticket
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid style={{ border: "1px dashed black" }}>
              <Button className="buttonCreateEvent" fullWidth onClick={addForm}>
                Add Another Event Time
              </Button>
            </Grid>
          </Grid>
          <Grid
            style={{ border: "1px solid black", margin: "20px 0px 20px 0px" }}
          >
            <Button className="buttonCreateEvent" fullWidth type="submit">
              create event
            </Button>
          </Grid>
        </FormSubmit>
      </Grid>
    </>
  );
}

export default CreateTicket;
