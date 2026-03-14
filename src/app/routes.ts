import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Dossiers from './pages/Dossiers';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';

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
