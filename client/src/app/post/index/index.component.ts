import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { PostdataService } from '../postdata.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  posts:Post[] = [];
  constructor(private postService:PostService , private postDataService:PostdataService) { }

  ngOnInit():void{
    this.postService.getAll().subscribe(
      (data)=>{
        this.postDataService.setPostData(data);
        this.posts = this.postDataService.getAllPosts();
      }
    );
    
    console.log(this.postDataService.getAllPosts());
    
  }

  deletePost(id:number):void{
    this.postService.delete(id).subscribe((data)=>{
      this.posts = this.posts.filter((post)=>post.id !== id);
      alert('Post deleted successfully')
    })
  }

  updateLikeStatus(id: number , currPost: Post): void {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      const updatedPost = { ...currPost, IsLiked: !currPost.IsLiked };
      this.postService.UpdateLike(id, updatedPost).subscribe(() => {
        this.posts[index] = updatedPost;
      });
    }
  }
  
  
  

  isLiked(currpost: Post): boolean {
    return currpost.IsLiked===true;
  }

}
