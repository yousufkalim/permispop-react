//Icons
import { ReactComponent as MyProfile } from "../assets/DrawerIcons/my_profile.svg";
import { ReactComponent as Chat } from "../assets/DrawerIcons/chat.svg";
import { ReactComponent as PendingReq } from "../assets/DrawerIcons/pending_req.svg";
import { ReactComponent as History } from "../assets/DrawerIcons/history.svg";
import { ReactComponent as Booking } from "../assets/DrawerIcons/booking.svg";
import { ReactComponent as FindInstructure } from "../assets/DrawerIcons/find_instructure.svg";
import { ReactComponent as InsOnMap } from "../assets/DrawerIcons/ins_on_map.svg";
import { ReactComponent as MyProcedure } from "../assets/DrawerIcons/my_procedure.svg";
import { ReactComponent as Dispute } from "../assets/DrawerIcons/disputes.svg";
import { ReactComponent as MyLearing } from "../assets/DrawerIcons/my_learning.svg";
import { ReactComponent as Car } from "../assets/DrawerIcons/car.svg";
import { ReactComponent as Calendar } from "../assets/DrawerIcons/Icon-Calendar.svg";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
//student components routes
import StudentProfile from "../containers/Dashboard/Student/Profile";
import StudentPendingRequest from "../containers/Dashboard/Student/PendingRequest";
import StudentHistory from "../containers/Dashboard/Student/History";
import Map from "../containers/Dashboard/Student/StudentMap/Maps";
import StudentCalendar from "../containers/Dashboard/Student/StudentCalendar/Calendar";
import StudentLearning from "../containers/Dashboard/Student/MyLearning";
import StudentDispute from "../containers/Dashboard/Student/Dispute";
import StudentMyProcedure from "../containers/Dashboard/Student/MyProcedure";
import StudentChat from "../containers/Dashboard/Student/Chat/Chat";
import UserBookingCalendar from "../containers/Dashboard/Student/UserBookingCalendar";
import StudentFindIns from "../containers/Dashboard/Student/FindInstructor";

//instructor components routes
import InsProfile from "../containers/Dashboard/Instructor/profile";
import InsPendingRequest from "../containers/Dashboard/Instructor/PendingRequest";
import InsHistory from "../containers/Dashboard/Instructor/History";
import InsCalendar from "../containers/Dashboard/Instructor/InsCalendar/Calendar";
import InsInsuranceDetails from "../containers/Dashboard/Instructor/InsuranceDetails";
import InsFaq from "../containers/Dashboard/Instructor/Faq";
import InsVehicles from "../containers/Dashboard/Instructor/Vehicles";
import InsDispute from "../containers/Dashboard/Instructor/Dispute";
import InsChat from "../containers/Dashboard/Instructor/Chat/Chat";

//driving school instructor components routes
import DsInsProfile from "../containers/Dashboard/DSInstructor/profile";
import DsInsPendingRequest from "../containers/Dashboard/DSInstructor/PendingRequest";
import DsInsHistory from "../containers/Dashboard/DSInstructor/History";
import DsInsCalendar from "../containers/Dashboard/DSInstructor/DsInstructorCalendar/Calendar";
import DsInsVehicles from "../containers/Dashboard/Instructor/Vehicles";
import DsInsDispute from "../containers/Dashboard/DSInstructor/Dispute";
import DsInsChat from "../containers/Dashboard/DSInstructor/Chat/Chat";
import DsInsInsuranceDetails from "../containers/Dashboard/DSInstructor/InsuranceDetails";

// import InsInsuranceDetails from "../containers/Dashboard/Instructor/InsuranceDetails";
// import InsFaq from "../containers/Dashboard/Instructor/Faq";

// driving school components routes
import DsProfile from "../containers/Dashboard/DrivingSchool/profile";
import DsPendingRequest from "../containers/Dashboard/DrivingSchool/PendingRequest";
import DsHistory from "../containers/Dashboard/DrivingSchool/History";
import DsCalendar from "../containers/Dashboard/DrivingSchool/DsCalendar/Calendar";
import DsInstructor from "../containers/Dashboard/DrivingSchool/Instructor";
import DsVehicles from "../containers/Dashboard/DrivingSchool/Vehicles";
import DsInsuranceDetails from "../containers/Dashboard/DrivingSchool/InsuranceDetails";
import DsDispute from "../containers/Dashboard/DrivingSchool/Dispute";
import DsChat from "../containers/Dashboard/DrivingSchool/Chat/Chat";

