/**
 * Format money to string
 * @param {amount} number
 * @returns {string} string
 */
export const formatMoney = (amount: number): string => {
  return amount.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  })
}
