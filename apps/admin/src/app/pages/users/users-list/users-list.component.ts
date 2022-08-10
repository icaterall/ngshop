import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService,User } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit,OnDestroy {
users:User[]= [];
endsubs$: Subject<any> = new Subject();
  constructor(
    private usersService:UsersService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private router:Router
  ) { }

  ngOnInit(): void {
this._getUsers();
  }
  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  deleteUser(userId:string){

    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );   
     
     
        },
      reject: () => {}
    });  
  }
  
  //Update User function
  updateUser(userId:string){
  this.router.navigateByUrl(`users/form/${userId}`);
  }
  
  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
  }

private _getUsers(){
  this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe((users=>{
    this.users = users;
  }))
}
}
