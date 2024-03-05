import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  standalone: true,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports:[CommonModule, TimeagoModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username: string;
  messageContent: string = '';

  constructor(public messageService: MessageService) { }

  ngOnInit(): void { }

  sendMessage() {
    if(!this.username) return;


    this.messageService.sendMessage(this.username, this.messageContent)?.then(() => {
      this.messageForm?.reset();
    });
  }
}
