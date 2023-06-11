import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-validate-hash-user',
  templateUrl: './validate-hash-user.component.html',
  styleUrls: ['./validate-hash-user.component.css']
})
export class ValidateHashUserComponent {
  validate = false;
  hash: string = '';

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(){
    this.hash = this.route.snapshot.params["hash"];
    this.validateHash();
  }

  validateHash() {
    this.securityService.validateHashUser(this.hash).subscribe({
      next: (response: boolean) => {
        this.validate = response;
      },
      error: (error) => {
        this.validate = false;
      }
    })
  }

}
