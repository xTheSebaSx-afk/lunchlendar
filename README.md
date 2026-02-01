# Lunchlendar

## Descripción
Lunchlendar es una aplicación web diseñada para ayudar a los usuarios a planificar y gestionar sus comidas. Permite a los usuarios crear, editar y eliminar platos, así como gestionar su información de usuario.

## Estructura del Proyecto

### Raíz del Proyecto
- README.md: Documentación del proyecto.
- lunchlendar.txt: Archivo adicional para notas o información.
- client: Contiene el código del lado del cliente.
- server: Contiene el código del lado del servidor.

### Carpeta client
- `eslint.config.js`: Configuración de ESLint para el proyecto.
- `index.html`: Archivo HTML principal.
- `package.json`: Dependencias y scripts del cliente.
- README.md: Documentación específica del cliente.
- `vercel.json`: Configuración para despliegue en Vercel.
- `vite.config.js`: Configuración de Vite para el proyecto.
- `assets/`: Recursos estáticos como imágenes y estilos.
- `public/`: Archivos públicos accesibles.
- `src/`: Código fuente de la aplicación.
  - `App.jsx`: Componente principal de la aplicación.
  - `index.css`: Estilos globales.
  - `main.jsx`: Punto de entrada de la aplicación.
  - `api/`: Módulos para gestionar las llamadas a la API.
    - `ApiManager.jsx`: Gestión de las solicitudes a la API.
  - `components/`: Componentes reutilizables.
    - `Footer.jsx`: Componente de pie de página.
    - `ProtectedRoute.jsx`: Ruta protegida para usuarios autenticados.
    - `modals/`: Componentes de modales.
      - `Modal.jsx`: Componente de modal genérico.
  - `context/`: Contextos de React para la gestión del estado.
    - `DishesContext.jsx`: Contexto para la gestión de platos.
    - `UserContext.jsx`: Contexto para la gestión de usuarios.
  - `pages/`: Páginas de la aplicación.
    - `Dishes.jsx`: Página para gestionar platos.
    - `Home.jsx`: Página de inicio.
    - `auth/`: Páginas de autenticación.
      - `Login.jsx`: Página de inicio de sesión.
      - `Register.jsx`: Página de registro.
    - `dishes/`: Páginas relacionadas con platos.
      - `Dish.jsx`: Página para ver un plato específico.
  - `types/`: Definiciones de tipos TypeScript.
    - `dish.d.ts`: Definiciones de tipos para platos.

### Carpeta server
- `index.js`: Punto de entrada del servidor.
- `package.json`: Dependencias y scripts del servidor.
- README.md: Documentación específica del servidor.
- `db/`: Módulos para la gestión de la base de datos.
  - `manager.js`: Gestión de la conexión a la base de datos.
  - `schemas/`: Esquemas de la base de datos.
    - `dishes.js`: Esquema para platos.
    - `users.js`: Esquema para usuarios.
    - `usersCounter.js`: Esquema para contar usuarios.
- `Routes/`: Rutas de la API.
  - `auth.js`: Rutas de autenticación.
  - `dishes.js`: Rutas para gestionar platos.
  - `roles.js`: Rutas para gestionar roles de usuario.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL del repositorio>
   ```

2. Navega a la carpeta del cliente y del servidor e instala las dependencias:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Inicia el servidor:
   ```bash
   node index.js
   ```

4. Inicia el cliente:
   ```bash
   cd client
   npm run dev
   ```

## Uso

- Accede a la aplicación en `http://localhost:3000` (o el puerto que esté configurado).
- Regístrate o inicia sesión para comenzar a gestionar tus platos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.

---

Puedes agregar más detalles específicos sobre la funcionalidad, ejemplos de uso, y cualquier otra información relevante que consideres necesaria. Si necesitas más secciones o detalles específicos, házmelo saber.