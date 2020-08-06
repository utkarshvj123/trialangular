import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  currentAddition = -90;

  jsonData = [
    {
      id: 1,
      firstName: "Utkarsh",
      lastName: "Vijayvargiya",
      email: "xyz@gmaul.com",
    },
    {
      id: 2,
      firstName: "abc",
      lastName: "xyz",
      email: "abc@gmail.com",
    },
    {
      id: 3,
      firstName: "qwerty",
      lastName: "qaz",
      email: "qaz@gmaul.com",
    },
  ];
  editData: any = {};
  constructor() {
  }

  setDataInJson(newValue) {
    const newArray = []
    this.jsonData.forEach((obj) => {
      if (obj.id === newValue.id) {
        console.log("hello")
        obj = newValue;
      }
      newArray.push(obj)
    });
    this.jsonData = [...newArray];
  }

  deleteValueFromList(valueToDelete) {
    let newData = this.jsonData.filter(obj => obj.id !== valueToDelete);
    console.log(newData);
    this.jsonData = newData;
    return this.jsonData;
  }
  getCompleteData() {
    return this.jsonData;
  }
  setEditedData(data) {
    this.editData = data
  }
  getEditedData() {
    return this.editData;
  }

  addingValueInArray(valueToAdd) {
    this.jsonData.push(valueToAdd)
  }


  createUniqueId() {
    // console.log(this.jsonData.length);
    if (this.currentAddition < -1) {
      this.currentAddition = -1;
    }
    const newIdCreation = this.jsonData.length + this.currentAddition;
    console.log(this.checkingAvailableOrNot(newIdCreation))
    if (this.checkingAvailableOrNot(newIdCreation) === true) {
      // this.checkingAvailableOrNot(newIdCreation)
      return this.createUniqueId();
    } else {
      console.log(newIdCreation)
      return newIdCreation;
    }
  }

  checkingAvailableOrNot(newId) {
    if (this.jsonData.find(obj => obj.id === newId) !== undefined) {
      console.log("values.......",)
      this.currentAddition += 1;
      return true;
    } else {
      this.currentAddition = 0;
      return false;
    }
  }
}


