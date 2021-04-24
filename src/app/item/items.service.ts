import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from "./item.model";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class ItemsService{
  private items: Item[] = [];
  private updateditems = new Subject<Item[]>();

  constructor(private http: HttpClient, private route: Router){}

  getItems(){
    this.http.get<{message:string,items:any}>('http://localhost:3000/api/items')
      .pipe(map(itemData =>{
        return itemData.items.map(item=>{
          return {
            name : item.name,
            description : item.description,
            id : item._id,
            price: item.price
          }
        })
      }))
      .subscribe((transformedPosts)=>{
        this.items = transformedPosts
        this.updateditems.next([...this.items]);
      })
  }

  getUpdatedItemListener(){
    return this.updateditems.asObservable();
  }

  getItem(itemId: string){
    return this.http.get<{_id:string, name:string, description:string, price: number}>('http://localhost:3000/api/items/'+ itemId)
  }


  addToItems(name : string, description : string, price: number)
  {

    let itemData = {name: name, description: description, price: price};
    this.http.post<{msg:string, item: Item}>('http://localhost:3000/api/items', itemData)
      .subscribe((responseData)=>{
        const item: Item = {id: responseData.item.id, description: description, name:name, price: price };
        this.items.push(item);
        this.updateditems.next([...this.items]);
        this.route.navigate(["/"]);
      })
  }

  deleteItem(postId : string){
    this.http.delete('http://localhost:3000/api/items/'+ postId)
      .subscribe(()=>{
        console.log(postId);
        const postUpdated = this.items.filter(post => post.id != postId);
        this.items = postUpdated;
        this.updateditems.next([...this.items]);

      })
  }

  updatePost(postId : string, name: string, description: string, price:number){
    let post: Item = {id: postId, name: name, description: description, price: price};
    this.http.put('http://localhost:3000/api/items/'+ postId, post)
    .subscribe((responseData) =>{
      const postsCloned = [...this.items];
      const updatePostIndex = postsCloned.findIndex(p => p.id === post.id)
      postsCloned[updatePostIndex] = post;
      this.items = postsCloned;
      this.updateditems.next([...this.items]);
      this.route.navigate(["/"]);


    })
  }


}
