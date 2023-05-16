import jsPDF from "jspdf";

export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('es-US',{
        style:'currency',
        currency:'PEN'
    })
}

export const formatNumero = total =>{
    return total.toFixed(2)
}


// var doc = new jsPDF();
// var elementHTML = $('#boleta').html();
// var specialElementHandlers = {
//   '#elementH' : function (element,renderer){
//     return true;
//    }
// };

// doc.fromHTML(elementHTML,15,15,{
//     'with':170,
//     'elementHandlers': specialElementHandlers
// });

// doc.save('descarga.pdf')

