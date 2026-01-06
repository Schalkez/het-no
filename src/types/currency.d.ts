declare module 'currency.js' {
  export interface Options {
    symbol?: string
    separator?: string
    decimal?: string
    errorOnInvalid?: boolean
    precision?: number
    increment?: number
    useVedic?: boolean
    pattern?: string
    negativePattern?: string
    format?: (currency: Currency, options: Options) => string
    fromCents?: boolean
  }

  export interface Currency {
    add(number: number | string | Currency): Currency
    subtract(number: number | string | Currency): Currency
    multiply(number: number | string | Currency): Currency
    divide(number: number | string | Currency): Currency
    distribute(count: number): Currency[]
    dollars(): number
    cents(): number
    format(options?: Options | ((currency: Currency, options: Options) => string)): string
    toString(): string
    toJSON(): number
    value: number
    intValue: number
  }

  function currency(value: number | string | Currency, options?: Options): Currency
  export default currency
}
