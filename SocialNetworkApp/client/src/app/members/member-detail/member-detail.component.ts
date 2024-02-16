import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule]
})
export class MemberDetailComponent implements OnInit {
  // @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member | undefined;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[] = [];
  activeTab: TabDirective;
  images: GalleryItem[] = [];

  // messages: Message[] = [];
  // pagination: Pagination;
  // container = 'Outbox';
  // pageNumber = 1;
  // pageSize = 5;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    //private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMember();

    // this.route.queryParams.subscribe(params => {
    //   params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0)
    // })

    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false,
    //   },
    // ];

    // this.galleryImages = this.getImages();
  }

  loadMember() {

    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.memberService.getMember(username).subscribe(
      member => {
        this.member = member;
        this.getImages();
      }
    );


  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url, }))
    }
  }

  // getImages(): NgxGalleryImage[] {
  //   let imageUrls: NgxGalleryImage[] = [];
  //   for (let photo of this.member.photos) {
  //     imageUrls.push({
  //       small: photo.url,
  //       medium: photo.url,
  //       big: photo.url,
  //     });
  //   }
  //   return imageUrls;
  // }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    // if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
    //   this.loadMessages();
    // }
  }

  selectTab(tabId: number) {
    // this.memberTabs.tabs[tabId].active = true;
  }

  // loadMessages() {
  //   this.messageService
  //     .getMessageThread(this.member.username)
  //     .subscribe((messages) => {
  //       this.messages = messages;
  //     });
  // }
}