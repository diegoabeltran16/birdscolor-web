### **📌 Flujo de Interacción del Sistema**

Este flujo describe cómo los usuarios interactúan con la página web y cómo los módulos internos del sistema trabajan de manera coordinada para gestionar la experiencia del usuario y el análisis de datos. La interacción sigue un enfoque modular, impulsado por los principios SOLID y el uso de eventos asincrónicos.

---

## **🔹 Flujo General de Interacción**

**Resumen:**

1. El usuario accede a la página web interactiva.
2. Visualiza un fondo animado y un icono palpitante en el centro de la pantalla.
3. Al hacer clic en el icono, se registra la interacción.
4. El sistema envía datos del clic a Google Analytics y Power Automate.
5. Si el usuario otorga permiso, se captura su ubicación aproximada.
6. La información se almacena en un archivo Excel en OneDrive para su análisis posterior.
7. El usuario es redirigido a la página final con el mensaje "Simbiosis".

---

## **🔹 Diagrama del Flujo de Interacción**

```
+--------------------------------------------------+
|                 🌐 Usuario                      |
|       (Accede a la página web)                 |
+--------------------------------------------------+
                      ⬇
+--------------------------------------------------+
|        🎨 INTERFAZ INTERACTIVA                  |
|   - Muestra fondo animado e icono palpitante    |
|   - Detecta clics del usuario                   |
+--------------------------------------------------+
                      ⬇ Evento
+--------------------------------------------------+
|        📈 MÓDULO DE SEGUIMIENTO DE CLICS        |
|   - Envía datos de interacción a Analytics      |
|   - Captura geolocalización (opcional)          |
+--------------------------------------------------+
                      ⬇ Evento
+--------------------------------------------------+
|        📁 MÓDULO DE ALMACENAMIENTO               |
|   - Guarda los datos en OneDrive (Excel)        |
|   - Permite análisis de interacciones           |
+--------------------------------------------------+
                      ⬇
+--------------------------------------------------+
|        📝 PÁGINA FINAL                           |
|   - Muestra el mensaje "Simbiosis"              |
+--------------------------------------------------+

```

---

## **🔹 Interacciones Entre los Componentes**

---

### **1️⃣ Interacción del Usuario con la Página**

📌 **Responsable:** Módulo Interactivo

**Interacción:**

- El usuario accede a la página web.
- Observa un fondo animado y un icono palpitante en el centro de la pantalla.
- Hace clic en el icono para continuar.
- Se activa un evento que inicia la captura de datos.

---

### **2️⃣ Captura y Análisis del Clic**

📌 **Responsable:** Módulo de Seguimiento de Clics

**Interacción:**

- Detecta y registra cada clic del usuario.
- Envía los eventos a **Google Analytics** para su análisis.
- Si el usuario lo permite, captura su geolocalización aproximada.
- Los datos son preparados para ser almacenados en OneDrive.

---

### **3️⃣ Almacenamiento de Datos**

📌 **Responsable:** Módulo de Almacenamiento de Datos

**Interacción:**

- Recibe los datos procesados por el Módulo de Seguimiento de Clics.
- Guarda la información en un archivo de **Excel en OneDrive**.
- Permite que los administradores analicen la información recopilada.

---

### **4️⃣ Redirección a la Página Final**

📌 **Responsable:** Módulo de Página Final

**Interacción:**

- Tras registrar el clic, el usuario es redirigido automáticamente.
- Se muestra el mensaje **"Simbiosis"** indicando el final de la experiencia.

---

## **🔹 Beneficios del Flujo de Interacción**

✅ **Experiencia Visual Impactante:** El fondo animado y el icono palpitante hacen la página atractiva.

✅ **Automatización Completa:** Todo el proceso de captura y almacenamiento ocurre sin intervención manual.

✅ **Feedback en Tiempo Real:** La interacción del usuario se registra y analiza instantáneamente.

✅ **Escalabilidad:** La arquitectura basada en eventos permite agregar nuevas funcionalidades sin alterar el flujo principal.

✅ **Seguridad y Privacidad:** Se captura geolocalización solo si el usuario lo permite.

---