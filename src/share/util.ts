

export default class Util {


    generateInvoice(invlice: any, size: number, str: string) {
        return str + invlice.toString().padStart(size, "0")
    }

    //use generateInvoice(startNumber, size, string)
}