import {Component, OnInit} from '@angular/core';
import {ButtercmssdkService} from '../../../../services/buttercmssdk.service';
import {ActivatedRoute, Router} from '@angular/router';

enum BLOG_TYPE {
  ALL = 'all',
  CATEGORY = 'category',
  TAG = 'tag',
  SEARCH = 'search',
  POST = 'post'
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  public posts;
  public categories;
  public title;
  public post;

  public blogType = BLOG_TYPE.ALL;

  constructor(private bCMSSDKService: ButtercmssdkService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bCMSSDKService.getButterCMS().category.list()
      .then(res => this.categories = res.data.data)
      .catch(_ => this.bCMSSDKService.navigateToNotFound());

    this.getPosts(this.route.snapshot.params.type, this.route.snapshot.params.slug, this.route.snapshot.queryParams.q);
  }

  navigationChange(type, slug, searchParam) {
    if (searchParam) {
      this.router.navigate(['blog', 'search'], {queryParams: {q: searchParam}});
    } else if (!slug) {
      this.router.navigate(['blog', type]);
    } else {
      this.router.navigate(['blog', type, slug]);
    }
    this.getPosts(type, slug, searchParam);
  }

  getPosts(typeParam, slugParam, searchParam) {
    let filterBy = {};
    if (typeParam === BLOG_TYPE.SEARCH) {
      this.blogType = BLOG_TYPE.SEARCH;
      this.title = searchParam;
      this.bCMSSDKService.getButterCMS().post.search(this.title)
        .then(res => this.posts = res.data.data)
        .catch(_ => this.bCMSSDKService.navigateToNotFound());
    } else if (typeParam && !slugParam) {
      // can be article
      this.bCMSSDKService.getButterCMS().post.retrieve(typeParam)
        .then(res => {
          this.blogType = BLOG_TYPE.POST;
          this.post = res.data.data;
        })
        .catch(_ => this.bCMSSDKService.navigateToNotFound());
    } else {
      if (typeParam && slugParam) {
        if (typeParam === BLOG_TYPE.CATEGORY) {
          this.blogType = BLOG_TYPE.CATEGORY;
          this.title = slugParam;
          this.bCMSSDKService.getButterCMS().category.retrieve(slugParam)
            .then(res => this.title = res.data.data.name);
          filterBy = {category_slug: slugParam};
        } else if (typeParam === BLOG_TYPE.TAG) {
          this.blogType = BLOG_TYPE.TAG;
          this.title = slugParam;
          this.bCMSSDKService.getButterCMS().tag.retrieve(slugParam)
            .then(res => this.title = res.data.data.name);
          filterBy = {tag_slug: slugParam};
        } else {
          this.bCMSSDKService.navigateToNotFound();
        }
      }

      this.bCMSSDKService.getButterCMS().post.list(filterBy)
        .then(res => this.posts = res.data.data)
        .catch(_ => this.bCMSSDKService.navigateToNotFound());
    }
  }

}
