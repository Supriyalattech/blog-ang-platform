import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }


  @ViewChild('createModal') createModalElement!: ElementRef;
  createModal!: Modal;
  
  categories:any[] = [];
  editCategoryId:any = '';
  userId:String = '';

  ngOnInit(): void {
    this.userId = localStorage.userId;
    this.categoryService.getAllCategory().subscribe((response:any) => {
      if(response.message == 'success'){
        this.categories = response.data;
      }
    });
  }



  openModal() {
    this.createModal = new Modal(this.createModalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
    this.createModal.show();
  }

  editCategory(data:any){
    this.name = data.name;
    this.description = data.description;
    this.editCategoryId = data.id;
    this.openModal();
  }

  name:any = '';
  description:any = '';
  closeModal() {
    this.name = '';
    this.description = '';
    this.createModal.hide();
  }

  deleteCategory(id:any){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe((response:any) => {
          if(response.message === 'success'){
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
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

  isFormSubmitted:boolean = false;
  submitForm(data:any){
    this.isFormSubmitted = true;
    data.user_id = this.userId;
    if(this.editCategoryId){
      this.categoryService.updateCategory(data,this.editCategoryId).subscribe((response:any) => {
        this.isFormSubmitted = false;
        if(response.message == 'success'){
          this.name = '';
          this.description = '';
          this.editCategoryId = '';
          this.createModal.hide();
  
          Swal.fire({
            icon: "success",
            text: "Category updated successfully!",
            showConfirmButton: true,
            timer:1500
          });
  
          setTimeout(() => {
            location.reload();
          }, 1000);
  
        }
      })
    }else{
      this.categoryService.insertCategory(data).subscribe((response:any) => {
        this.isFormSubmitted = false;
        if(response.message == 'success'){
          this.name = '';
          this.description = '';
          this.editCategoryId = '';
          this.createModal.hide();
  
          Swal.fire({
            icon: "success",
            text: "Category Created successfully!",
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


}
