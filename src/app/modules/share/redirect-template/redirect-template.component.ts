import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-template',
  templateUrl: './redirect-template.component.html',
  styleUrls: ['./redirect-template.component.css']
})
export class RedirectTemplateComponent {
  
  constructor(
    private router: Router
  ){}


redirect(){
  this.router.navigate(["/"])
}

}
