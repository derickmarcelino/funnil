import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Exibir Telas',
    path: '/telaslist',
    icon: <AiIcons.AiFillBuild />,
    cName: 'nav-text'
  },
  {
    title: 'Exibir Jornadas',
    path: '/jornadalist',
    icon: <IoIcons.IoIosClipboard />,
    cName: 'nav-text'
  },
  {
    title: 'Criar Jornadas',
    path: '/jornada',
    icon: <FaIcons.FaWallet />,
    cName: 'nav-text'
  },
  {
    title: 'Exibir Funis',
    path: '/funillist',
    icon: <IoIcons.IoMdRemove />,
    cName: 'nav-text'
  },
  {
    title: 'Gráficos Jornadas',
    path: '/graphlist',
    icon: <IoIcons.IoLogoGameControllerA />,
    cName: 'nav-text'
  },
];