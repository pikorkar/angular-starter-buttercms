import Butter from 'buttercms';
import {environment} from '@butterCMS/environment';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ButtercmssdkService {
  constructor(private router: Router) {
  }

  getButterCMS() {
    const butterCmsPreview = !(environment.ANGULAR_APP_BUTTER_CMS_PREVIEW === 'false' || environment.ANGULAR_APP_BUTTER_CMS_PREVIEW === '0');
    return Butter(environment.ANGULAR_APP_BUTTER_CMS_API_KEY, butterCmsPreview);
  }

  navigateToNotFound() {
    this.router.navigate(['404']);
  }

}
