import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedUser: any = {};
  updateUser: boolean = false;
  addUser: boolean = false;
  constructor(private service: AppserviceService, private router: Router) { }
  profileForm: FormGroup;
  ngOnInit() {
    this.selectedUser = this.service.getEditedData();
    console.log(this.selectedUser);
    if (!Object.keys(this.selectedUser).length && this.router.url === "/edit") {
      this.router.navigate(['home'])
    }
    if (this.router.url === "/edit") {
      this.updateUser = true;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.selectedUser.firstName, [Validators.required]),
        lastName: new FormControl(this.selectedUser.lastName, [Validators.required]),
        email: new FormControl(this.selectedUser.email, [Validators.required])
      });
    } else {
      this.addUser = true;
      this.profileForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required])
      });
    }

  }
  onUpdateUser() {
    let newFormData = { ...this.profileForm.value, id: this.selectedUser.id }
    this.service.setDataInJson(newFormData)
    this.router.navigate(['home'])
  }
  onAddUser() {
    // console.log(this.profileForm.value, "...profileform....", this.service.createUniqueId());
    const jsonCreation = { id: this.service.createUniqueId(), ...this.profileForm.value }
    console.log(jsonCreation)
    this.service.addingValueInArray(jsonCreation);
    this.router.navigate(['home'])
  }
}
