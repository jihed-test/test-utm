import React from "react";
// component
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig1 = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Signup',
    path: '/signup',
    icon: icon('ic_lock'),
  },
  {
    title: 'Statistical Page',
    path: '/dashboard/StatisticalPage',
    icon: icon('archive-up-minimlistic-svgrepo-com'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];
const navConfig2 = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('user-svgrepo-com'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('user-id-svgrepo-com'),
  },
  {
    title: 'Admin',
    path: '/dashboard/Admin',
    icon: icon('server-2-svgrepo-com'),
  },
  {
    title: 'Event Maker',
    path: '/dashboard/EventMaker',
    icon: icon('document-add-svgrepo-com'),
  },
  {
    title: 'Event List',
    path: '/dashboard/EventListPage',
    icon: icon('clipboard-list-svgrepo-com'),
  },
  {
    title: 'Event User',
    path: '/dashboard/EventUser',
    icon: icon('archive-up-minimlistic-svgrepo-com'),
  },
  {
    title: 'Statistical Page',
    path: '/dashboard/StatisticalPage',
    icon: icon('archive-up-minimlistic-svgrepo-com'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];
const navConfig3 = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('user-id-svgrepo-com'),
  },
  {
    title: 'Event List',
    path: '/dashboard/EventListPage',
    icon: icon('clipboard-list-svgrepo-com'),
  },
  {
    title: 'Event User',
    path: '/dashboard/EventUser',
    icon: icon('archive-up-minimlistic-svgrepo-com'),
  },
  {
    title: 'Statistical Page',
    path: '/dashboard/StatisticalPage',
    icon: icon('archive-up-minimlistic-svgrepo-com'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export {navConfig1,navConfig2,navConfig3};