// CarRental components routes
import CRCalendar from "../containers/Dashboard/CarRental/CarRentalCalendar/Calendar";
import CRProfile from "../containers/Dashboard/CarRental/Profile";
import CRPendingRequest from "../containers/Dashboard/CarRental/PendingRequest";
import CRHistory from "../containers/Dashboard/CarRental/History";
import CRVehicles from "../containers/Dashboard/CarRental/Vehicles";
import CRInsuranceDetails from "../containers/Dashboard/CarRental/InsuranceDetails";
import CRDispute from "../containers/Dashboard/CarRental/Dispute";
import CRChat from "../containers/Dashboard/CarRental/Chat/Chat";

// Student Routes
var StudentRoutes = [
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <MyProfile className="drawer-icons" />,
    component: StudentProfile,
    layout: "/student",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Chat className="drawer-icons" />,
    component: StudentChat,
    layout: "/student",
  },
  {
    path: "/pendingRequest",
    name: "Pending Request",
    icon: <PendingReq className="drawer-icons" />,
    component: StudentPendingRequest,
    layout: "/student",
  },
  {
    path: "/history",
    name: "History",
    icon: <History className="drawer-icons" />,
    component: StudentHistory,
    layout: "/student",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: <Booking className="drawer-icons" />,
    component: StudentCalendar,
    layout: "/student",
  },
  {
    path: "/findInstructure",
    name: "Find Instructure",
    icon: <FindInstructure className="drawer-icons" />,
    component: StudentFindIns,
    layout: "/student",
  },
  {
    path: "/instructureOnMap",
    name: "Instructure On Map",
    icon: <InsOnMap className="drawer-icons" />,
    component: Map,
    layout: "/student",
  },
  {
    path: "/MyProcedure",
    name: "My Procedure",
    icon: <MyProcedure className="drawer-icons" />,
    component: StudentMyProcedure,
    layout: "/student",
  },
  {
    path: "/dispute",
    name: "Dispute",
    icon: <Dispute className="drawer-icons" />,
    component: StudentDispute,
    layout: "/student",
  },
  {
    path: "/myLearning",
    name: "My Learning",
    icon: <MyLearing className="drawer-icons" />,
    component: StudentLearning,
    layout: "/student",
  },
  {
    path: "/InstructorBooking",
    component: UserBookingCalendar,
    layout: "/student",
  },
];
// Instructor Routes
var InstructorRoutes = [
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <MyProfile className="drawer-icons" />,
    component: InsProfile,
    layout: "/instructor",
  },
  {
    path: "/insuranceDetails",
    name: "Insurance Details",
    icon: <AssignmentTurnedInOutlinedIcon className="drawer-icons" />,
    component: InsInsuranceDetails,
    layout: "/instructor",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Chat className="drawer-icons" />,
    component: InsChat,
    layout: "/instructor",
  },
  {
    path: "/pendingRequest",
    name: "Pending Request",
    icon: <PendingReq className="drawer-icons" />,
    component: InsPendingRequest,
    layout: "/instructor",
  },
  {
    path: "/history",
    name: "History",
    icon: <History className="drawer-icons" />,
    component: InsHistory,
    layout: "/instructor",
  },
  {
    path: "/mycalendar",
    name: "My Calendar",
    icon: <Calendar className="drawer-icons" />,
    component: InsCalendar,
    layout: "/instructor",
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: <Car className="drawer-icons" />,
    component: InsVehicles,
    layout: "/instructor",
  },
  {
    path: "/disputes",
    name: "Disputes",
    icon: <Dispute className="drawer-icons" />,
    component: InsDispute,
    layout: "/instructor",
  },
  {
    path: "/faq's",
    name: "FAQ'S",
    icon: <QuizOutlinedIcon className="drawer-icons" />,
    component: InsFaq,
    layout: "/instructor",
  },
];
// Driving School Instructor Routes

