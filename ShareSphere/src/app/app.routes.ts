import { Routes } from '@angular/router';
import { LoginForm } from './components/auth/login-form/login-form';
import { HomePage } from './components/home-page/home-page';
import { Profilo } from './components/profilo/profilo';
import { GruppiList } from './components/gruppi/gruppi-list/gruppi-list';
import { CrowdfundingList } from './components/crowdfunding/crowdfunding-list/crowdfunding-list';
import { CrowdfundingForm } from './components/crowdfunding/crowdfunding-form/crowdfunding-form';
import { CrowdfundingDetail } from './components/crowdfunding/crowdfunding-detail/crowdfunding-detail';
import { AdminLayout } from './components/admin/admin-layout/admin-layout';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { AdminArticoli } from './components/admin/admin-articoli/admin-articoli';
import { AdminChallenge } from './components/admin/admin-challenge/admin-challenge';
import { AdminUtenti } from './components/admin/admin-utenti/admin-utenti';
import { AdminImpostazioni } from './components/admin/admin-impostazioni/admin-impostazioni';

export const routes: Routes = [
  { path: '',                   redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',              component: LoginForm },
  { path: 'home',               component: HomePage },
  { path: 'profilo',            component: Profilo },
  { path: 'profilo/:id',        component: Profilo },
  { path: 'gruppi',             component: GruppiList },
  { path: 'crowdfunding',       component: CrowdfundingList },
  { path: 'crowdfunding/nuova', component: CrowdfundingForm },
  { path: 'crowdfunding/:id',   component: CrowdfundingDetail },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '',               redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',      component: AdminDashboard },
      { path: 'articoli',       component: AdminArticoli },
      { path: 'utenti',         component: AdminUtenti },
      { path: 'challenge',      component: AdminChallenge },
      { path: 'impostazioni',   component: AdminImpostazioni },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
