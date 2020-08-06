import { Component, OnInit, DoCheck } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  userList: any = []
  constructor(private service: AppserviceService, private router: Router) {
    console.log(this.service.jsonData)
  }
  ngOnInit() {
    this.settingValue()
  }

  ngDoCheck() {
    console.log("ajskjasjsdahhsdak")
    this.settingValue();
  }
  settingValue() {
    this.userList = this.service.getCompleteData();
  }
  gettingValueFromTbl(data, type?) {
    switch (type) {
      case "delete":
        this.service.deleteValueFromList(data.id)
        break;
      case "edit":
        this.service.setEditedData(data);
        this.router.navigate(['edit']);
        break;
      default:
        break;
    }
  }
}
