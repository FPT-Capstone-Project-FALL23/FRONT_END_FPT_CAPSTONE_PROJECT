import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TaskIcon from '@mui/icons-material/Task';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export const SIDENAV_ADMIN = [
    { title: "Home", url: "/homePageAdmin", icon: <HomeIcon /> },
    { title: "Client", url: "/clientPageAdmin", icon: <PersonIcon /> },
    { title: "Organizer", url: "/organizerPageAdmin", icon: <GroupIcon /> },
];

export const NAME_COLUMNS_CLIENT = [
    { id: "avatarImage", label: '', minWidth: "100px", align: 'left' },
    { id: "email", label: 'Email', minWidth: "100px", align: 'left' },
    { id: "full_name", label: 'Full Name', minWidth: "100px", align: 'left' },
    { id: "phone", label: 'Phone', minWidth: "100px", align: 'left' },
    { id: "age", label: 'Age', minWidth: "100px", align: 'left' },
    { id: "gender", label: 'Gender', minWidth: "100px", align: 'left' },
]

export const NAME_COLUMNS_ORGANIZAER = [
    { id: "avatarImage", label: '', minWidth: "100px", align: 'left' },
    { id: "email", label: 'Email', minWidth: "100px", align: 'left' },
    { id: "organizer_name", label: 'Organizer Name', minWidth: "100px", align: 'left' },
    { id: "phone", label: 'Phone', minWidth: "100px", align: 'left' },
    { id: "founded_date", label: 'Founded Date', minWidth: "100px", align: 'left' },
    { id: "website", label: 'Website', minWidth: "100px", align: 'left' },
    { id: "isActive", label: 'Status', minWidth: "100px", align: 'left' },
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
]
export const NAME_COLUMNS_APPROVED_EVENT = [
    { id: "event_name", label: 'Event Name', minWidth: "100px", align: 'left' },
    { id: "organizer_name", label: 'Organizer Name', minWidth: "100px", align: 'left' },
    { id: "type_of_event", label: 'Type Of Event', minWidth: "100px", align: 'left' },
    { id: "event_location", label: 'Address', minWidth: "100px", align: 'left' },
]

export const LIST_NAME_MENU = [
    { nameMenu: "homeAdmin", titleMenu: "Admin", icon: <HomeIcon /> },
]

export const LIST_APPROVED = [
    { nameMenu: "approvedOrganizer", titleMenu: "Approved Organizer", icon: <HowToRegIcon /> },
    { nameMenu: "approvedEvent", titleMenu: "Approved Event", icon: <TaskIcon /> },
]

export const LIST_PAYMENT = [
    { nameMenu: "purchaseList", titleMenu: "Purchase List", icon: <MonetizationOnIcon /> },
    { nameMenu: "refundList", titleMenu: "Refund List", icon: <CurrencyExchangeIcon /> },
]
export const LIST_CLIENT_MANAGER = [
    { nameMenu: "clientManage", titleMenu: "List Client", icon: <PersonIcon /> },
    { nameMenu: "blockClientList", titleMenu: "List of blocked clients ", icon: <PersonOffIcon /> },
]
export const LIST_ORGANIZER_MANAGER = [
    { nameMenu: "organizerManage", titleMenu: "List Organizer", icon: <GroupIcon /> },
    { nameMenu: "blockOrganizerList", titleMenu: "List of blocked organizers", icon: <DomainDisabledIcon /> },
]

export const LIST_HOME_ADMIN = [
    { LIST_COLLAPSE: LIST_CLIENT_MANAGER, nameCollapse: "Client Manager", icon: <ManageAccountsIcon /> },
    { LIST_COLLAPSE: LIST_ORGANIZER_MANAGER, nameCollapse: "Organizer Manager", icon: <GroupsIcon /> },
    { LIST_COLLAPSE: LIST_APPROVED, nameCollapse: "Approved", icon: <LibraryAddCheckIcon /> },
    { LIST_COLLAPSE: LIST_PAYMENT, nameCollapse: "Payment", icon: <LocalAtmIcon /> },
]

export const NAME_COLUMNS_TRANSACTION = [
    { id: 'transaction_date', label: 'Date of Transaction', minWidth: "100px", align: 'left' },
    { id: 'zp_trans_id', label: 'Trading code', minWidth: "100px", align: 'left' },
    { id: 'event_name', label: 'Event Name', minWidth: "100px", align: 'left' },
    { id: 'event_date', label: 'Date Event', minWidth: "100px", align: 'left' },
    { id: 'client_email', label: 'Buyer email', minWidth: "100px", align: 'left' },
    { id: 'client_name', label: 'Buyer name', minWidth: "100px", align: 'left' },
    { id: 'numberOfTickets', label: 'Number Of Tickets', minWidth: "100px", align: 'left' },
    { id: 'totalAmount', label: 'Transaction Amount (VNĐ)', minWidth: "100px", align: 'left' },
]
export const NAME_COLUMNS_REFUND = [
    { id: 'refund_date', label: 'Refund date', minWidth: "100px", align: 'left' },
    { id: 'zp_trans_id', label: 'Trading code', minWidth: "100px", align: 'left' },
    { id: 'event_name', label: 'Event Name', minWidth: "100px", align: 'left' },
    { id: 'client_email', label: 'Buyer email', minWidth: "100px", align: 'left' },
    { id: 'client_name', label: 'Buyer name', minWidth: "100px", align: 'left' },
    { id: 'numberOfTickets', label: 'Number Of Tickets', minWidth: "100px", align: 'left' },
    { id: 'money_refund', label: 'Amount paid to the user (VNĐ)', minWidth: "100px", align: 'left' },
]