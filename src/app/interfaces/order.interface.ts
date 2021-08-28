// export interface Orde{
//     id : string,
//     date : any,
//     shippingInfo:{street:string,apart:string,phone:number,city:string},
//     items : {name:string,price:number,size:string,color:string,quantity:number,
//             itemId:string,imageUrl:string,category:string}[],
//     totalprice:number
// }
export interface Order{
    id:any,
    userId:any,
    username:any,
    items: {category:string,itemId:string,name:string,size:string,color:string,quantity:number,price:number,imageUrl:string}[],
    shippingInfo: {city:string,apart:string,phone:number,street:string},
    date: string
    totalprice: number,
}