import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> | undefined;
  // pagination: Pagination;
  // userParams: UserParams;
  // user: User;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private memberService: MembersService) {
    //this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    //this.loadMembers();
    this.members$ = this.memberService.getMembers();
  }

  // loadMembers() {
  //  //this.memberService.setUserParams(this.userParams);
  //   this.memberService.getMembers().subscribe((response) => {
  //     this.members = response;
  //    // this.pagination = response.pagination;
  //   });
  // }

  // resetFilters() {
  //   this.userParams = this.memberService.resetUserParams();
  //   this.loadMembers();
  // }

  // pageChanged(event: any) {
  //   this.userParams.pageNumber = event.page;
  //   this.memberService.setUserParams(this.userParams);
  //   this.loadMembers();
  // }

}
