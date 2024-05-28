export interface Reservation{
    id:number,
    destination:number,
    client:number|string,
    reservationDate:string,
    startDate:string,
    endDate:string,
    noNights:number,
    totalPrice:number,
}