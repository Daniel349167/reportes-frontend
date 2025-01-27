
# Proyecto Vue con WebSockets

Este documento describe los pasos necesarios para instalar y ejecutar un proyecto Vue que implementa WebSockets. Sigue estas instrucciones para configurar tu entorno y comenzar a trabajar con el proyecto.

---

## Requisitos previos

1. **Node.js**: Versión 16 o superior.
2. **NPM o Yarn**: Administrador de paquetes para instalar dependencias.
3. **Servidor Backend**: Asegúrate de que tu servidor backend (por ejemplo, Laravel) esté corriendo en local o accesible remotamente.

---

## Instalación

1. **Clonar el repositorio**

   Clona el repositorio del proyecto a tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar dependencias**

   Ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Crear el archivo `.env`**

   Este proyecto utiliza variables de entorno para configurar la URL del servidor y las credenciales de Pusher. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   VITE_APP_API_URL=http://localhost:8000
   VITE_PUSHER_APP_KEY=tu_app_key
   VITE_PUSHER_APP_CLUSTER=tu_cluster
   ```

   - **`VITE_APP_API_URL`**: La URL de tu servidor backend (por defecto, Laravel usa `http://localhost:8000`).
   - **`VITE_PUSHER_APP_KEY`**: La clave de tu aplicación de Pusher.
   - **`VITE_PUSHER_APP_CLUSTER`**: El clúster configurado en tu cuenta de Pusher (por ejemplo, `us2`).

4. **Compilar y ejecutar el proyecto**

   Una vez configuradas las variables de entorno, puedes iniciar el servidor de desarrollo ejecutando:

   ```bash
   npm run dev
   ```

   Esto iniciará la aplicación y estará disponible por defecto en `http://localhost:5173`.

5. **Construir para producción**

   Si deseas compilar el proyecto para un entorno de producción, ejecuta:

   ```bash
   npm run build
   ```

   Los archivos de salida estarán en la carpeta `dist`, listos para ser desplegados en un servidor.

---

