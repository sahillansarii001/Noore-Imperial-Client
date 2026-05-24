import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(paise) {
  if (typeof paise !== 'number') return '₹0';
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
}

export function getDiscountPercent(originalPrice, discountPrice) {
  if (!discountPrice || discountPrice >= originalPrice) return null;
  const diff = originalPrice - discountPrice;
  const percent = Math.round((diff / originalPrice) * 100);
  return `${percent}% OFF`;
}
