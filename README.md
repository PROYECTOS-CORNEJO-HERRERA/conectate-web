# Conéctate por Fibra — Sitio web

Sitio web nuevo (estático, HTML/CSS) para el ISP **Conéctate por Fibra** (Santa María y San Felipe, Región de Valparaíso, Chile). Hecho por Panel360.

## Páginas
- `index.html` — Home: hero, propuestas de valor, planes destacados, cobertura, CTA.
- `planes.html` — Todos los planes (Conéctate Sport y Conéctate Cine) con beneficios.
- `cuenta.html` — Revisar cuenta, formas de pago y contratación.
- `assets/styles.css` — estilos compartidos.

## Marca
- Azul `#0a84ff / #00479f`, navy `#062a52`, acento rojo `#e11d2a`, verde WhatsApp `#25d366`.
- Logo vectorial propio (SVG) "CONÉCT@TE Fibra Óptica" con ícono de señal.
- Tipografías: Poppins (títulos) + Inter (texto).

## Integración con Panel360 ISP
El botón flotante "¿Necesitas ayuda?" es el punto donde se incrusta el **Asistente Web** del CRM Panel360 ISP (chatbot + derivación por departamento).

## Despliegue
Es un sitio estático: se puede subir a cualquier hosting (cPanel, Vercel, Netlify). No requiere base de datos.
Para verlo local: abrir `index.html` en el navegador, o servir la carpeta (`php -S localhost:8080`).

## Pendiente / futuro
- Conectar "Revisar cuenta" y "Pagar" al sistema del ISP (ISP Cube / Webpay).
- Enlazar los botones de WhatsApp al número real del cliente.
- Fotos reales (van, ciudades) y logo definitivo aprobado por el cliente.
