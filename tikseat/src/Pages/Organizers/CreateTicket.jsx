import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import "../../Assets/CSS/Organizer/CreateTiket.css";
import ApiEvent from "../../API/Event/ApiEvent";
import InputCustom from "../../Components/Common/Input/InputCustom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import WarningIcon from "@mui/icons-material/Warning";
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
  setLocalStorageTicketInfo,
  getLocalStorageTicketInfo,
  getLocalStorageEventInfo,
} from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

export const validateFile = (fileName) => {
  const fileExtensionRegex =
    /^.*\.(jpg|jpeg|png|gif|tiff|psd|eps|ai|heic|raw|svg)$/i;
  return fileExtensionRegex.test(fileName);
};

const CreateTicket = () => {
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();

  function updateDataEventInfo() {
    const newDataEventInfo = getLocalStorageTicketInfo();
    dataTicketInfo = newDataEventInfo;
  }
  // Sự kiện storage sẽ được kích hoạt mỗi khi có thay đổi trong localStorage
  window.addEventListener("storage", (event) => {
    if (event.key === "eventInfo") {
      updateDataEventInfo();
    }
  });
  // Khởi tạo dataEventInfo ban đầu
  let dataTicketInfo = getLocalStorageTicketInfo();

  function updateDataEventInfo() {
    const newDataEventInfo = getLocalStorageEventInfo();
    dataEventInfo = newDataEventInfo;
  }
  // Sự kiện storage sẽ được kích hoạt mỗi khi có thay đổi trong localStorage
  window.addEventListener("storage", (event) => {
    if (event.key === "eventInfo") {
      updateDataEventInfo();
    }
  });
  // Khởi tạo dataEventInfo ban đầu
  let dataEventInfo = getLocalStorageEventInfo();

  const navigate = useNavigate();

  const alphabet = "ABCDEFGHIJKLMNOPQRST".split("");
  const [selectedFile, setSelectedFile] = useState("");
  const fileInputRef = useRef("");
  const today = new Date().toISOString().slice(0, 10);
  const [typeLayout, setTypeLayout] = useState(
    dataEventInfo?.type_layout || null
  );
  const [fileError, setFileError] = useState(null);

  const [errorDateEvent, setErrorDateEvent] = useState(false);
  const [errorStartSaleDate, setErrorStartSaleDate] = useState(false);
  const [errorEndSaleDate, setErrorEndSaleDate] = useState(false);
  const [messErrorStart, setMessErrorStart] = useState("");
  const [messErrorEnd, setMessErrorEnd] = useState("");
  const [errorInputPrice, setErrorInputPrice] = useState(false);
  const [errorInputTotalRow, setErrorInputTotalRow] = useState(false);

  //socket
  const socket = io(URL_SOCKET, { transports: ["websocket"] });
  const organizerId = dataInfo._id;
  const organizerName = dataInfo.organizer_name;

  function formatNumber(n) {
    // Check if n is a string
    if (typeof n !== "string") {
      n = String(n);
    }
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatString(n) {
    // Kiểm tra xem n có phải là chuỗi không
    if (typeof n === "string" || n instanceof String) {
      return n.replace(/,/g, "");
    } else {
      n = String(n);
      return n.replace(/,/g, "");
    }
  }

  useEffect(() => {
    socket?.emit("organizerId", organizerId);
  }, [socket, organizerId]);

  const handleNewEvent = () => {
    socket.emit("new_event", {
      senderName: organizerName,
      receiverName: "6544b5f73dd2f66548b5d85a",
    });
  };

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e, setSelectedFile, setTypeLayout) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (validateFile(selectedFile.name)) {
        setSelectedFile(selectedFile);
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          setTypeLayout(reader.result);
        };
        setFileError("")
      } else {
        setSelectedFile(null);
        setTypeLayout("");
        setFileError(
          "File input have format:(.jpg, .jpeg, .png, .gif, .ai, ...)"
        );
      }
    }
  };

  const [maxTicket, setMaxTicket] = useState(
    dataTicketInfo?.maxTicketInOrder || "5"
  );

  const defaultEventDate = dataTicketInfo?.event_date
    ? dataTicketInfo.event_date.map((eventDate) => {
        return {
          date_number: eventDate?.date_number,
          dateEvent: eventDate?.dateEvent,
          tickets: eventDate?.event_areas?.map((ticket) => {
            return {
              id_ticket: ticket?.id_areas,
              name_ticket: ticket?.name_areas,
              total_row: ticket?.total_row,
              ticket_price: ticket?.ticket_price,
              rows: ticket?.rows?.map((row) => {
                return {
                  row_name: row?.row_name,
                  total_seat: row?.total_chair,
                };
              }),
            };
          }),
        };
      })
    : [
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
      ];
  const [eventDate, setEventDate] = useState(defaultEventDate);

  const [saleDate, setSaleDate] = useState({
    startSaleDate: dataTicketInfo?.sales_date?.start_sales_date || today,
    endSaleDate: (() => {
      const nextDay = () => {
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        return nextDay;
      };
      const tomorrow = nextDay();
      const nextDayyyy = tomorrow.toISOString().split("T")[0];
      const finalStartSaleDate =
        dataTicketInfo?.sales_date?.end_sales_date || nextDayyyy;
      return finalStartSaleDate;
    })(),
  });

  const [eventInfo, setEventInfo] = useState({
    event_name: dataEventInfo?.event_name || "",
    type_of_event: dataEventInfo?.type_of_event || "",
    eventImage: dataEventInfo?.eventImage || "",
    type_layout: "",
    event_description: dataEventInfo?.event_description || "",
    maxTicketInOrder: maxTicket,
    sales_date: {
      start_sales_date: saleDate?.startSaleDate,
      end_sales_date: saleDate?.endSaleDate,
    },
    event_location: {
      city: dataEventInfo?.address?.city || "",
      district: dataEventInfo?.address?.district || "",
      ward: dataEventInfo?.address?.ward || "",
      specific_address: dataEventInfo?.address?.specific_address || "",
    },
    event_date: eventDate
      ? eventDate.map((event) => ({
          date_number: event.date_number,
          dateEvent: event.dateEvent,
          event_areas: event.tickets.map((area) => ({
            id_areas: area.id_ticket,
            name_areas: area.name_ticket,
            total_row: area.total_row,
            ticket_price: area.ticket_price,
            rows: area.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_seat,
            })),
          })),
        }))
      : [],
    isActive: false,
  });

  const [eventInfoData, setEventInfoData] = useState({
    event_name: eventInfo.event_name,
    type_of_event: eventInfo.type_of_event,
    eventImage: eventInfo.eventImage,
    type_layout: eventInfo.type_layout,
    event_description: eventInfo.event_description,
    maxTicketInOrder: eventInfo.maxTicketInOrder,
    sales_date: {
      start_sales_date: eventInfo.sales_date.start_sales_date,
      end_sales_date: eventInfo.sales_date.end_sales_date,
    },
    event_location: {
      city: eventInfo.event_location.city,
      district: eventInfo.event_location.district,
      ward: eventInfo.event_location.ward,
      specific_address: eventInfo.event_location.specific_address,
    },
    event_date: eventInfo.event_date
      ? eventInfo.event_date.map((event) => ({
          date_number: event.date_number,
          dateEvent: event.dateEvent,
          event_areas: event.event_areas.map((area) => ({
            name_areas: area.name_areas,
            total_row: area.total_row,
            ticket_price: formatString(area.ticket_price),
            rows: area.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_chair,
            })),
          })),
        }))
      : [],
    isActive: false,
  });

  useEffect(() => {
    setEventInfoData((prevData) => ({
      ...prevData,
      event_name: eventInfo.event_name,
      type_of_event: eventInfo.type_of_event,
      eventImage: eventInfo.eventImage,
      type_layout: eventInfo.type_layout,
      event_description: eventInfo.event_description,
      maxTicketInOrder: eventInfo.maxTicketInOrder,
      sales_date: {
        start_sales_date: eventInfo.sales_date.start_sales_date,
        end_sales_date: eventInfo.sales_date.end_sales_date,
      },
      event_location: {
        city: eventInfo.event_location.city,
        district: eventInfo.event_location.district,
        ward: eventInfo.event_location.ward,
        specific_address: eventInfo.event_location.specific_address,
      },
      event_date: eventInfo.event_date
        ? eventInfo.event_date.map((event) => ({
            date_number: event.date_number,
            dateEvent: event.dateEvent,
            event_areas: event.event_areas.map((area) => ({
              name_areas: area.name_areas,
              total_row: area.total_row,
              ticket_price: formatString(area.ticket_price),
              rows: area.rows.map((row) => ({
                row_name: row.row_name,
                total_chair: row.total_chair,
              })),
            })),
          }))
        : [],
    }));
  }, [eventInfo]);

  useEffect(() => {
    setEventInfo((prevEvent) => ({
      ...prevEvent,
      type_layout: typeLayout || "",
    }));
  }, [typeLayout]);

  const updateDetailTicket = (update) => {
    setEventInfo((prevEventInfo) => {
      const updatedEventInfo = { ...prevEventInfo };
      updatedEventInfo.event_date = update.map((form) => ({
        date_number: form.date_number,
        dateEvent: form.dateEvent,
        event_areas: form.tickets.map((ticket) => ({
          name_areas: ticket.name_ticket,
          total_row: ticket.total_row,
          ticket_price: ticket.ticket_price,
          rows: ticket.rows.map((row) => ({
            row_name: row.row_name,
            total_chair: row.total_seat,
          })),
        })),
      }));
      return updatedEventInfo;
    });
  };

  const addForm = () => {
    const newForm = {
      date_number: eventDate.length + 1,
      dateEvent: "",
      tickets: [],
    };
    setEventDate((prevEventDate) => {
      const updatedEventDate = [...prevEventDate, newForm];
      updateDetailTicket(updatedEventDate);

      return updatedEventDate;
    });
  };

  const addTicket = (formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const newTicket = {
            id: Date.now(),
            name_ticket: "",
            total_row: "",
            ticket_price: "",
            rows: [],
          };
          return {
            ...form,
            tickets: [...form.tickets, newTicket],
          };
        } else {
          return form;
        }
      });
      updateDetailTicket(updatedEventDates);
      return updatedEventDates;
    });
  };

  const removeForm = (formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDate = prevEventDate.filter(
        (form) => form.date_number !== formId
      );
      updateDetailTicket(updatedEventDate);
      return updatedEventDate;
    });
  };

  const removeTicket = (ticketIdToRemove, formId) => {
    setEventDate((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData.forEach((form) => {
        if (form.date_number === formId && form.tickets) {
          form.tickets = form.tickets.filter(
            (formTicket) => formTicket.id !== ticketIdToRemove
          );
        }
      });
      updateDetailTicket(updatedFormData);
      return updatedFormData;
    });
  };

  const handleSaleDateChange = (name, value) => {
    let endDay = new Date(saleDate.endSaleDate);
  
    if (name === "startSaleDate" && value < today) {
      setMessErrorStart("StartDay must be greater than the current ");
      setErrorStartSaleDate(true);
      return;
    } else if (name === "startSaleDate" && value > saleDate.endSaleDate) {
      setMessErrorStart("StartDay is not greater than the endDate");
      setSaleDate({ ...saleDate, [name]: value });
      setErrorStartSaleDate(true);
      return;
    } else if (name === "endSaleDate") {
      const timeDiff = Math.abs(endDay.getTime() - new Date(value).getTime());
      const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
      if (dayDiff > 30) {
        setErrorStartSaleDate(true);
        setErrorEndSaleDate(true);
        setSaleDate({ ...saleDate, [name]: value });
        setMessErrorEnd("Ticket sale time must not exceed 30 days");
        setMessErrorStart("Ticket sale time must not exceed 30 days");
        return;
      }else if (name === "endSaleDate" && value <= saleDate.startSaleDate) {
        setMessErrorEnd("EndDay must greater than the startDay");
        setSaleDate({ ...saleDate, [name]: value });
        setErrorEndSaleDate(true);
        return;
      }
    } 
  
    setSaleDate({ ...saleDate, [name]: value });
    setErrorStartSaleDate(false);
    setErrorEndSaleDate(false);
  };
  



  useEffect(() => {
    const updatedEventInfo = {
      ...eventInfo,
      sales_date: {
        start_sales_date: saleDate.startSaleDate,
        end_sales_date: saleDate.endSaleDate,
      },
    };
    setEventInfo(updatedEventInfo);
  }, [saleDate]);

  const handleMaxTicketChange = (value) => {
    setMaxTicket(value);
  };

  useEffect(() => {
    const updatedEventInfo = {
      ...eventInfo,
      maxTicketInOrder: maxTicket,
    };
    setEventInfo(updatedEventInfo);
  }, [maxTicket]);

  const handleDateChange = (event, formId) => {
    let dateEvent = new Date(event.target.value);
    let formatDateEvent = dateEvent.toISOString().split("T")[0];
    const endSale = saleDate.endSaleDate;
    if (formatDateEvent <= endSale) {
      setErrorDateEvent(true);
    } else {
      setEventDate((prevEventDate) => {
        const updatedEventDates = prevEventDate.map((form) => {
          if (form.date_number === formId) {
            const newDate = event instanceof Date ? event : event.target.value;
            return { ...form, dateEvent: newDate };
          } else {
            return form;
          }
        });

        updateDetailTicket(updatedEventDates);

        return updatedEventDates;
      });
      setErrorDateEvent(false);
    }
  };

  //Value Name Ticket
  const handleNameTicketChange = (event, formId, ticketId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id === ticketId) {
              return { ...ticket, name_ticket: event.target.value };
            } else {
              return ticket;
            }
          });
          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventDates);
      return updatedEventDates;
    });
  };

  //Value Price Ticket
  const handlePriceTicketChange = (event, formId, ticketId) => {
    const inputValue = formatString(event.target.value);
    const newPrice = parseFloat(inputValue);

  if (newPrice > 1000) {
    setErrorInputPrice(false)
    setEventDate((prevEventDate) => {
      const updatedEventTicket = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id === ticketId) {
              return { ...ticket, ticket_price: event.target.value };
            } else {
              return ticket;
            }
          });

          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventTicket);
      return updatedEventTicket;
    });
  } else {
    setEventDate((prevEventDate) => {
      const updatedEventTicket = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id === ticketId) {
              return { ...ticket, ticket_price: event.target.value };
            } else {
              return ticket;
            }
          });

          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventTicket);
      return updatedEventTicket;
    });
    setErrorInputPrice(true)
  }
  };

  //Value Total Row
  const handleTotalRowChange = (event, formId, ticketId) => {
    const inputTotalRow = parseFloat(event.target.value);

    if (inputTotalRow <= 0 || inputTotalRow > 20) {
      setErrorInputTotalRow(true)
      setEventDate((prevEventDate) => {
        const updatedEventRows = prevEventDate.map((form) => {
          if (form.date_number === formId) {
            const updatedTickets = form.tickets.map((ticket) => {
              if (ticket.id === ticketId) {
                const rowChange = "20";
                const totalRow = parseInt(rowChange, 10); // Chuyển TotalRow thành số nguyên
                const updatedRows = [];
                for (let i = 0; i < totalRow; i++) {
                  updatedRows.push({
                    row_name: alphabet[i],
                    total_seat: "",
                  });
                }
                return { ...ticket, total_row: rowChange, rows: updatedRows };
              } else {
                return ticket;
              }
            });
  
            return { ...form, tickets: updatedTickets };
          } else {
            return form;
          }
        });
        updateDetailTicket(updatedEventRows);
  
        return updatedEventRows;
      });
    } else {
      setEventDate((prevEventDate) => {
        setErrorInputTotalRow(false)
        const updatedEventRows = prevEventDate.map((form) => {
          if (form.date_number === formId) {
            const updatedTickets = form.tickets.map((ticket) => {
              if (ticket.id === ticketId) {
                const rowChange = event.target.value;
                const totalRow = parseInt(rowChange, 10); // Chuyển TotalRow thành số nguyên
                const updatedRows = [];
                for (let i = 0; i < totalRow; i++) {
                  updatedRows.push({
                    row_name: alphabet[i],
                    total_seat: "",
                  });
                }
                return { ...ticket, total_row: rowChange, rows: updatedRows };
              } else {
                return ticket;
              }
            });
  
            return { ...form, tickets: updatedTickets };
          } else {
            return form;
          }
        });
        updateDetailTicket(updatedEventRows);
  
        return updatedEventRows;
      });
    }
    
  };

  const handleSeatChange = (event, formId, ticketId, rowIndex) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id === ticketId) {
              const updatedRows = ticket.rows.map((row, index) => {
                if (index === rowIndex) {
                  return { ...row, total_seat: event.target.value };
                }
                return row;
              });
              return { ...ticket, rows: updatedRows };
            }
            return ticket;
          });
          return { ...form, tickets: updatedTickets };
        }
        return form;
      });

      updateDetailTicket(updatedEventDates);

      return updatedEventDates;
    });
  };

  useEffect(() => {
    setLocalStorageTicketInfo(eventInfoData);
  }, [eventInfoData]);

  const callApiCreateEvent = async (_idOrganizer, eventInfo) => {
    try {
      const response = await ApiEvent.createEvent({
        _idOrganizer: organizerId,
        eventInfo: eventInfo,
      });
      if (response.status === true) {
        handleNewEvent();
        toast.success("New Event success!", toastOptions);
        navigate("/success");
        setLocalStorageTicketInfo([]);
      } else {
        console.log("error");
      }
    } catch (error) {
      toast.error(error, toastOptions);
    }
  };

  const isEventInfoDataValid = () => {
    for (const key in eventInfoData) {
      if (eventInfoData.hasOwnProperty(key) && eventInfoData[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isEventInfoDataValid()) {
      callApiCreateEvent(organizerId, eventInfoData);
    } else {
      toast.error("You must fill in all information", toastOptions);
    }
  };

  return (
    <>
      <Grid
        fullwidth
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <FormSubmit onSubmit={handleFormSubmit}>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>
              {eventInfo.type_layout !== "" ? (
                <OfflinePinIcon
                  sx={{
                    color: "green",
                    fontSize: "30px",
                    marginBottom: "-8px",
                  }}
                />
              ) : (
                <WarningIcon
                  sx={{ color: "red", fontSize: "30px", marginBottom: "-8px" }}
                />
              )}
              Add Photo Layout
            </h3>
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
                src={typeLayout}
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
                handleFileInputChange(e, setSelectedFile, setTypeLayout)
              }
            />
          </Grid>
          {fileError && (
            <Grid
              style={{
                color: "red",
                marginTop: "-35px",
                marginBottom: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>{fileError}</p>
            </Grid>
          )}
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>
              {eventInfo.maxTicketInOrder !== "" && errorStartSaleDate === false && errorEndSaleDate === false ? (
                <OfflinePinIcon
                  sx={{
                    color: "green",
                    fontSize: "30px",
                    marginBottom: "-8px",
                  }}
                />
              ) : (
                <WarningIcon
                  sx={{ color: "red", fontSize: "30px", marginBottom: "-8px" }}
                />
              )}
              Add Information Ticket
            </h3>
          </Grid>
          <Grid
            style={{
              padding: "30px",
              border: "1px solid black",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3>Max Ticket In Order</h3>
              </Grid>
              <Grid
                style={{
                  padding: "30px",
                  border: "1px solid black",
                  width: "100%",
                }}
              >
                <Stack>
                  <InputCustom
                    type="text"
                    id="maxTicket"
                    name="maxTicket"
                    value={maxTicket}
                    setValue={handleMaxTicketChange}
                    label="Max Ticket In Order"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid style={{ width: "70%" }}>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3>
                  Sale Event date (Ticket sale time must not exceed 30 days)
                </h3>
              </Grid>
              <Grid
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "30px 30px 8px 30px",
                  border: "1px solid black",
                }}
              >
                <Stack style={{ width: "45%" }}>
                  <TextField
                    type="date"
                    id="startSaleDate"
                    name="startSaleDate"
                    value={saleDate.startSaleDate}
                    onChange={(e) =>
                      handleSaleDateChange("startSaleDate", e.target.value)
                    }
                    label="Start Date"
                    error={errorStartSaleDate}
                    helperText={errorStartSaleDate ? messErrorStart : " "}
                  />
                </Stack>
                <Stack style={{ width: "45%" }}>
                  <TextField
                    type="date"
                    id="endSaleDate"
                    name="endSaleDate"
                    value={saleDate.endSaleDate}
                    onChange={(e) =>
                      handleSaleDateChange("endSaleDate", e.target.value)
                    }
                    label="End Date"
                    error={errorEndSaleDate}
                    helperText={errorEndSaleDate ? messErrorEnd : " "}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>Event Time</h3>
          </Grid>

          <Grid fullWidth>
            {eventDate?.map((form) => (
              <Grid className="formEventDate" key={form.date_number}>
                <Grid className="headerFormEventDate" fullWidth>
                  <p style={{ margin: "0px" }}>Event Date {form.date_number}</p>
                  <Button
                    style={{
                      backgroundColor: "#F5BD19",
                      color: "black",
                    }}
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
                      {form.dateEvent !== "" && errorDateEvent === false ? (
                        <OfflinePinIcon
                          sx={{ color: "green", fontSize: "30px" }}
                        />
                      ) : (
                        <WarningIcon sx={{ color: "red", fontSize: "30px" }} />
                      )}
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
                      error={errorDateEvent}
                      helperText={
                        errorDateEvent
                          ? "Event date must be greater than End Sale"
                          : " "
                      }
                    />
                  </Grid>
                </Grid>

                {/* CREATE TICKET */}
                {form.tickets?.map((formTicket) => (
                  <Grid className="formTicket" key={formTicket.id}>
                    <Grid className="formTicketTitle">
                      <h3 style={{ margin: "0px" }}>
                        {formTicket.name_ticket !== "" &&
                        formTicket.ticket_price !== "" &&
                        formTicket.total_row !== "" &&
                        formTicket.rows.every(
                          (row) => row.total_seat !== ""
                        ) ? (
                          <OfflinePinIcon
                            sx={{
                              color: "green",
                              fontSize: "30px",
                              marginBottom: "-8px",
                            }}
                          />
                        ) : (
                          <WarningIcon
                            sx={{
                              color: "red",
                              fontSize: "30px",
                              marginBottom: "-8px",
                            }}
                          />
                        )}
                        Ticket Information
                      </h3>
                    </Grid>
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
                        style={{
                          backgroundColor: "#F5BD19",
                          color: "black",
                        }}
                        variant="contained"
                        onClick={() =>
                          removeTicket(formTicket.id, form.date_number)
                        }
                      >
                        Delete Ticket
                      </Button>
                    </Grid>

                    <Grid sx={{ display: "flex" }} fullWidth>
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
                              backgroundColor: "white",
                              marginBottom: "10px",
                              width: "80%",
                            }}
                            type="text"
                            label=""
                            variant="outlined"
                            name="ticket_price"
                            value={formatNumber(formTicket.ticket_price)}
                            onChange={(e) =>
                              handlePriceTicketChange(
                                e,
                                form.date_number,
                                formTicket.id
                              )
                            }
                            error={errorInputPrice}
                          />
                          {errorInputPrice && (<p style={{color:"red", fontSize:"13px"}}>Price cannot be less than 1000</p>)}
                        </Grid>
                        <Grid
                          className="boxTicket"
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <p>Total row less than or equal to 20 </p>
                          <Grid
                            className="boxTicket"
                            style={{
                              flexDirection: "column",
                              border: "none",
                            }}
                          >
                            <TextField
                              style={{
                                backgroundColor: "white",
                                marginBottom: "10px",
                                width: "80%",
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
                            {errorInputTotalRow && (<p style={{color:"red", fontSize:"13px"}}>Row greater than 0 and less than or equal to 20</p>)}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        sx={{ flexDirection: "column" }}
                        className="enterSeat"
                      >
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "15px",
                          }}
                        >
                          <p>Enter total seat</p>
                        </Grid>
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
                                  backgroundColor: "white",
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
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

                <Grid style={{ margin: "20px" }}>
                  <Button
                    style={{
                      color: "#f1df39",
                      fontSize: "30px",
                      fontWeight: "bolder",
                    }}
                    className="buttonCreateEvent"
                    fullWidth
                    onClick={() => addTicket(form.date_number)}
                  >
                    <AddCircleIcon
                      style={{ fontSize: "35px", marginRight: "5px" }}
                    />
                    Add Ticket
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid style={{ border: "2px dashed black" }}>
              <Button
                style={{
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bolder",
                  textTransform: "none",
                  margin: "15px",
                }}
                className="buttonCreateEvent"
                fullWidth
                onClick={addForm}
              >
                <PostAddSharpIcon
                  style={{ fontSize: "35px", marginRight: "5px" }}
                />
                Add Another Event Time
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ margin: "30px 0px 30px 0px" }}>
            <Button
              style={{
                backgroundColor: "#F5BD19",
                color: "black",
                fontSize: "30px",
                fontWeight: "bolder",
                padding: "35px",
              }}
              className="buttonCreateEvent"
              fullWidth
              type="submit"
            >
              Create Event
            </Button>
          </Grid>
        </FormSubmit>
      </Grid>
    </>
  );
};

export default CreateTicket;
