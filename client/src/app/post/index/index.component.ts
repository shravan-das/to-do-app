import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  posts:Post[] = [];
  constructor(private postService:PostService) { }

  ngOnInit():void{
    this.postService.getAll().subscribe((data:Post[])=>{
      this.posts = data;
      console.log('Posts');
      console.log(this.posts);
    })
  }

  deletePost(id:number):void{
    this.postService.delete(id).subscribe((data)=>{
      this.posts = this.posts.filter((post)=>post.id !== id);
      alert('Post deleted successfully')
    })
  }

}
