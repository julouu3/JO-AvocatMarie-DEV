import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import Root from './components/Root';

const Home = lazy(() => import('./pages/Home'));
const Profil = lazy(() => import('./pages/Profil'));
const Dossiers = lazy(() => import('./pages/Dossiers'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'profil', Component: Profil },
      { path: 'dossiers', Component: Dossiers },
      { path: 'contact', Component: Contact },
      { path: 'mentions-legales', Component: MentionsLegales },
    ],
  },
]);
