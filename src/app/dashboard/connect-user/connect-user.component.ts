import { Component, OnInit, inject } from '@angular/core';
import { DashboardApiServiceService } from '../services/dashboard-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connect-user',
  standalone: true,
  imports: [],
  templateUrl: './connect-user.component.html',
  styleUrl: './connect-user.component.css',
})
export class ConnectUserComponent implements OnInit {
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _dashboardService: DashboardApiServiceService = inject(DashboardApiServiceService);

  userList: any[] = [];
  currentUserFollowsTo: any[] = [];
  userId: number = 0;

  ngOnInit(): void {
    this.userId = this._route.snapshot.params['user_id'];
    this.getUserList();
  }

  getUserList() {
    this._dashboardService.get_user_list().subscribe({
      next: (data) => {
        if (data.status) {
          this.userList = data.data;
          let currentUserDetails: any = this.userList.find(e => e.user_id == this.userId);
          this.currentUserFollowsTo = currentUserDetails['connected_user_ids'] ? currentUserDetails['connected_user_ids'].split(',') : [];
          this.userList = this.userList.map(e => {
            e.isFollowing = false;
            if (this.currentUserFollowsTo.some(e1 => e1 == e.user_id)) {
              e.isFollowing = true;
            }
            return e;
          });
        } else {
          console.log('Error in {getUserList} in {connect-user-component}');
        }
      },
      error: (err) => {
        console.log('Error in {getUserList} in {connect-user-component}, ERROR ----->>>>> ', err);
      },
    });
  }

  connectUser(user_id_to_connect: number) {
    this.currentUserFollowsTo.push(user_id_to_connect);
    this.currentUserFollowsTo = [...new Set(this.currentUserFollowsTo)]
    let obj = {
      user_id: this.userId,
      connected_ids: this.currentUserFollowsTo.join(',')
    }
    this._dashboardService.connect_user(obj).subscribe({
      next: (data) => {
        if (data.status) {
          this.getUserList();
        } else {
          console.log('Error in {getUserList} in {connect-user-component}');
        }
      },
      error: (err) => {
        console.log('Error in {getUserList} in {connect-user-component}, ERROR ----->>>>> ', err);
      },
    });
  }

  jumpToRoute(route: string) {
    this._router.navigateByUrl(`/dashboard/${this.userId}/${route}`);
  }
}
