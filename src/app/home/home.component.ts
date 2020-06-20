import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  servers;
  locations = [];
  location: string;
  hardDiskType: string;
  storeData;
  myForm: FormGroup;
  noData = true;
  ram: any = [
    {
      name: "2GB",
      value: "2GB"
    },
    {
      name: "4GB",
      value: "4GB"
    },
    {
      name: "8GB",
      value: "8GB"
    },
    {
      name: "12GB",
      value: "12GB"
    },
    {
      name: "16GB",
      value: "16GB"
    },
    {
      name: "24GB",
      value: "24GB"
    },
    {
      name: "32GB",
      value: "32GB"
    },
    {
      name: "48GB",
      value: "48GB"
    },
    {
      name: "64GB",
      value: "64GB"
    },
    {
      name: "96GB",
      value: "96GB"
    }
  ];

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getServers();

    this.myForm = this.fb.group({
      hardDiskType: '',
      location: '',
      checkArray: this.fb.array([])
    });
  }

  getServers() {
    // get server data
    this.dataService.getServers().subscribe(
      (data) => {
        this.servers = data;
        this.servers.length === 0 ? this.noData = true : this.noData = false;
        this.storeData = _.cloneDeep(this.servers) ;
        if (this.locations.length === 0) {
          this.getLocations();
        }
      }
    );
  }

  // get locations
  getLocations() {
    this.locations = [...new Set(this.storeData.map(item => item.Location))];
  }

  onSubmit(data) {
    this.servers = this.storeData;
    if (data.hardDiskType) {
      this.onChangeHardDisk(data.hardDiskType);
    }
    if (data.location) {
      this.onChangeLocation(data.location);
    }

    if (data.checkArray.length > 0) {
      this.onRamSelection(data.checkArray);
    }
    this.servers.length === 0 ? this.noData = true : this.noData = false;

  }

  onRamSelection(data) {
    const filtered = [];
    this.servers.forEach(element => {
      data.forEach(item => {
        if (element.RAM.startsWith(item)) {
          filtered.push(element);
        }
      });
    });

    this.servers = filtered;

  }

  onChangeLocation(data) {
    const filtered = this.servers.filter(
      (item) => {
        return (item.Location === data);
      }
    );
    this.servers = filtered;
  }

  onChangeHardDisk(data) {
    
    const filtered = this.servers.filter(
      (item) => {
        return (item.HDD.includes(data));
      }
    );
    this.servers = filtered;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.myForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
