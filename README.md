# 🛍️ Sistema de Ventas - Frontend (Angular)

Este es el frontend de un sistema de ventas para una tienda de ropa en línea. Desarrollado como proyecto final del curso **Desarrollo de Aplicaciones Web 1** del Instituto **Cibertec**.

## 🚀 Tecnologías utilizadas

- [Angular](https://angular.io/)
- [PrimeNG](https://www.primefaces.org/primeng/) – Componentes UI reutilizables
- [SweetAlert2](https://sweetalert2.github.io/) – Alertas interactivas
- [Chart.js](https://www.chartjs.org/) – Gráficos estadísticos
- CSS personalizado

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

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
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