var DsInstructorRoutes = [
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <MyProfile className="drawer-icons" />,
    component: DsInsProfile,
    layout: "/DsInstructor",
  },
  {
    path: "/insuranceDetails",
    name: "Insurance Details",
    icon: <AssignmentTurnedInOutlinedIcon className="drawer-icons" />,
    component: DsInsInsuranceDetails,
    layout: "/DsInstructor",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Chat className="drawer-icons" />,
    component: DsInsChat,
    layout: "/DsInstructor",
  },
  {
    path: "/pendingRequest",
    name: "Pending Request",
    icon: <PendingReq className="drawer-icons" />,
    component: DsInsPendingRequest,
    layout: "/DsInstructor",
  },
  {
    path: "/history",
    name: "History",
    icon: <History className="drawer-icons" />,
    component: DsInsHistory,
    layout: "/DsInstructor",
  },
  {
    path: "/mycalendar",
    name: "My Calendar",
    icon: <Calendar className="drawer-icons" />,
    component: DsInsCalendar,
    layout: "/DsInstructor",
  },

  {
    path: "/vehicles",
    name: "Vehicles",
    icon: <Car className="drawer-icons" />,
    component: DsInsVehicles,
    layout: "/DsInstructor",
  },

  {
    path: "/disputes",
    name: "Disputes",
    icon: <Dispute className="drawer-icons" />,
    component: DsInsDispute,
    layout: "/DsInstructor",
  },
  {
    path: "/faq's",
    name: "FAQ'S",
    icon: <QuizOutlinedIcon className="drawer-icons" />,
    // component: ,
    layout: "/DsInstructor",
  },
];
// Driving School routes
var DrivingSchoolRoutes = [
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <MyProfile className="drawer-icons" />,
    component: DsProfile,
    layout: "/DrivingSchool",
  },
  {
    path: "/insuranceDetails",
    name: "Insurance Details",
    icon: <AssignmentTurnedInOutlinedIcon className="drawer-icons" />,
    component: DsInsuranceDetails,
    layout: "/DrivingSchool",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Chat className="drawer-icons" />,
    component: DsChat,
    layout: "/DrivingSchool",
  },
  {
    path: "/pendingRequest",
    name: "Pending Request",
    icon: <PendingReq className="drawer-icons" />,
    component: DsPendingRequest,
    layout: "/DrivingSchool",
  },
  {
    path: "/history",
    name: "History",
    icon: <History className="drawer-icons" />,
    component: DsHistory,
    layout: "/DrivingSchool",
  },
  {
    path: "/mycalendar",
    name: "My Calendar",
    icon: <Calendar className="drawer-icons" />,
    component: DsCalendar,
    layout: "/DrivingSchool",
  },
  {
    path: "/instructor",
    name: "Instructor",
    icon: <GroupOutlinedIcon className="drawer-icons" />,
    component: DsInstructor,
    layout: "/DrivingSchool",
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: <Car className="drawer-icons" />,
    component: DsVehicles,
    layout: "/DrivingSchool",
  },
  {
    path: "/disputes",
    name: "Disputes",
    icon: <Dispute className="drawer-icons" />,
    component: DsDispute,
    layout: "/DrivingSchool",
  },
];
// Car Rental routes

var CarRentalRoutes = [
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <MyProfile className="drawer-icons" />,
    component: CRProfile,
    layout: "/CarRental",
  },
  {
    path: "/insuranceDetails",
    name: "Insurance Details",
    icon: <AssignmentTurnedInOutlinedIcon className="drawer-icons" />,
    component: CRInsuranceDetails,
    layout: "/carRental",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Chat className="drawer-icons" />,
    component: CRChat,
    layout: "/carRental",
  },
  {
    path: "/pendingRequest",
    name: "Pending Requests",
    icon: <PendingReq className="drawer-icons" />,
    component: CRPendingRequest,
    layout: "/carRental",
  },
  {
    path: "/history",
    name: "History",
    icon: <History className="drawer-icons" />,
    component: CRHistory,
    layout: "/carRental",
  },
  {
    path: "/mycalendar",
    name: "My Calendar",
    icon: <Calendar className="drawer-icons" />,
    component: CRCalendar,
    layout: "/carRental",
  },

  {
    path: "/vehicles",
    name: "Vehicles",
    icon: <Car className="drawer-icons" />,
    component: CRVehicles,
    layout: "/carRental",
  },
  {
    path: "/disputes",
    name: "Disputes",
    icon: <Dispute className="drawer-icons" />,
    component: CRDispute,
    layout: "/carRental",
  },
];
const Routes = {
  StudentRoutes,
  InstructorRoutes,
  DsInstructorRoutes,
  DrivingSchoolRoutes,
  CarRentalRoutes,
};
export default Routes;
