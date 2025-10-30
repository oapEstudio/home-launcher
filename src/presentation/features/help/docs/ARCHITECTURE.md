# 🏗️ Arquitectura de Mesa de ayuda

## 📊 Diagrama de Componentes
```
HelpPage.tsx
├── Breadcrumbs
│ 
├── [Desktop] DesktopLayout
│   ├── Sidebar
│   │   └── SectionList
│   │   
│   └── SectionContent
│       └── ArticleList
│           └── ArticleAction
└── [Mobile] 
    ├── MobileMenuView
    │   └── SectionList
    │   
    └── MobileSectionView
        ├── SectionContent
        └── BackButton
```

## 🔄 Flujo de Navegación

### Desktop
```
1. Usuario ve DesktopLayout (sidebar visible siempre)
2. Click en sección → Actualiza contenido derecha
3. Sidebar permanece visible
```

### Mobile
```
1. Usuario ve MobileMenuView (lista de secciones)
2. Click en sección → Navega a MobileSectionView
3. Click "Volver" → Regresa a MobileMenuView
```
