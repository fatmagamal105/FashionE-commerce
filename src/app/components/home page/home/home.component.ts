import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeDialogComponent } from 'src/app/welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(WelcomeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
