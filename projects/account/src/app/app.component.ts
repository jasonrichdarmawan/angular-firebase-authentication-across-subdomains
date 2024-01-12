import { Component, Inject } from '@angular/core';
import { COMMON_ENVIRONMENT_TOKEN, CommonEnvironment } from 'projects/common/environments/environment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'account';

  constructor(
    @Inject(COMMON_ENVIRONMENT_TOKEN) public commonEnvironment: CommonEnvironment,
    ) {

  }
}
