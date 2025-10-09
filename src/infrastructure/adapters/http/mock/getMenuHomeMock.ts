import type { IMenuHome } from "../../../../domain/entities/IMenuHome";


export const MENU_HOME_MOCK: IMenuHome[] = [
  {
    id: "home",
    name: "Inicio",
    description: "Sección de inicio",
    parentId: null,
    link: "",
    hasLink: false,        // como en tu DATA, el root "Inicio" no navega
    orderIndex: 0,
    hierarchyIndex: 0,
    children: [
      {
        id: "dash",
        name: "Dashboard",
        description: "",
        parentId: "home",
        link: "#",
        hasLink: true,
        orderIndex: 0,
        hierarchyIndex: 1,
        children: []
      },
      {
        id: "shortcuts",
        name: "Atajos",
        description: "",
        parentId: "home",
        link: "",
        hasLink: false,
        orderIndex: 1,
        hierarchyIndex: 1,
        children: [
          {
            id: "intranet",
            name: "Intranet",
            description: "",
            parentId: "shortcuts",
            link: "#",
            hasLink: true,
            orderIndex: 0,
            hierarchyIndex: 2,
            children: []
          },
          {
            id: "rrhh",
            name: "RRHH",
            description: "",
            parentId: "shortcuts",
            link: "#",
            hasLink: true,
            orderIndex: 1,
            hierarchyIndex: 2,
            children: []
          },
          {
            id: "otros",
            name: "Otros",
            description: "",
            parentId: "shortcuts",
            link: "",
            hasLink: false,
            orderIndex: 2,
            hierarchyIndex: 2,
            children: [
              {
                id: "proveedores",
                name: "Proveedores",
                description: "",
                parentId: "otros",
                link: "#",
                hasLink: true,
                orderIndex: 0,
                hierarchyIndex: 3,
                children: []
              },
              {
                id: "compras",
                name: "Compras",
                description: "",
                parentId: "otros",
                link: "#",
                hasLink: true,
                orderIndex: 1,
                hierarchyIndex: 3,
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "perfil",
    name: "Mi perfil",
    description: "",
    parentId: null,
    link: "",
    hasLink: false,        // igual que en tu DATA, es contenedor con hijos
    orderIndex: 1,
    hierarchyIndex: 0,
    children: [
      {
        id: "datos",
        name: "Datos personales",
        description: "",
        parentId: "perfil",
        link: "#",
        hasLink: true,
        orderIndex: 0,
        hierarchyIndex: 1,
        children: []
      },
      {
        id: "seguridad",
        name: "Seguridad",
        description: "",
        parentId: "perfil",
        link: "#",
        hasLink: true,
        orderIndex: 1,
        hierarchyIndex: 1,
        children: []
      }
    ]
  },
  {
    id: "notificaciones",
    name: "Notificaciones",
    description: "",
    parentId: null,
    link: "#",
    hasLink: true,
    orderIndex: 2,
    hierarchyIndex: 0,
    children: []
  },
  {
    id: "politicas",
    name: "Políticas de seguridad y medio ambiente",
    description: "",
    parentId: null,
    link: "#",
    hasLink: true,
    orderIndex: 3,
    hierarchyIndex: 0,
    children: []
  },
  {
    id: "terminos",
    name: "Términos y condiciones",
    description: "",
    parentId: null,
    link: "#",
    hasLink: true,
    orderIndex: 4,
    hierarchyIndex: 0,
    children: []
  }
];
