# 🛍️ Sistema de Ventas - Frontend (Angular)

Este es el frontend de un sistema de ventas para una tienda de ropa en línea. Desarrollado como proyecto final del curso **Desarrollo de Aplicaciones Web 1** del Instituto **Cibertec**.

🔗 Mira el <strong>VIDEO COMPLETO</strong> demo del proyecto:  
👉 [Ver publicación en LinkedIn](https://www.linkedin.com/posts/andyvargasvargas_angular-springboot-fullstackdeveloper-activity-7323354037922295810-Hc5m?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEL7XlwBWGu7hfK1SF9u8lICYu4orP78QH8) <!-- Reemplaza con el link exacto de la publicación -->

🎥 Puedes ver el video directamente aquí:  
![Demo](https://s7.ezgif.com/tmp/ezgif-739093b16b0d61.gif) 
<!-- Ver opciones más abajo para insertar video o GIF -->

---

## 🚀 Tecnologías utilizadas

- [Angular](https://angular.io/)
- [PrimeNG](https://primeng.org/) – Componentes UI reutilizables
- [SweetAlert2](https://sweetalert2.github.io/) – Alertas interactivas
- [Chart.js](https://www.chartjs.org/) – Gráficos estadísticos
- CSS personalizado
- 
---

## 🔐 Características principales

- **Autenticación con Spring Security (Basic Auth)**
- Inicio de sesión y registro
- Diferenciación de roles: Cliente y Administrador
- Filtro dinámico de productos (por género)
- Carrito de compras con resumen y edición de cantidades
- Simulación de pasarela de pagos
- Panel administrador con métricas y gráficos
- CRUDs para productos, tallas, colores, categorías e inventarios
- Manejo de rutas protegidas (Guards)
- Uso de **servicios, layouts, interceptors y modelos** en Angular

---

## 🔗 Backend del proyecto

El backend de este sistema está desarrollado en Spring Boot y también está disponible en GitHub.

📁 Repositorio del backend:  
👉 https://github.com/andycvv/api-ventas-ropa

Incluye:

- API REST con endpoints para autenticación, productos, usuarios, roles, etc.
- Seguridad con Spring Security (Basic Auth)
- Integración con MySQL

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/andycvv/front-ventas-ropa
   cd front-ventas-ropa
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   ng serve
   ```

4. Abre en el navegador:  
   [http://localhost:4200](http://localhost:4200)

## 📌 Notas

- Este proyecto **consume una API backend desarrollada en Spring Boot**, la cual no está incluida en este repositorio.
- La autenticación se realiza mediante **Basic Auth**, por lo que se recomienda correr el frontend y backend en local para probar correctamente.

---

Desarrollado con 💻 por **Andy Vargas Vargas**
