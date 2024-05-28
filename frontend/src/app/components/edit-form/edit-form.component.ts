import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/interfaces/Destination';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {

  constructor(private destinationService:DestinationService,
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number, title:string ,description:string ,location:string,
      pricePerNight:number, freeRooms:number,offer:number,imageUrl:string})
    {}

    onSubmit(editForm:any){
      console.log(this.data);
      this.destinationService.update(this.data,this.data.id);
      this.dialogRef.close();
    }
}
