# Lunch Calendar (Lunchlendar)

Manual completo del proyecto para incorporar en README.

## Índice
- [Descripción general](#descripción-general)
- [Objetivos y funcionalidades](#objetivos-y-funcionalidades)
- [Tecnologías](#tecnologías)
- [Arquitectura y estructura](#arquitectura-y-estructura)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Gestión de estado y contexto](#gestión-de-estado-y-contexto)
- [Integración con API](#integración-con-api)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de entorno](#configuración-de-entorno)
- [Ejecución](#ejecución)
- [Linting](#linting)
- [Guía de uso](#guía-de-uso)
- [Estructura de datos](#estructura-de-datos)
- [UI y assets](#ui-y-assets)
- [Troubleshooting](#troubleshooting)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción general
Lunch Calendar es una aplicación web orientada a la planificación de comidas, con foco en el almuerzo. Permite explorar platos, buscar recetas y ver detalles de cada plato. Incluye login/registro para administrar la sesión del usuario y un diseño visual con gradientes e imágenes personalizadas.

## Objetivos y funcionalidades
- **Landing informativa** con objetivos y CTA para comenzar.
- **Listado de platos** con búsqueda por nombre.
- **Detalle de plato** con información principal e ingredientes.
- **Autenticación** (login, registro, logout) y persistencia de sesión.
- **Protección de rutas** para secciones privadas (estructura lista para ampliar).

## Tecnologías
- **React 19** + **Vite** (SWC) para el frontend.
- **React Router DOM** para el enrutamiento.
- **Tailwind CSS** + estilos globales para la UI.
- **Axios** para el consumo de la API.

## Arquitectura y estructura
```
src/
  api/               # Configuración de Axios
  components/        # Componentes reutilizables (Footer, LoginButton, ProtectedRoute, Modal)
  context/           # Contextos globales (UserContext, DishesContext)
  pages/             # Vistas (Home, Dishes, Auth, Dish)
  types/             # Tipos compartidos (dish.d.ts)
  App.jsx            # Rutas principales
  main.jsx           # Bootstrap de React
  index.css          # Estilos globales y fondos
```

## Rutas de la aplicación
- `/` → Home / Landing
- `/login` → Login
- `/register` → Registro
- `/dishes` → Listado de platos
- `/dishes/:id` → Detalle de plato

> Hay un componente `ProtectedRoute` para proteger rutas privadas cuando se agreguen paneles o acciones restringidas.

## Gestión de estado y contexto
- **UserContext**:
  - Carga de usuario autenticado con `/me`.
  - Funciones `login()` y `logout()`.
  - Estado `isAuthenticated` y `loading`.
- **DishesContext**:
  - Carga inicial de platos desde `/dishes`.
  - Estado `dishes` y `loading`.
  - Acción `addDish()` para extender el listado desde el frontend.

## Integración con API
La configuración centralizada de Axios está en `src/api/ApiManager.jsx`. Usa variables de entorno para cambiar el `baseURL` según el entorno:
- `VITE_ENVIRONMENT`
- `VITE_API_URL`
- `VITE_API_UR_BASE`

> Nota: `VITE_API_UR_BASE` es el valor para desarrollo (asegúrate de que la variable esté correctamente definida en `.env`).

## Requisitos previos
- Node.js 18+ (recomendado)
- npm 9+

## Instalación
```bash
npm install
```

## Configuración de entorno
Crear un archivo `.env` en la raíz con las variables necesarias:
```bash
VITE_ENVIRONMENT=development
VITE_API_UR_BASE=http://localhost:4000/api
VITE_API_URL=https://tu-api-prod.example.com/api
```

## Ejecución
```bash
npm run dev
```

## Linting
```bash
npm run lint
```

## Guía de uso
1. **Ingresar a la landing** (`/`) y hacer clic en “Comenzar”.
2. **Explorar platos** en `/dishes` y usar la búsqueda.
3. **Abrir un plato** para ver su detalle.
4. **Login** para habilitar funciones de usuario (como edición, cuando se expanda el sistema).

## Estructura de datos
El tipo principal es `Dish`:
- `_id`, `name`, `description`, `price`
- `likes`, `dislikes`
- `ingredients[]`
- `author`

## UI y assets
Los fondos y recursos visuales se cargan desde `/public` y se aplican vía CSS global:
- Header, footer y body tienen imágenes de fondo personalizadas.
- Paleta suave con gradientes en componentes clave.

## Troubleshooting
**La app no carga datos:**
- Verificar que el backend esté activo.
- Confirmar `VITE_API_UR_BASE` o `VITE_API_URL` en `.env`.

**Problemas con login:**
- Verificar que el endpoint `/login` esté disponible.
- Validar CORS y `withCredentials` en backend si usas cookies.

## Contribución
1. Crear un branch desde `main`.
2. Hacer cambios con commits pequeños y claros.
3. Abrir un PR con una descripción precisa.

## Licencia
Pendiente de definir.
