import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { sharedService } from '../common/shared.service';
import { MasterDataDetail, MasterDataService } from './masterData.service';

@Component({
  templateUrl: './masterData.component.html',
  styleUrls: ['./masterData.component.css']
})

export class MasterDataComponent implements OnInit {


  public masterDataNames: any[] = [];

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
}