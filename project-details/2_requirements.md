# **📌 Requisitos del Proyecto BirdsColor.com**

## **🔹 Requisitos Funcionales (RF)**

Estos requisitos describen las **funcionalidades clave** que debe cumplir la web.

---

### **RF-01: Página de inicio con botón de acceso a la experiencia interactiva**

📌 **Historia de Usuario:**

> Como usuario, quiero acceder a una página sencilla con un botón, que al hacer clic me lleve a la experiencia interactiva, para descubrir más sobre Simbiosis.
> 

✔️ **Criterios de Aceptación:**

- La página de inicio contiene un botón central con un diseño atractivo.
- Al hacer clic en el botón, el usuario es dirigido a la página interactiva.
- La página es accesible desde cualquier dispositivo (móvil, tablet, PC).

---

### **RF-02: Página interactiva con fondo multicolor y icono palpitante**

📌 **Historia de Usuario:**

> Como usuario, quiero visualizar una página con un fondo dinámico y un icono animado en el centro, para una experiencia visual llamativa antes de acceder al mensaje final.
> 

✔️ **Criterios de Aceptación:**

- El fondo de la página muestra un **efecto multicolor en gradiente o animación.**
- En el centro de la pantalla hay un **icono palpitante** que anima la interacción del usuario.
- El icono es **clickeable y redirige** a la página final.

---

### **RF-03: Registro de clics en el icono interactivo**

📌 **Historia de Usuario:**

> Como administrador, quiero registrar cuántas personas hacen clic en el icono interactivo, para medir la interacción de los usuarios con la experiencia.
> 

✔️ **Criterios de Aceptación:**

- Cada vez que un usuario haga clic en el icono, el evento se registra en **Google Analytics 4**.
- Se captura el tipo de dispositivo (móvil, escritorio, tablet).
- Se almacena el número total de clics en **Microsoft OneDrive (Excel), usando Power Automate.**

---

### **RF-04: Captura de geolocalización (opcional y con consentimiento)**

📌 **Historia de Usuario:**

> Como administrador, quiero obtener la ubicación aproximada de los usuarios (si lo permiten), para analizar el alcance geográfico de la experiencia.
> 

✔️ **Criterios de Aceptación:**

- Si el usuario **autoriza compartir su ubicación**, se registra su latitud y longitud en la base de datos.
- La información se almacena en **Excel (OneDrive) y Google Analytics**.
- Si el usuario **no otorga permiso**, la experiencia sigue funcionando sin errores.

---

### **RF-05: Página final con mensaje “Simbiosis”**

📌 **Historia de Usuario:**

> Como usuario, quiero ser dirigido a una página con el mensaje "Simbiosis" después de interactuar con el icono, para finalizar la experiencia.
> 

✔️ **Criterios de Aceptación:**

- La página solo muestra el mensaje **"Simbiosis"** de forma clara y llamativa.
- La redirección ocurre de inmediato tras hacer clic en el icono.

---

### **RF-06: Hosting y dominio en GitHub Pages + GoDaddy**

📌 **Historia de Usuario:**

> Como desarrollador, quiero que la web esté alojada en GitHub Pages y accesible desde el dominio birdscolor.com, para asegurar su disponibilidad sin costos adicionales.
> 

✔️ **Criterios de Aceptación:**

- La página web es accesible desde **birdscolor.com**.
- La configuración de **GitHub Pages** permite la carga rápida y eficiente del sitio.
- Se documenta el proceso de configuración para futuros cambios.

---

## **🔹 Requisitos No Funcionales (RNF)**

Estos requisitos garantizan la **calidad, seguridad y rendimiento** del sistema.

---

### **RNF-01: Diseño responsivo y accesible**

✔️ La web debe ser **completamente responsiva**, adaptándose a móviles, tablets y computadoras.

✔️ Se utilizarán **buenas prácticas de accesibilidad** para garantizar que todos los usuarios puedan interactuar con el sitio.

---

### **RNF-02: Seguridad y privacidad de los datos**

✔️ La captura de ubicación solo se activará si el usuario da **consentimiento explícito**.

✔️ Los datos de clics y geolocalización no se compartirán con terceros y solo se usarán para análisis interno.

✔️ El acceso a los datos almacenados en **OneDrive** debe estar protegido con permisos adecuados.

---

### **RNF-03: Simplicidad y mantenibilidad**

✔️ Se seguirá el principio **KISS** ("Keep It Simple, Stupid") para un código claro y fácil de mantener.

✔️ El código será modular, separando HTML, CSS y JavaScript para facilitar mejoras futuras.

✔️ Se utilizará **GitHub** para control de versiones y futuras actualizaciones.

---

### **RNF-04: Rendimiento optimizado**

✔️ La web debe cargarse en **menos de 3 segundos** en dispositivos móviles y computadoras.

✔️ Se optimizarán imágenes y código para minimizar el uso de datos móviles.

---

## **📍 Trazabilidad: Cómo los Requisitos se Relacionan con los Objetivos SMART**

| **Objetivo SMART** | **Requisito Relacionado** |
| --- | --- |
| **Diseñar la interfaz interactiva** | RF-01, RF-02, RF-05 |
| **Implementar el seguimiento de clics** | RF-03, RF-04 |
| **Integrar el almacenamiento en OneDrive** | RF-03, RF-04 |
| **Asegurar la compatibilidad en móviles y desktop** | RNF-01, RNF-04 |
| **Alojar la web en GitHub Pages con dominio propio** | RF-06 |

---