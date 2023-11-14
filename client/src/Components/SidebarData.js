import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeRoundedIcon />,
    link: "/"
  },
  {
    title: "Panel de Admin",
    icon: <AdminPanelSettingsRoundedIcon />,
    link: "/adminPannel",
    role: "admin"
  }
];
