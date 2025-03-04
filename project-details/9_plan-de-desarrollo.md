### **📌 Estructura del Proyecto - Organizada por Fases**

El proyecto sigue una estructura modular basada en **simplicidad, escalabilidad y mantenibilidad**. La implementación se divide en fases progresivas, permitiendo un desarrollo incremental y fácil de gestionar.

---

## **🔹 Fase 1: Implementación Básica de la Interfaz y Captura de Clics**

📌 **Enfoque:**

En esta fase se desarrolla la página interactiva con el fondo animado y el icono palpitante. Se implementa la captura de clics y el envío de eventos a Google Analytics y Power Automate.

```
project/
│── src/
│   ├── index.html           # Página principal interactiva
│   ├── styles.css           # Estilos para la animación del fondo y el icono
│   ├── script.js            # Lógica para la captura de clics y envío de datos
│── tests/                   # Pruebas unitarias y de rendimiento
│   ├── test_interaction.js  # Pruebas de eventos de clics
│── README.md                # Documentación principal
│── .gitignore               # Archivos a ignorar en Git

```

📌 **Objetivo de la Fase 1:**

- Crear la interfaz con fondo animado e icono palpitante.
- Implementar la detección de clics y su registro.
- Enviar eventos a Google Analytics y Power Automate.

---

## **🔹 Fase 2: Integración de Almacenamiento de Datos en OneDrive**

📌 **Enfoque:**

Se habilita la integración con Microsoft Power Automate para almacenar los eventos de clics en un archivo de Excel dentro de OneDrive.

```
project/
│── src/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── storage.js           # Módulo para envío de datos a Power Automate
│── tests/
│   ├── test_storage.js      # Pruebas para la integración con Power Automate
│── README.md
│── .gitignore

```

📌 **Objetivo de la Fase 2:**

- Configurar Power Automate para recibir y almacenar datos en OneDrive.
- Implementar la conexión entre la página web y Power Automate.
- Realizar pruebas de integración.

---

## **🔹 Fase 3: Implementación de la Página Final**

📌 **Enfoque:**

Se introduce la redirección automática a la página final tras la captura del clic, mostrando el mensaje "Simbiosis".

```
project/
│── src/
│   ├── index.html
│   ├── final.html           # Página final con el mensaje "Simbiosis"
│   ├── styles.css
│   ├── script.js
│── tests/
│   ├── test_redirection.js  # Pruebas para validar la redirección
│── README.md
│── .gitignore

```

📌 **Objetivo de la Fase 3:**

- Implementar la página final.
- Asegurar una transición fluida desde la página interactiva.
- Validar el correcto funcionamiento de la redirección.

---

## **🔹 Fase 4: Optimización y Pruebas de Desempeño**

📌 **Enfoque:**

Se realizan optimizaciones para mejorar el rendimiento y la accesibilidad, asegurando compatibilidad en múltiples dispositivos y navegadores.

```
project/
│── src/
│   ├── index.html
│   ├── final.html
│   ├── styles.css
│   ├── script.js
│   ├── storage.js
│── tests/
│   ├── test_interaction.js
│   ├── test_storage.js
│   ├── test_redirection.js
│   ├── test_performance.js  # Pruebas de carga y tiempos de respuesta
│── README.md
│── .gitignore

```

📌 **Objetivo de la Fase 4:**

- Optimizar el código y mejorar la eficiencia de carga.
- Garantizar compatibilidad con distintos dispositivos.
- Implementar pruebas de rendimiento y accesibilidad.

---

## **🔹 Fase 5: Despliegue y Configuración del Dominio**

📌 **Enfoque:**

Se configura el dominio **birdscolor.com** en GitHub Pages para que el proyecto esté disponible en línea.

```
project/
│── src/
│── tests/
│── README.md
│── .gitignore
│── CNAME                    # Configuración del dominio personalizado en GitHub Pages

```

📌 **Objetivo de la Fase 5:**

- Publicar el proyecto en GitHub Pages.
- Configurar el dominio **birdscolor.com** en GoDaddy.
- Realizar pruebas finales de accesibilidad y funcionalidad.

---

## **🔹 Beneficios de la Estructura por Fases**

✅ **Simplicidad Incremental:** Cada fase añade funcionalidades sin sobrecargar el sistema.

✅ **Modularidad:** Los archivos están organizados para facilitar su mantenimiento.

✅ **Escalabilidad:** Se pueden agregar nuevas funcionalidades sin afectar el flujo existente.

✅ **Optimización del Desarrollo:** La estructura facilita pruebas y mejoras progresivas.

---