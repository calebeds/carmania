import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from '../lib/requests.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    subject: [null, Validators.required],
    message: [null, Validators.required]
  });

  subjectsForm: string[] = [
    'Give me work',
    'Got a proposal',
    'Advertise',
    'Other'
  ];

  onSuccess = false;

  onError = {
    show: false,
    message: ''
  }

  constructor(private rs: RequestsService, private fb: FormBuilder) { }

  submitForm() {
    
    if(this.contactForm.valid){
      this.resetError();// Removing any error when submitting the form

      this.rs.storeMessage(this.contactForm.value).subscribe(
        data => {
          console.log(data);
          this.onSuccess = true;
        },
        err => {
          this.onError = {
            show: true,
            message: 'Sorry, something happened, try again'
          }
        }
      );
    } else {
      this.onError = {
        show: true,
        message: 'Sorry, the form is not valid, check your data.'
      }
    }
  }

  resetError() {
    this.onError = {show: false, message: ''}
  }

  ngOnInit(): void {
  
  }

}
