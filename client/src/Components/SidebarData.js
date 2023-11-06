import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeRoundedIcon />,
    link: "/"
  },
  {
    title: "Ordenes",
    icon: <ContentPasteRoundedIcon />,
    link: "/orders"
  },
  {
    title: "Portal de Clientes",
    icon: <PeopleOutlineRoundedIcon />,
    link: "/clients"
  },
  {
    title: "Calendario",
    icon: <TodayRoundedIcon />,
    link: "/calendar"
  },
  {
    title: "Panel de Admin",
    icon: <AdminPanelSettingsRoundedIcon />,
    link: "/adminPannel",
    role: "admin"
  }
];
