import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const response = calculator.multiply(2, 7);
    console.log(response === 14);
    const response2 = calculator.divide(7, 0);
    console.log(response2 === null);
  }
}
