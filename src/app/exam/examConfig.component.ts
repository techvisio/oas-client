import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './examConfig.component.html',
  styleUrls: ['./examConfig.component.css']
})
export class examConfigComponent implements OnInit {

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService
  ) { }

   ngOnInit() {

  }

   sendToAddStudentsPage() {
        
    this.router.navigate(['exam/addCandidates']);
  }
}

