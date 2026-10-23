export const buildWhatsAppUrl = (phoneNormalized: string, message: string) => {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${phoneNormalized}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

export const buildTelUrl = (phoneNormalized: string) => `tel:+${phoneNormalized}`;
