/**
 * Configuración centralizada del canal de pedidos.
 *
 * WhatsApp es el canal donde Bocatto CONFIRMA cada pedido: enviar el mensaje
 * no es una compra confirmada. No hay pagos en línea en esta fase.
 *
 * Número comercial confirmado por el equipo (2026-11-07): +57 300 965 5684.
 * Es el mismo número que Bocatto tiene configurado como canal de pedidos en OlaClick.
 * Formato internacional sin "+", espacios ni guiones (requisito de wa.me).
 */
export const ORDERING = {
  whatsappNumber: "573009655684",
  whatsappDisplay: "+57 300 965 5684",

  /**
   * Mensaje del pedido. Sin emojis: verificado el 2026-11-07, la redirección de wa.me
   * reemplaza emojis y símbolos pictográficos (🍰 ✨ ♥) por "�". Tildes, ×, — y comillas sí llegan bien.
   */
  greeting: "¡Hola, Bocatto! Quiero realizar el siguiente pedido:",
  closing: "¿Me pueden confirmar la disponibilidad y cómo realizar el pago y la entrega?",

  /** Mensaje para consultas generales (acceso discreto). */
  inquiry: "¡Hola, Bocatto! Tengo una consulta:",

  /** Límites del selector de cantidad por producto. */
  maxQtyPerLine: 20,
  /** Longitud máxima del mensaje de la Tarjeta Personalizada y de la nota del pedido. */
  maxCardMessage: 120,
  maxOrderNote: 300,

  /** Clave de almacenamiento temporal (se borra al cerrar la pestaña). */
  storageKey: "bocatto-experience:pedido:v1",
} as const;

/**
 * Enlace wa.me con texto codificado mediante encodeURIComponent. Funciona en celular y computador.
 * Alternativa que sí conserva emojis: `https://api.whatsapp.com/send?phone=<número>&text=<texto>`.
 */
export const whatsappLink = (text: string) =>
  `https://wa.me/${ORDERING.whatsappNumber}?text=${encodeURIComponent(text)}`;
