import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CategoryComponent } from './pages/category/category.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  // { path: '', redirectTo: '/posts', pathMatch: 'full' } // optional: redirects to 'posts' by default
  { path:"", component: SignInComponent},

  { path:"sign-up", component: SignUpComponent},

  { path:"home", component: HomePageComponent},

  { path:"posts", component: PostsComponent},

  { path:"category", component: CategoryComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
