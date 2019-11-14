/**
 * 
 * @param rut formato es sin puntos con guión y dígito verificador
 */
export function isValidRut(rut: string): boolean {
    let limpio = rut.toUpperCase()
        .replace(/[^0-9K]/g, '')

    let [num, dv] = [limpio.slice(0, -1), limpio.slice(-1)]

    return getDV(+num) == dv.toUpperCase()

}

/**Formatea el RUT
 * @param rut El rut puede o no incluir guion y puntos
 * @param usaPunto: Entrega el formato de rut con puntos separador de miles
 */
export function formatRut(rut: string, usaPunto: boolean = false) {
    let limpio = rut.toUpperCase()
        .replace(/[^0-9K]/g, '')

    let [num, dv] = [limpio.slice(0, -1), limpio.slice(-1)]
    if (getDV(+num) != dv) throw 'El rut es incorrecto'
    //if (usaPunto) num = (+num).toLocaleString("cl-CL")
    if (usaPunto)
        num = num.split('')
            .reverse()
            .reduce((acc, n, j) => {
                if (j % 3 == 0) acc.unshift(n)
                else acc[0] = n + acc[0]
                return acc
            }, [])
            .join('.')
    return `${num}-${dv}`
}

/**
 * Obtiene el dígito verificador para el cuerpo del rut 
 * @param cuerpo: El cuerpo del rut (dígitos antes del guión) y sólo debe contener caracteres numéricos
 * */
export function getDV(cuerpo: number | string) {
    cuerpo = +cuerpo
    if (isNaN(cuerpo)) throw 'El parámetro sólo debe contener carcatéres numéricos'
    let ser = [2, 3, 4, 5, 6, 7]

    let sum = cuerpo.toString()
        .split('')
        .reverse()
        .map(x => +x)
        .reduce((acc, x, i) => acc + x * ser[i % 6], 0)

    let m = 11 - sum % 11

    if (m == 11) return '0'
    if (m == 10) return 'K'
    return m.toString()
}

/**
 * Retorna la parte del rut correspondiente al cuerpo
 * @param rut El rut puede o no incluir guion y puntos
 */
export function extraeCuerpo(rut: string): string {
    return formatRut(rut).split('-')[0]
}