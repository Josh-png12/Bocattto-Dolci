# Notas de datos y activos

Consulta realizada el **7 de noviembre de 2026** sobre el menú público de OlaClick (`bocatto-dolci.ola.click`), leyendo el HTML renderizado en servidor y el payload de Nuxt de cada página de producto. No se usó ninguna API privada ni se requirió inicio de sesión.

## Catálogo verificado

| Categoría (OlaClick) | Producto (nombre exacto) | Precio | Antes | Notas |
|---|---|---|---|---|
| Cheesecakes Artesanales | Cheesecake de Oreo | $13.000 | — | Adicionales obligatorio (elige 1) |
| Cheesecakes Artesanales | Cheesecake de Nutella | $14.000 | — | Adicionales |
| Cheesecakes Artesanales | Cheesecake de Frutos Rojos🌟 | $14.500 | — | También en "Destacados" (categoría oculta) |
| Cheesecakes Artesanales | Cheesecake de Maracuyá | $13.000 | — | Adicionales |
| Cheesecakes Artesanales | Cheesecake de Milo | $14.000 | — | Adicionales |
| Dúos + Bono de Regalo | Cheesecake de Milo + Oreo | $25.300 | $28.200 | −10 % |
| Dúos + Bono de Regalo | Cheesecake de FrutosRojos + Maracuya | $25.500 | $27.500 | −7 % |
| Dúos + Bono de Regalo | Cheesecake de Nutella + Oreo | $24.500 | $27.000 | −9 % |
| Postres XL 🧡 – Por Encargo | Cheescake XL (10-12 porciones) | $50.000 | — | 24 h de anticipación; opción "Combina tu Postre" +$8.000 |
| Complementos | Tarjeta Personalizada | $1.000 | — | Sin opciones |

Grupo "Adicionales" (todos los cheesecakes y dúos): Leche Condesada 25Gr +$1.000 · Chips de Chocolate +$1.000 · Brownie de chocolate +$1.500 · Brownie de milo +$1.500 · Salsa de Mango +$1.000 · Sin Adicional $0.

Configuración que OlaClick mostraba (solo referencia, **no se usa en la experiencia**): domicilio con tarifa fija de $5.000, tiempo promedio "20 - 30min.", pagos en efectivo y transferencia. Como Bocatto Experience reemplaza el catálogo de OlaClick, el costo de domicilio y los medios de pago no se muestran ni se suman: Bocatto los confirma por WhatsApp.

## Canal de pedidos

- WhatsApp **+57 300 965 5684** (`573009655684`), confirmado por el equipo el 7-nov-2026; coincide con el número configurado en OlaClick. Centralizado en `src/config/ordering.ts`.
- Enlace `https://wa.me/573009655684?text=…` probado en emulación de celular y de computador: redirige a `api.whatsapp.com/send/?phone=573009655684…` (HTTP 302) y el texto llega idéntico.
- Limitación verificada: `wa.me` reemplaza emojis y símbolos pictográficos por "�" (tildes, ×, — y comillas sí llegan). Por eso el mensaje no usa 🍰 y las notas del cliente se envían sin emojis, con aviso en la interfaz.
- Pendiente con Bocatto antes de usarlo en producción: costo de domicilio, zonas, medios de pago, horarios y si quieren datos del cliente (nombre, dirección) dentro del mensaje.

## Pendiente de verificación

- **Horarios de atención:** en OlaClick todos los días figuran como inactivos; no se muestran horarios.
- **"Bono de Regalo":** forma parte del nombre de la categoría, pero el menú no explica en qué consiste. La demo no lo describe.
- **"Combina tu Postre" (+$8.000) del XL:** el menú no explica qué incluye; se ofrece como opción opcional tal cual aparece.
- **Mensaje de la Tarjeta Personalizada:** la descripción oficial es "Frase corta con mensaje personalizado"; la hoja de producto pide esa frase (opcional, 120 caracteres) para incluirla en el mensaje. No es una opción con precio.
- **Instagram (@bocatto.dolci):** solo se pudo leer la información pública básica (941 seguidores, 25 publicaciones). Las publicaciones requieren iniciar sesión, así que no se extrajo nada más de su identidad ni se inventaron testimonios o reseñas.
- **Tipografía del logotipo:** no identificada. Se usa el archivo original del logo y Fraunces "soft" para titulares, por decisión del equipo.
- **Datos personales:** OlaClick muestra los números y titulares de Nequi y Daviplata en la descripción del pago por transferencia. Se omitieron a propósito.

## Activos que requieren autorización antes de una versión oficial

| Activo | Ubicación | Origen |
|---|---|---|
| Logotipo Bocatto Dolci | `public/brand/bocatto-dolci-logo*.{png,webp}`, `public/favicon.png` | `assets.olaclick.app/companies/logos/eac906b5-….png` |
| 10 fotografías de producto | `public/images/products/*.webp` | `assets.olaclick.app/companies/products/images/800/…` (URL exacta por producto en `src/data/catalog.ts`, campo `image.sourceUrl`) |
| Imagen para compartir (OG) | `public/og-image.jpg` | Recorte de la foto del Cheesecake de Frutos Rojos |
| Nombres, descripciones y precios | `src/data/catalog.ts` | Menú de OlaClick |

Creados por DeepSun Studio para esta demo (sin restricciones): ilustraciones SVG de ingredientes (`Ingredient.tsx`), sello con espiral (`Seal.tsx`), vaso en corte (`Anatomy.tsx`), iconos (`Icons.tsx`).

Las fotos contienen productos de terceros (Hershey's, Nutella, Oreo, Milo) tal como aparecen en el material de Bocatto. Si se publica una versión oficial, conviene revisar con Bocatto el uso de esas marcas en las imágenes.
