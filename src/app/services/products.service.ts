import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private fs:AngularFirestore){}
  /* Get all of categories */
  getAllItems(category:string){
    return this.fs.collection(`${category}`).snapshotChanges();
  }
  /* Get items by type */
  getItemByType(category:string,type:any){
    return this.fs.collection(`${category}`, ref => ref.where('type', '==', type)).snapshotChanges()
  }
  getItemByColor(category:string,color:any){
    return this.fs.collection(`${category}`, ref => ref.where('color', 'array-contains', color )).snapshotChanges()
  }
  getItemBySize(category:string,size:any){
    return this.fs.collection(`${category}`, ref => ref.where('size', 'array-contains', size )).snapshotChanges()
  }
  /* Get items by id */
  getItemById(category:string,id:string){
    return this.fs.collection(`${category}`).doc(id).snapshotChanges()
  }
  /* Get related items */
  getRelatedItems(category:string,type:any){
    return this.fs.collection(`${category}`, ref => ref.where('type', '==', type)).snapshotChanges()
  }
  /* wishlist */
  setItemsToWishList(userId:any,id:string,imageUrl:string,name:string,price:number,category:any){
    return this.fs.collection('users').doc(userId).collection('wishlist').doc(id).set({itemId : id,name:name,price:price,imageUrl:imageUrl,category:category})
  }
  getItemsFromWishList(userId:any){
    return this.fs.collection('users').doc(userId).collection('wishlist').snapshotChanges()
  }
  deleteFromWishList(userId:any,id:string){
    return this.fs.collection('users').doc(userId).collection('wishlist').doc(id).delete()
  }
  /* Cart */
  setItemsIdToCart(userId:any,id:string,color:string,size:string,qu:number,name:string,price:number,imageUrl:string,category:string){
    return this.fs.collection('users').doc(userId).collection('cart').doc(id).set({itemId : id,color:color,size:size,quantity:qu,name:name,price:price,imageUrl:imageUrl,category:category})
  }
  getItemsFromCart(userId:any){
    return this.fs.collection('users').doc(userId).collection('cart').snapshotChanges()
  }
  deleteFromCart(userId:any,id:string){
    return this.fs.collection('users').doc(userId).collection('cart').doc(id).delete()
  }
  /* CheckOut */
  addToOrders(username:any,userId:string,shippingInfo:{},products:any,totalprice:number,date:any){
    return this.fs.collection('orders').add({username:username,userId:userId,shippingInfo:shippingInfo,items:products,totalprice:totalprice,date:date})
  }
  getUserOrders(userId:any){
    return this.fs.collection('orders', ref => ref.where('userId', '==', userId)).snapshotChanges()
  }
  /* Promo code */
  getVoucherCode(){
    return this.fs.collection('voucher code').snapshotChanges();
  }
  /* Get username */
  getUserName(userId:any){
    return this.fs.collection("users").doc(userId).valueChanges();
  }
  /* Review */
  setReview(userId:any,username:any,itemId:any,rate:number,review:string,date:any){
    return this.fs.collection('reviews').add({userId:userId,username:username,itemId:itemId,rate:rate,review:review,date:date})
  }
  getReviews(itemId:any){
    return this.fs.collection('reviews', ref => ref.where('itemId', '==', itemId)).snapshotChanges()
  }
  /* Sort */
  getSortedItemsAsc(category:string){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'asc')).snapshotChanges()
  }
  getSortedItemsDesc(category:string){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'desc')).snapshotChanges()
  }
  getSortedItemsAscWithType(category:string,type:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'asc').where('type', '==', type)).snapshotChanges()
  }
  getSortedItemsDescWithType(category:string,type:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'desc').where('type', '==', type)).snapshotChanges()
  }
  getSortedItemsAscWithColor(category:string,color:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'asc').where('color','array-contains', color)).snapshotChanges()
  }
  getSortedItemsDescWithColor(category:string,color:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'desc').where('color','array-contains', color)).snapshotChanges()
  }
  getSortedItemsAscWithSize(category:string,size:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'asc').where('size','array-contains', size)).snapshotChanges()
  }
  getSortedItemsDescWithSize(category:string,size:any){
    return this.fs.collection(`${category}`, ref => ref.orderBy("price",'desc').where('size','array-contains', size)).snapshotChanges()
  }
}
