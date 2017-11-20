import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'dashboard',
    component: DashboardComponent,
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
