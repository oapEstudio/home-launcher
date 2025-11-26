export const env = {
  baseURL: import.meta.env.VITE_BASE_URL + "api/" || "http://localhost:3000",
  pageSize: import.meta.env.VITE_PAGE_SIZE_DEFAULT || 10,
  authMode: (import.meta.env.VITE_AUTH_MODE as 'enabled' | 'mock' | 'disabled') ?? 'enabled',
  resources: {   
    highlight: {
        getAll: {
         endpoint: 'highlighted',   
         version: 'v1'
        }
    },
    dynamic_pages: {
      getByTitle: {
        page: {
          endpoint: 'pages/{title}',   
          version: 'v1'
        },
      }
    },
    menuHome: {
      getAll: {
         endpoint: 'menu',   
         version: 'v1'
      }
    },
    notificationCarousel: {
      getAll: {
         endpoint: 'notificationCarrusel',   
         version: 'v1'
      }
    },
    notificationAlert: {
      getAll: {
         endpoint: 'notificationAlert',   
         version: 'v1'
      }
    },
    helps: {
      getAll: {
         endpoint: 'help',   
         version: 'v1'
      }
    },
    notificationCommon: {
      getAll: {
         endpoint: 'notificationCommon',   
         version: 'v1'
      },
      update: {
        endpoint: 'notificationCommon/read',   
        version: 'v1'
      }
    }
  }
};