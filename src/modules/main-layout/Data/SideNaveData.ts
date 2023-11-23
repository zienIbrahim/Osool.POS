import {  SideNavItems,   SideNavSection, } from '../models/navigation.model';

export const sideNavSections: SideNavSection[] = [
  {
    // text: 'SideNavMenu.SideNavSection.Inventory',
    items: ['Dashboard'],
  },
  {
    // text: 'SideNavMenu.SideNavSection.Inventory',
    items: ['Tenant'],
  },
  {
    // text: 'SideNavMenu.SideNavSection.Inventory',
    items: ['Subscription'],
  },
  {
    // text: 'SideNavMenu.SideNavSection.Inventory',
    items: ['Users'],
  },
];
export const sideNavItems: SideNavItems = {
  Dashboard: {
    link: '/dashboard',
    text: 'SideNavMenu.SideNavSection.Dashboard',
    updated: false,
    icon: 'tachometer-alt',
  },
  Tenant: {
    icon: 'receipt',
    text: 'Tenant',
    submenu: [
      {
        icon: 'receipt',
        link: '/Tenant/Entry/List',
        AddLink: '/Tenant/Entry/Create',
        text: 'Tenant List',
      },
      {
        icon: 'receipt',
        link: '/Tenant/Payment/List',
        AddLink: '/Tenant/Payment/Create',
        text: 'Tenant Add' ,
      },
      {
        icon: 'receipt',
        link: '/Tenant/Receive/List',
        AddLink: '/Tenant/Receive/Create',
        text: 'Tenant Edit',
      },
    ],
  },
  Subscription: {
    link: '/Subscription',
    text: 'SideNavMenu.SideNavSection.Subscription',
    updated: false,
    icon: 'tachometer-alt',
  },
  Users: {
    link: '/Users',
    text: 'SideNavMenu.SideNavSection.Users',
    updated: false,
    icon: 'tachometer-alt',
  },
};
