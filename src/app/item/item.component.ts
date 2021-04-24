import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Item } from './item.model';
import { ItemsService } from "./items.service";



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public itemService : ItemsService, public routes: ActivatedRoute){}

  private mode = "create";
  private itemId: string;
  form: FormGroup;
  currentPost: Item;


  ngOnInit(){
    this.form = new FormGroup({
      name : new FormControl(null,{
              validators: [Validators.required, Validators.minLength(3)]
              }),
      description: new FormControl(null,{
                    validators: [Validators.required]
                  }),
      price: new FormControl(null,{
                validators : [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(1),]
              })

    });

    this.routes.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('itemId')){
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.itemService.getItem(this.itemId).subscribe(itemData =>{
          this.currentPost = {id: itemData._id, name: itemData.name, description: itemData.description, price : itemData.price };
          this.form.setValue({name: this.currentPost.name, description: this.currentPost.description, price:this.currentPost.price});
        });

      }
      else {
        this.mode= 'create';
        this.itemId = null;
      }
    })
  }


  onSavePost(){
    if(this.form.invalid){
      return;
    }

    if(this.mode === 'create'){
        this.itemService.addToItems(this.form.value.name, this.form.value.description, this.form.value.price)
    }
    else{
        this.itemService.updatePost(this.itemId,this.form.value.name, this.form.value.description, this.form.value.price)
    }
      this.form.reset();
    }

}
