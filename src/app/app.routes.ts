import { Route } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';

export const App_Route: Route[] = [
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('../app/features/authentication/login/login.component').then((m) => m.LoginComponent),
      },
      { path: '', component: ContentLayoutComponent, children: content },
    ]
