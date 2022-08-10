import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService,User } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {
  editmode = false;
  isSubmitted = false;
  currentUserId:string;
  form:FormGroup;
  countries = [];
  users = [];
  constructor(
    private formBuilder:FormBuilder,
    private usersService:UsersService,
    private messageService:MessageService, 
    private location: Location,
    private route:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this._getCountries();
    this._initForm();
    this._checkEditMode();
  }




  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe(user=>{
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    })
    }
  

  private _initForm(){
    this.form = this.formBuilder.group({
      id:this.currentUserId,
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    })
  }

  onSubmit(){

    this.isSubmitted = true;
  if (this.form.invalid) return;

  const user: User = {
    id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
  };
  if(this.editmode){
    this._updateUser(user);
  }else
  {
    user.password= this.userForm.password.value
    this._addUser(user);
  }
  
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }


  private _addUser(user: User){
   
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(1000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }
  
private _updateUser(user: User){
  this.usersService.updateUser(user).subscribe(
    (user: User) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `User ${user.name} is updated!`
      });
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User is not updated!'
      });
    }
  );
}

  

  get userForm(){
    return this.form.controls;
  }
}
