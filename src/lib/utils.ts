import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatting follows the language the app is built in, taken from `<html lang>`.
 *
 * This used to be hardcoded `es-ES`, so an app built for an English speaker
 * printed `9/8/2026` and `1.234,56 €`. That date is not merely foreign-looking:
 * to an American reader it says September 8th. Reading the tag instead means
 * the builder sets the language in one place — the `lang` attribute, which is
 * also what screen readers and browser translation use — and dates, numbers and
 * currency follow on their own.
 *
 * Falls back to Spanish so an app whose tag is missing keeps formatting exactly
 * as it did before.
 */
const DEFAULT_LOCALE = resolveDocumentLocale()
const DEFAULT_CURRENCY = 'EUR'

function resolveDocumentLocale(): string {
  if (typeof document === 'undefined') return 'es-ES'
  const tag = document.documentElement.getAttribute('lang')?.trim()
  return tag || 'es-ES'
}

export function formatCurrency(
  value: number | string | null | undefined,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
): string {
  const amount = Number(value ?? 0)
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number.isFinite(amount) ? amount : 0)
}

export function formatMoney(
  cents: number | string | null | undefined,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
): string {
  const amount = Number(cents ?? 0) / 100
  return formatCurrency(Number.isFinite(amount) ? amount : 0, currency, locale)
}

export function formatDate(value: string | Date | null | undefined, locale = DEFAULT_LOCALE): string {
  const date = toDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatTime(value: string | Date | null | undefined, locale = DEFAULT_LOCALE): string {
  const date = toDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDateTime(value: string | Date | null | undefined, locale = DEFAULT_LOCALE): string {
  const date = toDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
]

export function getAvatarColor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] ?? AVATAR_COLORS[0] ?? 'hsl(var(--muted))'
}

export function initials(value: string | null | undefined): string {
  const parts = String(value ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return 'A'
  const first = parts[0] ?? ''
  if (parts.length === 1) return first.slice(0, 2).toUpperCase()

  const second = parts[1] ?? ''
  return `${first[0] ?? ''}${second[0] ?? ''}`.toUpperCase() || 'A'
}

export const ALLERGEN_LABELS: Record<string, string> = {
  gluten: 'Gluten',
  lacteos: 'Lacteos',
  huevo: 'Huevo',
  pescado: 'Pescado',
  crustaceos: 'Crustaceos',
  moluscos: 'Moluscos',
  frutos_secos: 'Frutos secos',
  cacahuetes: 'Cacahuetes',
  soja: 'Soja',
  apio: 'Apio',
  mostaza: 'Mostaza',
  sesamo: 'Sesamo',
  sulfitos: 'Sulfitos',
  altramuces: 'Altramuces',
}
