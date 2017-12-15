import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent //Default Home Route
  },
  { path: 'dashboard',
    component: DashboardComponent //Dashboard Route
  },
  { path: 'register',
    component: RegisterComponent //Register Route
  },
  { path: 'login',
    component: LoginComponent //Login Route
  },
  { path: 'profile',
    component: ProfileComponent //Profile Route
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
