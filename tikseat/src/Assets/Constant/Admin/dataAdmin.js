import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

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
