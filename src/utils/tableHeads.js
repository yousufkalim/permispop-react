export const PendingRequestcolumns = [
  { id: "bookingwith", label: "Booking with", align: "center", minWidth: 170 },
  { id: "date", label: "Date", align: "center", minWidth: 170 },
  {
    id: "startTime",
    label: "Start Time",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "options",
    label: "Options",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
