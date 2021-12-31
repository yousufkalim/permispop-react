import { color } from "@mui/system";

function createData(bookingwith, date, startTime, duration, status) {
  return { bookingwith, date, startTime, duration, status };
}
export const pendingRequestsrows = [
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
  createData("John", "Aug 17, 2021", 10, 5, "Completed"),
];
function instructorData(name, address, gender, email, status) {
  return { name, address, gender, email, status };
}
export const Instructorrows = [
  instructorData(
    "John",
    "Alee mag 44, floor 34-44-33",
    "Male",
    "hussain@gmail.com",
    "Active"
  ),
  instructorData(
    "John",
    "Alee mag 44, floor 34-44-33",
    "Male",
    "hussain@gmail.com",
    "Active"
  ),
  instructorData(
    "John",
    "Alee mag 44, floor 34-44-33",
    "Male",
    "hussain@gmail.com",
    "Active"
  ),
  instructorData(
    "John",
    "Alee mag 44, floor 34-44-33",
    "Male",
    "hussain@gmail.com",
    "Active"
  ),
  instructorData(
    "John",
    "Alee mag 44, floor 34-44-33",
    "Male",
    "hussain@gmail.com",
    "Active"
  ),
];
function VehicleData(
  dateofregistration,
  brand,
  model,
  color,
  noplate,
  gearbox
) {
  return { dateofregistration, brand, model, color, noplate, gearbox };
}
export const Vehiclerows = [
  VehicleData(
    "09-10-2021",
    "Ferrari",
    "Monza So2 ( 2019",
    "White",
    "2323",
    "Automatic"
  ),
  VehicleData(
    "09-10-2021",
    "Toyota",
    "Corrola ( 2021",
    "Silver",
    "2323",
    "Manual"
  ),
  VehicleData(
    "09-10-2021",
    "Honda",
    "Civic ( 2020",
    "Black",
    "2323",
    "Automatic"
  ),
  VehicleData(
    "09-10-2021",
    "Ferrari",
    "Monza So2 ( 2019",
    "White",
    "2323",
    "Manual"
  ),
];
