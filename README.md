# Bocatto Experience — El antojo comienza aquí

> **Concepto independiente y no oficial de DeepSun Studio** para Bocatto Dolci, preparado como propuesta de colaboración.
> Bocatto Dolci no lo ha aprobado ni publicado. Los pedidos reales siguen en su menú de OlaClick.

Menú digital completo y autónomo para Bocatto Dolci (cheesecakes artesanales en vaso, Riohacha): el cliente descubre los postres, elige opciones y cantidades, arma su pedido en un carrito integrado y lo envía por WhatsApp, donde Bocatto lo confirma. OlaClick se usó solo como fuente de datos; la experiencia no redirige allí. No hay pagos en línea ni confirmación automática.

## Flujo de pedido

1. El cliente explora (hero, explorador de sabores, quiz, menú) y toca **Agregar**.
2. En la hoja del producto elige el adicional obligatorio, opciones opcionales (XL) y la cantidad; la Tarjeta Personalizada pide su mensaje.
3. El pedido vive en el carrito (panel lateral en escritorio, hoja inferior en móvil): cambiar cantidades, quitar, vaciar y agregar una nota.
4. **Pedir por WhatsApp** abre `https://wa.me/573009655684?text=…` con el mensaje armado (productos, cantidades, opciones, precio unitario, subtotal y total estimado), codificado con `encodeURIComponent()`.
5. La interfaz aclara que el pedido **no está confirmado** hasta que Bocatto responda.

Configuración centralizada: `src/config/ordering.ts` (número, textos del mensaje, límites, clave de almacenamiento).
El carrito se guarda en `sessionStorage` mientras la pestaña esté abierta; los precios se recalculan siempre desde `src/data/catalog.ts`.

> Nota técnica verificada: la redirección de `wa.me` convierte emojis en "�". Por eso el mensaje no lleva emojis y se eliminan de las notas del cliente (con aviso visible). Si se prefiere conservar emojis, cambiar la base a `https://api.whatsapp.com/send?phone=…&text=…` en `ordering.ts`.

## Ejecutar localmente

Requisitos: Node 20 o superior (probado con Node 24) y npm.

```bash
npm install
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # typecheck + build de producción en dist/
npm run preview    # sirve dist/ → http://localhost:4173
```

## Despliegue (preparado, no publicado)

- `vercel.json` ya está configurado (framework Vite, salida `dist/`, caché larga para `/images`).
- El sitio envía `noindex, nofollow` (meta y cabecera) para que la demo no se indexe ni se confunda con el sitio oficial. Quítalo solo si Bocatto aprueba una versión oficial.
- No se ha hecho `git init`, push ni deploy. Para hacerlo cuando lo autorices: `git init && git add . && git commit`, crea el repositorio y luego `vercel` o importa el repositorio desde el panel de Vercel.

## Qué incluye

| Sección | Archivo | Qué hace |
|---|---|---|
| Hero | `src/sections/Hero.tsx` | Titular escalonado, foto en arco kraft que entra con un barrido, sello con la espiral, ingredientes SVG con parallax por scroll y puntero, botón para agregar el postre al pedido |
| Explorador de sabores | `src/sections/FlavorExplorer.tsx` | Pestañas accesibles (flechas, Home/End), barrido circular de foto, fondo y tinta por sabor, ingredientes que reaccionan, precio fijo en un ticket |
| Anatomía de un antojo | `src/sections/Anatomy.tsx` | Scroll narrativo: un vaso en corte se arma capa por capa (base, crema, mermelada, toque final, adicional), con citas del menú. Sin bloquear el scroll |
| Dúos y XL | `src/sections/Occasions.tsx` | Composiciones editoriales con escala y parallax; descuentos reales; condiciones del XL (24 h, 10-12 porciones) |
| Descubre tu antojo | `src/sections/CravingQuiz.tsx` + `src/lib/recommend.ts` | Tres preguntas; el recomendador local puntúa rasgos verificables. El resultado sale en la "Tarjeta Personalizada" a rayas, con un sello estampado como confirmación |
| Menú completo | `src/sections/Menu.tsx` | Filtros por categoría con GSAP Flip, filas con precio, descuento, condiciones, adicionales y botón Agregar |
| Carrito y pedido | `src/cart/`, `src/components/ProductSheet.tsx`, `CartDrawer.tsx`, `AddedToast.tsx` | Selección de opciones y cantidad, carrito editable, total estimado, mensaje de WhatsApp, confirmación honesta |
| Cómo pedir | `src/sections/HowToOrder.tsx` | Recibo kraft con el flujo: elegir, revisar, enviar por WhatsApp |
| Firma visual | `src/components/Seal.tsx` | "La espiral": el sello redondo de los vasos con una espiral de crema que se dibuja sola (hero, explorador, quiz, anatomía) |

## Estructura

```
src/
  animations/gsap.ts     registro de GSAP, ScrollTrigger, Flip y useGSAP; reduced-motion
  cart/                  estado del carrito, precios, mensaje de WhatsApp
  config/ordering.ts     número de WhatsApp y textos del pedido (configuración central)
  components/            Seal, Ingredient (SVG), ProductImage, Price, OrderLink, Header, Footer…
  data/catalog.ts        catálogo tipado extraído de OlaClick (fuente única de datos)
  data/flavors.ts        dirección de arte por sabor
  lib/                   formato COP, recomendador, hooks
  sections/              secciones de la página
  styles/index.css       tokens (@theme), utilidades de marca, estados del navegador
public/
  images/products/       fotos de OlaClick en WebP 400/800
  brand/                 logotipo original (sin redibujar)
```

## Datos

- Fuente: https://bocatto-dolci.ola.click/products y sus páginas de producto, consultadas el **7 de noviembre de 2026**.
- 10 productos en 4 categorías, con nombres y descripciones literales (incluidas erratas como "Cheescake XL" o "FrutosRojos + Maracuya"), precios actuales y anteriores, el grupo de adicionales, condiciones y URL de cada producto.
- Ver `DATA-NOTES.md` para lo pendiente de verificar y los activos que requieren autorización.

## Accesibilidad y rendimiento

- Navegación completa por teclado, enlace "Saltar al contenido", foco visible con el color de cada sección.
- `prefers-reduced-motion`: todas las entradas, el parallax y los giros se desactivan y el contenido queda visible de inmediato.
- Animaciones con transform, opacity y clip-path; imágenes WebP con `srcset` y lazy loading; fuentes autoalojadas.
