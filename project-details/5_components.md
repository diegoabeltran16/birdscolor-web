## **🔹 Componentes del Sistema**

---

### **📍 1️⃣ Módulo Interactivo**

📌 **Rol:**

El módulo interactivo representa la página principal del sistema. Su propósito es proporcionar una experiencia visual llamativa con un fondo animado y un icono palpitante que motiva la interacción del usuario.

📌 **Responsabilidades:**

- Presentar una interfaz con un fondo multicolor animado.
- Mostrar un icono palpitante en el centro de la pantalla.
- Detectar la interacción del usuario mediante clics en el icono.
- Servir como punto de inicio de la experiencia.
- Redirigir al usuario a la página final tras la interacción.

📌 **Patrón Aplicado:** **Event Listener Pattern**

Este patrón permite que la interfaz escuche las interacciones del usuario en tiempo real y genere eventos cuando se detecte un clic en el icono.

📌 **Tecnologías Utilizadas:**

- `HTML5` (Estructura)
- `CSS3` (Animaciones y diseño visual)
- `JavaScript (Event Listeners)`

---

### **📍 2️⃣ Módulo de Seguimiento de Clics**

📌 **Rol:**

El módulo de seguimiento de clics es responsable de capturar y almacenar datos sobre la interacción de los usuarios en la plataforma.

📌 **Responsabilidades:**

- Registrar cada clic en el icono interactivo.
- Enviar eventos de interacción a **Google Analytics** para su análisis.
- Capturar la geolocalización del usuario si este lo permite.
- Transmitir los datos a **Microsoft Power Automate** para su almacenamiento en OneDrive.

📌 **Patrón Aplicado:** **Observer Pattern**

Este módulo actúa como un observador que registra eventos de interacción y los envía a los sistemas de análisis y almacenamiento.

📌 **Tecnologías Utilizadas:**

- `Google Analytics 4`
- `Google Tag Manager`
- `Geolocation API`
- `Microsoft Power Automate`

---

### **📍 3️⃣ Módulo de Almacenamiento de Datos**

📌 **Rol:**

El módulo de almacenamiento de datos garantiza que todas las interacciones registradas sean guardadas de manera segura y accesible para su análisis.

📌 **Responsabilidades:**

- Recibir los datos enviados desde el Módulo de Seguimiento de Clics.
- Guardar la información en un archivo de **Excel alojado en OneDrive**.
- Permitir la consulta y análisis posterior de los datos registrados.

📌 **Patrón Aplicado:** **Repository Pattern**

Este patrón separa la lógica de almacenamiento del resto del sistema, permitiendo una mayor modularidad y escalabilidad.

📌 **Tecnologías Utilizadas:**

- `Microsoft OneDrive`
- `Microsoft Power Automate`
- `Excel Online`

---

### **📍 4️⃣ Módulo de Página Final**

📌 **Rol:**

Este módulo es responsable de proporcionar el cierre de la experiencia interactiva, mostrando un mensaje simple pero claro.

📌 **Responsabilidades:**

- Presentar la página con el mensaje **"Simbiosis"**.
- Indicar que la experiencia ha concluido sin errores.

📌 **Patrón Aplicado:** **Simple Static Page**

Este módulo sigue un enfoque de página estática sin interactividad adicional.

📌 **Tecnologías Utilizadas:**

- `HTML5` (Estructura)
- `CSS3` (Estilización)

---

## **📌 Relación entre los Componentes y la Arquitectura**

Cada componente del sistema interactúa de manera secuencial y se comunica a través de eventos asincrónicos. Esto permite que el flujo de información sea eficiente y escalable.

```
+--------------------------------------------------+
|                 🎨 MÓDULO INTERACTIVO            |
|  (Punto de entrada del usuario)                 |
+--------------------------------------------------+
                      ↓ Evento
+--------------------------------------------------+
|          📈 MÓDULO DE SEGUIMIENTO DE CLICS       |
+--------------------------------------------------+
                      ↓ Evento
+--------------------------------------------------+
|          📁 MÓDULO DE ALMACENAMIENTO             |
+--------------------------------------------------+
                      ↓
+--------------------------------------------------+
|          📝 MÓDULO DE PÁGINA FINAL               |
+--------------------------------------------------+

```

---

## **📌 Cumplimiento con los Principios SOLID**

✔ **S - Responsabilidad Única:** Cada módulo tiene una responsabilidad clara y específica.

✔ **O - Abierto/Cerrado:** La arquitectura permite agregar nuevas funcionalidades sin afectar los módulos existentes.

✔ **L - Sustitución de Liskov:** Los módulos pueden ser extendidos o reemplazados sin afectar la experiencia del usuario.

✔ **I - Segregación de Interfaces:** Cada módulo solo expone las funciones necesarias.

✔ **D - Inversión de Dependencias:** La comunicación entre módulos se basa en eventos y estándares abiertos.

---

## **📌 Beneficios del Diseño Modular**

✅ **Mantenibilidad:** Cada componente puede actualizarse sin afectar al sistema en su totalidad.

✅ **Escalabilidad:** La arquitectura permite integrar nuevas funciones en futuras versiones.

✅ **Reutilización:** Los módulos pueden ser adaptados para otros proyectos similares.

✅ **Eficiencia:** El sistema opera con eventos asincrónicos, optimizando el rendimiento.

✅ **Simplicidad:** Se prioriza la facilidad de uso y mantenimiento del código.

---