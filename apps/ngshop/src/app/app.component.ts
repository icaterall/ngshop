import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
  title = 'ngshop';
  constructor(
    private usersServices:UsersService
    ){

  }
  ngOnInit(){
this.usersServices.initAppSession();
  }

}
