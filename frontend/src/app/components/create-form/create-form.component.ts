import { Component } from '@angular/core';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  constructor(private destinationService:DestinationService){

  }

  defaultOffer:number=0;

  onSubmit(createForm:any){
    console.log(createForm.value);
    this.destinationService.create(createForm.value);
  }
}
