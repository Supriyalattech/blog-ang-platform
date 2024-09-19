import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostService,private categoryService:CategoryService) { }

  @ViewChild('createModal') createModalElement!: ElementRef;
  createModal!: Modal;
  
  posts:any[] = [];
  categories:any[] = [];
  userId:any = '';


  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((response:any) => {
      if(response.message == 'success'){
        this.categories = response.data;
      }
    });

    this.userId = localStorage.userId;
    this.fetchPosts();
  
  }

  fetchPosts(){
    this.postService.getPostsByUserId(this.userId).subscribe((data:any) => {
      if(data.message == 'success'){
        this.posts = data.data
      }
    })
  }

  title:any = '';
  status:String = '';
  content:any = '';
  category_id:any = '';

  onCategoryChange(event: any) {
    this.category_id = event.target.value;
  }

  isFormSubmitted:boolean = false;
  submitForm(data:any){
    this.isFormSubmitted = true;
    data.user_id = this.userId;
    if(this.editPostId){
      this.postService.updatePost(data,this.editPostId).subscribe((response:any) => {
        this.isFormSubmitted = false;
        if(response.message == 'success'){
          this.title = '';
          this.content = '';
          this.status = '';
          this.category_id = '';
          this.editPostId = '';
          this.createModal.hide();
  
          Swal.fire({
            icon: "success",
            text: "Post updated successfully!",
            showConfirmButton: true,
            timer:1500
          });
  
          setTimeout(() => {
            location.reload();
          }, 1000);
  
        }
      })
    }else{
      this.postService.insertPost(data).subscribe((response:any) => {
        this.isFormSubmitted = false;
        if(response.message == 'success'){
          this.title = '';
          this.content = '';
          this.status = '';
          this.category_id = '';
          this.editPostId = '';
          this.createModal.hide();
  
          Swal.fire({
            icon: "success",
            text: "Post Created successfully!",
            showConfirmButton: true,
            timer:1500
          });
  
          setTimeout(() => {
            location.reload();
          }, 1000);
  
        }
      })
    }
 
  }

  openModal() {
    this.createModal = new Modal(this.createModalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
    this.createModal.show();
  }

  editPostId:any ='';
  editPost(data:any){
    this.editPostId = data.id;
    this.title = data.title;
    this.content = data.content;
    this.status = data.status;
    this.category_id = data.category_id;
    this.openModal();
  }

  closeModal() {
    this.title = '';
    this.content = '';
    this.status = '';
    this.category_id = '';
    this.editPostId = '';
    this.createModal.hide();
  }

  deletePost(id:any){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id).subscribe((response:any) => {
          if(response.message === 'success'){
            Swal.fire({
              title: "Deleted!",
              text: "Your Post has been deleted.",
              icon: "success"
            });
            setTimeout(() => {
            location.reload();
            }, 1000);
          }else{
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              showConfirmButton: true,
            });
          }
        
        })
      }
    });

  }

}
