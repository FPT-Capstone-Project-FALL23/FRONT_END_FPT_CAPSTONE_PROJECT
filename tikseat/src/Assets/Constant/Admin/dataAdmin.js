import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TaskIcon from '@mui/icons-material/Task';

export const SIDENAV_ADMIN = [
    { title: "Home", url: "/homePageAdmin", icon: <HomeIcon /> },
    { title: "Client", url: "/clientPageAdmin", icon: <PersonIcon /> },
    { title: "Organizer", url: "/organizerPageAdmin", icon: <GroupIcon /> },
];

export const NAME_COLUMNS_CLIENT = [
    { id: "email", label: 'Email', minWidth: "100px", align: 'left' },
    { id: "full_name", label: 'Full Name', minWidth: "100px", align: 'left' },
    { id: "phone", label: 'Phone', minWidth: "100px", align: 'left' },
    { id: "age", label: 'Age', minWidth: "100px", align: 'left' },
    { id: "gender", label: 'Gender', minWidth: "100px", align: 'left' },
    { id: "action", label: 'Action', minWidth: "100px", align: 'left' },
]

export const NAME_COLUMNS_ORGANIZAER = [
    { id: "email", label: 'Email', minWidth: "100px", align: 'left' },
    { id: "organizer_name", label: 'Organizer Name', minWidth: "100px", align: 'left' },
    { id: "phone", label: 'Phone', minWidth: "100px", align: 'left' },
    { id: "founded_date", label: 'Founded Date', minWidth: "100px", align: 'left' },
    { id: "website", label: 'Website', minWidth: "100px", align: 'left' },
    { id: "status", label: 'Status', minWidth: "100px", align: 'left' },
    { id: "action", label: 'Action', minWidth: "100px", align: 'left' },
]

export const NAME_COLUMNS_APPROVED_OGANIZAER = [
    { id: "avatarImage", label: '', minWidth: "100px", align: 'left' },
    { id: "email", label: 'Email', minWidth: "100px", align: 'left' },
    { id: "organizer_name", label: 'Organizer Name', minWidth: "100px", align: 'left' },
    { id: "phone", label: 'Phone', minWidth: "100px", align: 'left' },
    { id: "founded_date", label: 'Founded Date', minWidth: "100px", align: 'left' },
    { id: "website", label: 'Website', minWidth: "100px", align: 'left' },
    { id: "address", label: 'Address', minWidth: "100px", align: 'left' },
    { id: "organizer_type", label: 'Organizer Type', minWidth: "100px", align: 'left' },
    { id: "description", label: 'Description', minWidth: "50px", align: 'left' },
    { id: "action", label: 'Action', minWidth: "100px", align: 'left' },
]
export const NAME_COLUMNS_APPROVED_EVENT = [
    { id: "event_name", label: 'Event Name', minWidth: "100px", align: 'left' },
    { id: "organizer_name", label: 'Organizer Name', minWidth: "100px", align: 'left' },
    { id: "type_of_event", label: 'Type Of Event', minWidth: "100px", align: 'left' },
    { id: "address", label: 'Address', minWidth: "100px", align: 'left' },
    { id: "action", label: 'Action', minWidth: "100px", align: 'left' },
]


export const LIST_NAME_MENU = [
    { nameMenu: "homeAdmin", titleMenu: "Admin", icon: <HomeIcon /> },
    { nameMenu: "clientManage", titleMenu: "Client Manager", icon: <PersonIcon /> },
    { nameMenu: "organizerManage", titleMenu: "Organizer Manager", icon: <GroupIcon /> },
]

export const LIST_APPROVED = [
    { nameList: "approvedOrganizer", titleList: "Approved Organizer", icon: <HowToRegIcon /> },
    { nameList: "approvedEvent", titleList: "Approved Event", icon: <TaskIcon /> },
]