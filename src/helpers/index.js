

export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('es-US',{
        style:'currency',
        currency:'PEN'
    })
}

export const formatNumero = total =>{
    return total.toFixed(2)
}



