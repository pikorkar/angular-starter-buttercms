import {Component, OnInit} from '@angular/core';
import {ButtercmssdkService} from '../../../../services/buttercmssdk.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  public pageData;
  public posts;

  constructor(private bCMSSDKService: ButtercmssdkService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bCMSSDKService.getButterCMS().page.retrieve('landing-page', 'landing-page-with-components')
      .then(res => {
        this.pageData = res.data.data.fields;

        setTimeout(() => {
          const f = this.route.snapshot.fragment;
          const element = document.querySelector('#' + f);
          if (element) {
            element.scrollIntoView();
          }
        }, 500);
      })
      .catch(_ => this.bCMSSDKService.navigateToNotFound());

    this.bCMSSDKService.getButterCMS().post.list({page: 1, page_size: 2})
      .then(res => this.posts = res)
      .catch(_ => this.bCMSSDKService.navigateToNotFound());
  }

}
