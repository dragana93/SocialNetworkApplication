import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Member } from '../../models/member';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm ;

  member: Member | undefined;
  user: User | null;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if(!this.user) return;

    this.membersService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    });
  }

  updateMember() {
    console.log(this.member);
    if(!this.member) return;
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    })
  }
}