import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostdataService {

   private allPosts:Post[];
   likedPosts:Post[] = [];

   constructor(private postService:PostService) { 
   }

  public LikedPost():void{
    this.likedPosts = this.allPosts.filter((post)=>post.IsLiked===true);
  }

  getAllPosts(): Post[] {
    return this.allPosts;
  }

  getLikedPosts(): Post[] {
    return this.likedPosts;
  }

  setPostData(allPost: Post[]): void{
    this.allPosts = allPost;
  }


}
