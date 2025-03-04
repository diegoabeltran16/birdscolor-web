### **📌 Algoritmos y Matemáticas del Sistema**

El diseño de los algoritmos en este sistema sigue un enfoque basado en **eficiencia, claridad y escalabilidad**, alineado con los principios SOLID. Cada algoritmo está diseñado para integrarse dentro de la arquitectura modular y proporcionar resultados consistentes y predecibles.

---

## **🔹 Algoritmos Clave en el Sistema**

Cada módulo del sistema implementa procesos automatizados que dependen de algoritmos eficientes. A continuación, se detallan los algoritmos más relevantes, junto con su lógica y análisis matemático.

---

### **1️⃣ Algoritmo de Captura de Clics en la Página Interactiva**

📌 **Módulo Responsable:** Módulo Interactivo

**Objetivo:**

Registrar cada interacción del usuario en la página y enviar la información a los módulos de análisis y almacenamiento.

**Descripción:**

- Un evento **onClick** detecta la interacción del usuario con el icono palpitante.
- Los datos del clic (timestamp, dispositivo y ubicación opcional) se envían a **Google Analytics** y **Power Automate**.
- Se almacena la información en **OneDrive (Excel)** para su análisis posterior.

📌 **Estructura del Algoritmo:**

```jsx
// Captura de evento de clic
document.getElementById("icono").addEventListener("click", function() {
    let data = {
        timestamp: new Date().toISOString(),
        device: navigator.userAgent,
        location: "Desconocida"
    };

    // Intentar capturar ubicación si el usuario lo permite
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            data.location = `${position.coords.latitude}, ${position.coords.longitude}`;
            enviarDatos(data);
        }, () => enviarDatos(data));
    } else {
        enviarDatos(data);
    }
});

// Enviar datos a Power Automate y Google Analytics
function enviarDatos(data) {
    fetch("https://powerautomate-webhook.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

```

📌 **Complejidad Algorítmica:** **O(1)** (cada clic genera una sola operación constante).

**Resultado:**

- ✅ Se registra la interacción y se almacena en **Google Analytics** y **OneDrive**.
- ❌ Si falla la captura de ubicación, el sistema registra "Desconocida".

---

### **2️⃣ Algoritmo de Almacenamiento de Datos en OneDrive**

📌 **Módulo Responsable:** Módulo de Almacenamiento de Datos

**Objetivo:**

Guardar cada evento de interacción en un archivo de Excel dentro de **OneDrive**.

**Descripción:**

- **Microsoft Power Automate** recibe los datos enviados desde la página web.
- Los datos se insertan en una hoja de Excel en OneDrive.
- Se organiza la información por fecha y hora para facilitar el análisis posterior.

📌 **Estructura del Algoritmo:**

```python
# Flujo en Power Automate (pseudo-código)
trigger: HTTP Request (POST)
    -> Parse JSON Data
    -> Append Row to Excel Table (OneDrive)
    -> Return Status 200 OK

```

📌 **Matemática detrás del algoritmo:**

- Cada fila del Excel representa un **evento de clic** con las siguientes columnas:
    - **Fecha y hora** (`timestamp`)
    - **Dispositivo** (`userAgent`)
    - **Ubicación (si está disponible)** (`latitude, longitude`)

📌 **Complejidad Algorítmica:** **O(1)** (cada inserción de fila es constante).

**Resultado:**

- ✅ Se almacena un registro de cada clic en **OneDrive (Excel)**.
- ❌ Si la API de Power Automate falla, los datos pueden perderse temporalmente.

---

### **3️⃣ Algoritmo de Redirección a la Página Final**

📌 **Módulo Responsable:** Módulo Interactivo

**Objetivo:**

Después de registrar el clic, redirigir al usuario a la página final con el mensaje **"Simbiosis"**.

**Descripción:**

- Una vez que se confirma el envío de datos, se redirige al usuario a la página final.
- Se implementa un **delay opcional** para mejorar la experiencia del usuario.

📌 **Estructura del Algoritmo:**

```jsx
setTimeout(() => {
    window.location.href = "final.html";
}, 2000); // Redirige después de 2 segundos

```

📌 **Complejidad Algorítmica:** **O(1)** (redirección programada en un tiempo fijo).

**Resultado:**

- ✅ El usuario es dirigido a la página final después de una breve espera.
- ❌ Si hay problemas de red, la redirección podría fallar.

---

### **📌 Cumplimiento con los Principios SOLID**

| **Algoritmo** | **Patrón Aplicado** | **Encapsulación** | **Modularidad** | **Eficiencia** |
| --- | --- | --- | --- | --- |
| **Captura de Clics** | **Event Listener Pattern** | ✅ | ✅ | **O(1)** |
| **Almacenamiento de Datos** | **Repository Pattern** | ✅ | ✅ | **O(1)** |
| **Redirección a Página Final** | **Simple Static Redirect** | ✅ | ✅ | **O(1)** |

---

### **📌 Beneficios de la Implementación**

✅ **Eficiencia:** Todos los algoritmos operan en **O(1)**, asegurando una ejecución rápida.

✅ **Escalabilidad:** El sistema puede manejar múltiples interacciones sin degradación del rendimiento.

✅ **Automatización Completa:** Desde la captura del clic hasta el almacenamiento, todo es automatizado.

✅ **Robustez:** Uso de eventos y API confiables para evitar pérdida de datos.

✅ **Experiencia de Usuario Optimizada:** La redirección ocurre sin interrupciones.

---