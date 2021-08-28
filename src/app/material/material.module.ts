import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button'


const MaterialComponent = [
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})

export class MaterialModule { }


