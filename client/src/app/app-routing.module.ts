import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent //Default Home Route
  },
  { path: 'dashboard',
    component: DashboardComponent, //Dashboard Route
    canActivate: [AuthGuard]
  },
  { path: 'register',
    component: RegisterComponent, //Register Route
    canActivate: [NotAuthGuard]
  },
  { path: 'login',
    component: LoginComponent, //Login Route
    canActivate: [NotAuthGuard]
  },
  { path: 'profile',
    component: ProfileComponent, //Profile Route
    canActivate: [AuthGuard]
  },
  { path: 'blog',
    component: BlogComponent, //BLog Route
    canActivate: [AuthGuard]
  },
  { path: 'edit-blog/:id',
    component: EditBlogComponent,
    canActivate: [AuthGuard]
  },
  { path: 'delete-blog/:id',
    component: DeleteBlogComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user/:username',
    component: PublicProfileComponent, 
    canActivate: [AuthGuard]
  },
  { path: '**', component: HomeComponent } //must be last or will conflict with routes
                                           //any other path after localhost:4200/ will be redirected to home
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes) // ,{ enableTracing: true } // <-- debugging purposes only)
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
