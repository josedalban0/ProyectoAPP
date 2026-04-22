# ProyectoAPP - E-Commerce de Zapatillas 🚀

Este es el proyecto final para el curso de React Native de Coderhouse. Se trata de una aplicación móvil de comercio electrónico completamente funcional que integra navegación avanzada, manejo de estado global, autenticación de usuarios y persistencia de datos local mediante SQLite.

## 📱 Funcionalidades Principales

* **Autenticación de Usuarios:** Sistema de Registro e Inicio de Sesión integrado con **Firebase Auth**. Incluye validación de errores (contraseñas cortas, mail duplicado, etc.).
* **Navegación Dinámica:** Flujo condicional entre pantallas de Login y Home utilizando **Stack Navigation**.
* **Catálogo de Productos:** Visualización de productos obtenidos en tiempo real mediante **RTK Query** desde **Firebase Realtime Database**.
* **Carrito de Compras:** Gestión completa de productos (agregar y quitar ítems) con persistencia en el estado global de la app.
* **Persistencia de Sesión (Offline-Ready):** Implementación de **SQLite** para almacenar el token de sesión. Esto permite que el usuario mantenga su sesión activa aunque cierre la aplicación por completo (Auto-login).
* **Interfaces del Dispositivo:** * **Cámara:** Captura de foto de perfil personalizada mediante `expo-image-picker`.
    * **Localización (GPS):** Obtención de la ubicación actual del usuario para determinar la ciudad de envío mediante `expo-location`.

## 🛠️ Stack Tecnológico

* **Framework:** React Native con Expo (SDK 51+)
* **Estado Global:** Redux Toolkit & RTK Query
* **Base de Datos Local:** Expo SQLite
* **Backend & Auth:** Firebase (Realtime DB & Authentication)
* **Navegación:** React Navigation (Stack)
* **Hardware:** Expo Image Picker & Expo Location

## 🔧 Instalación y Uso

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/josedalban0/ProyectoAPP.git](https://github.com/josedalban0/ProyectoAPP.git)
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el entorno de Expo:**
    ```bash
    npx expo start
    ```

4.  **Ejecutar en el móvil:**
    Escanea el código QR generado en la terminal utilizando la aplicación **Expo Go** (disponible en Android e iOS).

## 👤 Autor
* **Jose Fernando D'Albano Bosetti** - Desarrollador de la Aplicación.

---
*Este proyecto fue realizado con fines educativos para demostrar la integración de servicios en la nube y capacidades nativas de dispositivos móviles.*