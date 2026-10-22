import type { ContactConfig } from '@/types';

export interface EnquiryLinks {
  /** `null` when no WhatsApp number is configured. */
  whatsappHref: string | null;
  /** `null` when no usable phone number is configured. */
  callHref: string | null;
}

const digitsOnly = (value: string): string => value.replace(/\D/g, '');

export function buildRoomEnquiryMessage(
  roomTitle: string,
  hotelName: string,
): string {
  return `Hello, I would like to enquire about availability for ${roomTitle} at ${hotelName}.`;
}

/** Returns `null` when the number has no digits, so callers can hide the UI. */
export function buildWhatsAppUrl(
  whatsappNumber: string,
  message: string,
): string | null {
  const digits = digitsOnly(whatsappNumber);
  if (digits === '') return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Keeps a leading "+" and digits only, e.g. "+91 98765 43210" -> "tel:+919876543210". */
export function buildTelUrl(phone: string): string | null {
  const digits = digitsOnly(phone);
  if (digits === '') return null;
  const prefix = phone.trim().startsWith('+') ? '+' : '';
  return `tel:${prefix}${digits}`;
}

export function getEnquiryLinks(
  roomTitle: string,
  contact: ContactConfig,
  hotelName: string,
): EnquiryLinks {
  const whatsappHref = buildWhatsAppUrl(
    contact.whatsappNumber,
    buildRoomEnquiryMessage(roomTitle, hotelName),
  );

  let callHref: string | null = null;
  for (const phone of contact.phones) {
    const href = buildTelUrl(phone);
    if (href !== null) {
      callHref = href;
      break;
    }
  }

  return { whatsappHref, callHref };
}