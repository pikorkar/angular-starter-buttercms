import {Component, OnInit} from '@angular/core';
import {environment} from '@butterCMS/environment';
import {ButtercmssdkService} from '../../../services/buttercmssdk.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  constructor(private bCMSSDKService: ButtercmssdkService) {
  }

  public menuData;

  ngOnInit(): void {
    this.bCMSSDKService.getButterCMS().content.retrieve(['navigation_menu'])
      .then(res => this.menuData = res)
      .catch(_ => this.bCMSSDKService.navigateToNotFound());
  }

  isApiToken(): boolean {
    return !!environment.REACT_APP_BUTTER_CMS_API_KEY;
  }

}
