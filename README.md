# Around Japan

## Descripción del Proyecto

Around Japan es una aplicación web interactiva que permite a los usuarios explorar y compartir sus recuerdos de viajes por Japón. Los usuarios pueden visualizar una colección de tarjetas con imágenes de lugares emblemáticos, agregar nuevas tarjetas con sus propios recuerdos, dar "me gusta" a las tarjetas, eliminarlas y editar su información de perfil.

El proyecto está desarrollado utilizando JavaScript moderno (ES6+), HTML5 y CSS3, siguiendo los principios de Programación Orientada a Objetos (POO) y las mejores prácticas de desarrollo web.

## Funcionalidad

### Características Principales:

1. **Visualización de Tarjetas Iniciales**
   - Muestra 6 tarjetas predefinidas con lugares emblemáticos de Japón
   - Cada tarjeta incluye una imagen y el nombre del lugar

2. **Agregar Nuevas Tarjetas**
   - Los usuarios pueden agregar nuevas tarjetas mediante un formulario
   - Se validan todos los campos antes de permitir el envío
   - Las nuevas tarjetas aparecen al inicio de la galería

3. **Interacción con Tarjetas**
   - Botón "Me gusta" funcional para marcar tarjetas favoritas
   - Función para eliminar tarjetas de la galería
   - Visualización de imágenes en tamaño completo al hacer clic

4. **Editar Perfil de Usuario**
   - Los usuarios pueden actualizar su nombre y descripción
   - Formulario con validación en tiempo real
   - Los cambios se reflejan inmediatamente en la interfaz

5. **Validación de Formularios**
   - Validación en tiempo real de todos los campos de entrada
   - Uso de atributos HTML5 y la API ValidityState de JavaScript
   - Botón de envío deshabilitado hasta que todos los campos sean válidos
   - Mensajes de error descriptivos para cada campo

6. **Ventanas Emergentes (Popups)**
   - Popup para editar perfil
   - Popup para agregar nuevas tarjetas
   - Popup para visualizar imágenes en tamaño completo
   - Se pueden cerrar haciendo clic fuera, en el botón X o presionando Escape

7. **Accesibilidad**
   - Todos los botones tienen atributos `aria-label`
   - Todas las imágenes tienen atributos `alt` descriptivos
   - Estados `:hover` en todos los elementos interactivos
   - Soporte para navegación por teclado

## Tecnologías y Técnicas Utilizadas

### Tecnologías Frontend:

- **HTML5**
  - Estructura semántica
  - Elementos `<template>` para tarjetas dinámicas
  - Validación nativa de formularios
  - Atributos de accesibilidad (ARIA)

- **CSS3**
  - Metodología BEM (Block Element Modifier)
  - Flexbox para layouts responsivos
  - Grid Layout para galería de tarjetas
  - Transiciones y animaciones suaves
  - Media queries para diseño responsive
  - Variables CSS personalizadas

- **JavaScript ES6+**
  - Módulos ES6 (import/export)
  - Clases y POO
  - Arrow functions
  - Template literals
  - Destructuring
  - Métodos de arrays modernos (forEach, map, etc.)
  - Manipulación del DOM
  - Event delegation
  - Manejo de eventos de teclado

### Arquitectura y Patrones:

1. **Programación Orientada a Objetos (POO)**
   - Clases especializadas para cada funcionalidad
   - Herencia (Popup → PopupWithImage, PopupWithForms)
   - Encapsulación (métodos públicos y privados)
   - Acoplamiento débil mediante callbacks

2. **Separación de Responsabilidades**
   - Cada clase tiene una responsabilidad única
   - Lógica de negocio separada de la presentación
   - Validación modular y reutilizable

3. **Componentes Modulares**
   - `Card`: Gestión de tarjetas individuales
   - `Section`: Renderizado de colecciones de elementos
   - `Popup`: Clase base para ventanas emergentes
   - `PopupWithImage`: Popup especializado en imágenes
   - `PopupWithForms`: Popup especializado en formularios
   - `UserInfo`: Gestión de información del usuario
   - `FormValidator`: Validación universal de formularios

### Estructura de Archivos:

```
web_project_around_10/
├── src/
│   ├── blocks/              # Estilos CSS por bloques BEM
│   │   ├── page.css
│   │   ├── header.css
│   │   ├── profile.css
│   │   ├── memories.css
│   │   ├── modal.css
│   │   └── footer.css
│   ├── components/          # Clases JavaScript
│   │   ├── Card.js
│   │   ├── FormValidator.js
│   │   ├── Popup.js
│   │   ├── PopupWithImage.js
│   │   ├── PopupWithForms.js
│   │   ├── Section.js
│   │   ├── UserInfo.js
│   │   └── utils.js
│   ├── page/               # Archivos principales
│   │   ├── index.css       # Archivo CSS principal (importa todos los bloques)
│   │   └── index.js        # Punto de entrada JavaScript
│   ├── images/             # Recursos visuales
│   └── vendor/             # Librerías externas
│       ├── fonts/
│       └── normalize.css
├── index.html              # Documento HTML principal
└── README.md              # Este archivo
```

### Características Técnicas:

- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Validación Robusta**: Uso de ValidityState API para validación nativa
- **Optimización de Rendimiento**: 
  - Operaciones DOM antes de inserción en el layout
  - Event delegation donde sea apropiado
  - Sin "números mágicos" (valores hardcodeados)
- **Código Limpio**:
  - Nomenclatura descriptiva (camelCase)
  - Funciones con una sola responsabilidad
  - Variables declaradas correctamente (const/let)
  - Sin código duplicado
  - Indentación consistente

### Metodología BEM:

El proyecto utiliza la metodología BEM (Block Element Modifier) para la nomenclatura de clases CSS:

- **Block**: `.memories`
- **Element**: `.memories__item`, `.memories__image`
- **Modifier**: `.memories__like_active`, `.modal_opened`

Esto proporciona:
- Código CSS más mantenible y escalable
- Nomenclatura clara y predecible
- Evita conflictos de estilos
- Facilita el trabajo en equipo

## Instalación y Uso

1. Clona este repositorio
2. Abre `index.html` en tu navegador
3. ¡Explora y agrega tus propios recuerdos de viajes!

## Navegadores Compatibles

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Autor

Elizabeth Corona - Proyecto Around Japan

## Enlace al Proyecto

[Ver proyecto en GitHub Pages](#)

---

**Nota**: Este es un proyecto educativo desarrollado como parte del bootcamp de desarrollo web de TripleTen.
