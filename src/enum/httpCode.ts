
export enum HttpCode {

    //Http method code
    BadRquest = 400,
    UnAuthorized = 401,
    NotFound = 404,

    //Custom code
    OUT_OF_STOCK = 601,
    NOT_ENOUGH_STOCK = 602,
    INVOICE_NOT_FOUND = 603,
    INVOICE_HAS_PAID = 604,
    INVOICE_OVER_AMOUNT = 605,

    //User
    INCORRECT_USER = 606
}
