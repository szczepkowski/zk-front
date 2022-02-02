import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessageService} from '../services/message-service';
import {MessageModel} from '../services/message-model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onEmailSend(form: NgForm) {
    const message = {
      title: form.value.title,
      body: form.value.text,
      city: form.value.city,
      email: form.value.email,
    };
    const booleanObservable = this.messageService.addMessage(message);
    booleanObservable.subscribe(send => {
      if (send) {
        alert('email sent');
        form.reset();
      } else {
        alert(' we could not send your message -try again ');
      }
    });
  }
}
