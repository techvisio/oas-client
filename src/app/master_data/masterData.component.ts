import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { sharedService } from '../common/shared.service';
import { MasterDataDetail, MasterDataService, Data } from './masterData.service';

@Component({
  templateUrl: './masterData.component.html',
  styleUrls: ['./masterData.component.css']
})

export class MasterDataComponent implements OnInit {

  public masterData: MasterDataDetail = new MasterDataDetail();
  public masterDataNames: any[] = [];
  public customDataSelected = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService,
    private service: MasterDataService
  ) { }

  ngOnInit() {
    this.getMasterDataNames();
  }

  getMasterDataNames() {
    var context = this;
    context.service.getMasterDataNames().then(response => {
      if (response.status === 'success') {
        context.masterDataNames = response.data;
        console.log(context.masterDataNames)
      }

    });
  }


  saveListOfData() {
    var context = this;
    context.service.saveListOfData(context.masterData).then(response => {
      if (response.status === 'success') {
        context.masterData = response.data;
        console.log(context.masterData)
      }

    });

  }

  updateMasterData() {
    var context = this;
    context.service.updateMasterData(context.masterData).then(response => {
      if (response.status === 'success') {
        context.masterData = response.data;
        console.log(context.masterData)
      }

    });

  }
  getMasterData() {
    var context = this;
    this.service.getMasterData(context.masterData.dataName).then(response => {
      if (response.status === 'success') {

        context.masterData.data = response.data;

      }
    });
  }

  addMoreData() {
    var data = new Data();
    this.masterData.data.push(data);

  }

  onselect(customDataSelected) {
    var context = this;
    context.masterData.data.forEach(function (data) {
      if (data.value === customDataSelected) {
        context.masterData.data = [];
        context.masterData.data.push(data);
      }
    });
  }


}