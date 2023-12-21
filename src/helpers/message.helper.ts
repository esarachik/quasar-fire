export class MessageHelper {

    getMessage(array1: string[], array2: string[], array3: string[]): string[] {
        if(!array1 || !array2 || !array3)
            return null

        const result: string[] = [];

        let pointer1 = 0;
        let pointer2 = 0;
        let pointer3 = 0;

        while (pointer1 < array1.length || pointer2 < array2.length || pointer3 < array3.length) {
            const mensaje1 = pointer1 < array1.length ? array1[pointer1] : "";
            const mensaje2 = pointer2 < array2.length ? array2[pointer2] : "";
            const mensaje3 = pointer3 < array3.length ? array3[pointer3] : "";
            let mensajeFinal: string = ""
            //correccion desfasaje 
            if (mensaje1 !== "") {
                pointer2 = mensaje2 === "" && array2.indexOf(mensaje1, pointer2) > -1 ? array2.indexOf(mensaje1, pointer2) : pointer2
                pointer3 = mensaje3 === "" && array3.indexOf(mensaje1, pointer3) > -1 ? array3.indexOf(mensaje1, pointer3) : pointer3
                mensajeFinal = mensaje1
            }
            if (mensaje2 !== "") {
                pointer1 = mensaje1 === "" && array1.indexOf(mensaje2, pointer1) > - 1 ? array1.indexOf(mensaje2, pointer1) : pointer1
                pointer3 = mensaje3 === "" && array3.indexOf(mensaje2, pointer3) > -1 ? array3.indexOf(mensaje2, pointer3) : pointer3
                mensajeFinal = mensaje2
            }
            if (mensaje3 !== "") {
                pointer1 = mensaje1 === "" && array1.indexOf(mensaje3, pointer1) > -1 ? array1.indexOf(mensaje3, pointer1) : pointer1
                pointer2 = mensaje2 === "" && array2.indexOf(mensaje3, pointer2) > -1 ? array2.indexOf(mensaje3, pointer2) : pointer2
                mensajeFinal = mensaje3
            }
            let inserted:boolean = false
            if (mensajeFinal != ""){
                inserted = true
                result.push(mensajeFinal)
            }
            if (array1[pointer1] !== "" || inserted) pointer1++
            if (array2[pointer2] !== "" || inserted) pointer2++
            if (array3[pointer3] !== "" || inserted) pointer3++
        }
        return result
    }
}