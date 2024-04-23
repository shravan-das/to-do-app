import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostdataService } from '../postdata.service';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss'
})
export class LikedComponent implements OnInit{
  likedPosts:Post[] = [];
  constructor(private postService:PostService , private postDataService:PostdataService , private router:Router, private route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.likedPosts = this.getLikePost();

  }

 getLikePost(): Post[] {
    const allPosts = this.postDataService.getAllPosts();
    return allPosts.filter((post) => post.IsLiked === true);
  }
  
}

