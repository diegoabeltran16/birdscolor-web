## **💡 Arquitectura General**

### 📌 **Modelo de Arquitectura: Basado en Servicios (SBA)**

El proyecto adopta una **arquitectura basada en servicios**, donde cada módulo funciona de manera autónoma, asegurando baja dependencia y alta cohesión. Este enfoque facilita la escalabilidad y la integración futura con otras plataformas.

### 📌 **Patrón Principal: Event-Driven Architecture (EDA)**

La comunicación entre los módulos está basada en eventos, permitiendo una respuesta dinámica a las acciones del usuario. Cada interacción genera un evento que activa los procesos correspondientes.

### 📌 **Principios Aplicados en la Arquitectura**

✅ **SOLID:** Diseño modular con separación clara de responsabilidades.

✅ **DRY:** Reutilización de código y eliminación de redundancias.

✅ **KISS:** Estructura simple y fácil de entender.

✅ **YAGNI:** Implementación basada solo en requisitos actuales.

✅ **Encapsulación:** Módulos bien definidos y protegidos.

✅ **TDD:** Pruebas automatizadas para garantizar integraciones críticas.

---

## **📌 Diagramas de Arquitectura**

### **1️⃣ Vista General de la Arquitectura**

```
+-----------------------------------------------------+
|                 🎨 PÁGINA INTERACTIVA              |
| - Fondo multicolor animado                         |
| - Icono palpitante en el centro                    |
| - Registra clics en el ícono                       |
+-------------------------|-------------------------+
                          | (Evento: Clic en el ícono)
                          v
+-----------------------------------------------------+
|          📈 GESTOR DE SEGUIMIENTO DE CLICS           |
| - Envía eventos a Google Analytics y Power Automate|
| - Captura geolocalización (opcional)               |
+-------------------------|-------------------------+
                          | (Envío de datos)
                          v
+-----------------------------------------------------+
|            📁 ALMACENAMIENTO DE DATOS               |
| - Guarda eventos en Excel (OneDrive)               |
| - Permite análisis posterior                       |
+-----------------------------------------------------+
                          |
                          v
+-----------------------------------------------------+
|                 📝 PÁGINA FINAL                     |
| - Muestra el mensaje "Simbiosis"                   |
+-----------------------------------------------------+

```

---

## **📌 Descripción de los Módulos**

### **1️⃣ Módulo Interactivo**

✅ **Responsabilidad:**

- Mostrar un fondo multicolor animado.
- Presentar un icono palpitante en el centro de la pantalla.
- Detectar la interacción del usuario mediante clics.
- Servir como punto de inicio del usuario.

✅ **Patrón Aplicado:** **Event Listener Pattern**

---

### **2️⃣ Módulo de Seguimiento de Clics**

✅ **Responsabilidad:**

- Registrar cada clic en el icono interactivo.
- Enviar los eventos a **Google Analytics**.
- Capturar geolocalización (si el usuario lo permite).
- Enviar datos a **Microsoft Power Automate** para almacenamiento en OneDrive.

✅ **Patrón Aplicado:** **Observer Pattern**

---

### **3️⃣ Módulo de Almacenamiento de Datos**

✅ **Responsabilidad:**

- Guardar los eventos de clics en un archivo de Excel alojado en **OneDrive**.
- Permitir la consulta y análisis de los datos registrados.

✅ **Patrón Aplicado:** **Repository Pattern**

---

### **4️⃣ Módulo de Página Final**

✅ **Responsabilidad:**

- Mostrar el mensaje final **"Simbiosis"** al usuario.
- Indicar que la experiencia ha concluido.

✅ **Patrón Aplicado:** **Simple Static Page**

---

## **📌 Tecnologías y Herramientas Utilizadas**

| **Componente** | **Tecnología** |
| --- | --- |
| **Interfaz Web** | HTML5, CSS3, JavaScript |
| **Efectos y Animaciones** | CSS3 (Gradientes, Keyframes) |
| **Seguimiento de Clics** | Google Analytics 4, Google Tag Manager |
| **Almacenamiento de Datos** | Microsoft Power Automate + OneDrive (Excel) |
| **Hosting** | GitHub Pages |
| **Dominio** | GoDaddy (birdscolor.com) |

---

## **📌 Resumen de Principios Aplicados**

| **Principio** | **Implementación en la Arquitectura** |
| --- | --- |
| **SOLID** | Separación clara de responsabilidades en cada módulo. |
| **DRY** | Código modular y reutilizable en todos los módulos. |
| **KISS** | Flujo simple y fácil de entender para el usuario. |
| **Encapsulación** | Módulos independientes con comunicación basada en eventos. |
| **TDD** | Uso de pruebas para garantizar la calidad del sistema. |

---