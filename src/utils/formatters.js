import { format } from "date-fns";
/**
 * Formata um número (float ou string) como valor em Euro.
 * Exemplo: 1234.56 → "€ 1.234,56"
 */
export function formatCurrency(value, currency = "EUR") {
  const number = typeof value === "string" ? parseFloat(value) : value;
  // console.log(number);

  if (isNaN(number)) return "€ 0,00";

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(number);
}

/**
 * Converte uma string formatada (ex: "€ 1.234,56") em número float
 * Retorna: 1234.56
 */
export function parseCurrencyString(value) {
  if (!value) return 0;

  return parseFloat(
    value
      .replace(/[€\s]/g, "") // remove símbolo e espaços
      .replace(/\./g, "") // remove separador de milhar
      .replace(",", ".") // troca vírgula por ponto
  );
}

export function transformToChartData(obj) {
  if (!obj || typeof obj !== "object") return [];

  const data = Object.entries(obj).map(([label, value], index) => ({
    id: index,
    label,
    value,
  }));
  return data;
}

export function formatFirestoreDate(timestamp) {
  if (!timestamp || !timestamp.toDate) return "";
  return format(timestamp.toDate(), "dd/MM/yyyy");
}

export function formatToInputDate(timestamp) {
  if (!timestamp || !timestamp.toDate) return "";
  return format(timestamp.toDate(), "yyyy-MM-dd");
}
