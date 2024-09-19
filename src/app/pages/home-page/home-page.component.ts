import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts:any[] = [];
  userId:any = '';

  ngOnInit(): void {
    this.userId = localStorage.userId;
    this.postService.getPosts().subscribe((data:any) => {

      if(data.message == 'success'){
        this.posts = data.data
      }
    })
  }

}
