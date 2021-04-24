import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Item } from '../item/item.model';
import { ItemsService } from "../item/items.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {


  constructor(public itemService : ItemsService){}
  items: Item[] =[];
  private itemSub : Subscription;

   ngOnInit(){
    this.itemService.getItems();
    this.itemSub = this.itemService.getUpdatedItemListener()
    .subscribe((data : Item[])=>{
      this.items = data;
    });
  }

  onDelete(itemId : string){
    this.itemService.deleteItem(itemId);
  }
  ngOnDestroy(){
  this.itemSub.unsubscribe();
  }

}
