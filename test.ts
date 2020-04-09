import { isValidRut } from ".";


let rut = '13924125-8'
console.log(rut, isValidRut(rut) == true)
rut = '13924125'
console.log(rut, isValidRut(rut) == false)

rut = ''
console.log(rut, isValidRut(rut) == false)

rut = 'K'
console.log(rut, isValidRut(rut) == false)

rut = null
console.log(rut, isValidRut(rut) == false)

rut = '139241258-'
console.log(rut, isValidRut(rut) == true)

rut = '454KK'
console.log(rut, isValidRut(rut) == false)

rut = '76562214K'
console.log(rut, isValidRut(rut) == true)