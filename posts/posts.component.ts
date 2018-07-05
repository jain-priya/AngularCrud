import {  Http } from '@angular/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url = ' https://jsonplaceholder.typicode.com/posts' ;
constructor(private http: Http) {
  http.get(this.url).subscribe(response => {
   this.posts = response.json();
  });

   }

   createPost(input: HTMLInputElement) {
     let post = { title: input.value };

     this.http.post(this.url, JSON.stringify(post)).subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
      console.log(response.json());
     });
}
    updatePost(input) {
       this.http.patch(this.url + '/' + input.id, JSON.stringify({isRead: true})).subscribe(response =>{
        console.log(response.json());
       });
      //  this.http.put(this.url, JSON.stringify(post))
      }

      deletePost(input) {
        this.http.delete(this.url + '/' + input.id).subscribe(response => {
          let index = this.posts.indexOf(input);
          this.posts.splice(index, 1);

        })
      }
}
