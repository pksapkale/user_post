import { Component, OnInit, inject } from '@angular/core';
import { AuthHelperServiceService } from '../services/auth-helper-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  authHelperService: AuthHelperServiceService = inject(AuthHelperServiceService);
  _router: Router = inject(Router);

  ngOnInit(): void {
    let userDetails: any = this.authHelperService.checkToken();  
    if(userDetails) {
      let user = JSON.parse(userDetails);
      this._router.navigateByUrl(`/dashboard/${user.user_id}`);
    } 
    else {
      this._router.navigateByUrl(`/log-in`);
    }
  }

}
