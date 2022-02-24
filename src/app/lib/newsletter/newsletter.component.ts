import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NewsletterService, FormError } from '../newsletter.service';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  // Formgroup added to html
  newsletterForm: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]]
  });

  

  // Object will control the error message
  formError: FormError = {
    show: false,
    message: ''
  };

  // Property will control the sucessful message
  formSuccess: boolean = false;

  // Property will disable button
  disableButton: boolean = false;

  constructor(private fb: FormBuilder, private newsletterService: NewsletterService) { }

  submitForm() {
    this.disableButton = true; // Disabling the button

    if(this.newsletterForm.valid){
      this.newsletterService.subscribeUser(this.newsletterForm.value.email).subscribe(
        data => {
          this.formSuccess = true;
          this.newsletterForm.reset();
          this.enableButton(); //Enabling button after 2 seconds
        },
        err => {
          this.handleError('show', err);
        }
      );
    }else {
      this.handleError('show', 'You need a valid email to subscribe!');
    }

  }

  handleError(type: string, message: string) {
    if(type === 'reset'){
      this.formError = {
        show: false,
        message: message
      }
    } else {
      this.formError = {
        show: true,
        message: message
      };
    } 
    this.enableButton();
  }

  enableButton() {
    setTimeout(() => {
      this.disableButton = false;
    }, 2000)
  }

  ngOnInit(): void {
    // const email = this.newsletterForm.controls['email'];
    // console.log(this.newsletterForm.controls['email'].errors!['required']);
  }

}
