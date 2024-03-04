import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { PresenceService } from 'src/app/services/presence.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member = {} as Member;
  activeTab: TabDirective;
  images: GalleryItem[] = [];

  messages: Message[] = [];
  pagination: Pagination;
  container = 'Outbox';
  pageNumber = 1;
  pageSize = 5;

  user?: User;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public presenceService: PresenceService
  ) { 

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  ngOnInit(): void {

    this.route.data.subscribe({
      next: data => this.member = data["member"]
    })

    this.route.queryParams.subscribe(params => {
      params['tab'] ? this.selectTab(params['tab']) : this.selectTab("Messages")
    })

    this.getImages();
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.messageService.createHubConnection(this.user, this.member.username);
    }else{
      this.messageService.stopHubConnection();
    }
  }

  selectTab(heading: string) {
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    } 
  }

  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.username).subscribe((messages) => {
        this.messages = messages;
      });
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}