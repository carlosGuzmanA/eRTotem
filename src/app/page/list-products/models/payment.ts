export interface Payment {
    paymentMethod: string;
    userName:      string;
    detail:        Detail[];
}
interface Detail {
    sku: string;
    qty: number;
}