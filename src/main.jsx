import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './notes.css';
import App from './App.jsx';
import NotesHub from './components/notes/NotesHub.jsx';
import LanguagePage from './components/notes/LanguagePage.jsx';
import NotePage from './components/notes/NotePage.jsx';
import Research from './components/notes/Research.jsx';

const router = createBrowserRouter([
    { path: '/', element: <App />, },
    { path: '/notes', element: <NotesHub />,}, 
    { path: '/notes/:language', element: <LanguagePage />, },
    { path: '/notes/:language/:slug', element: <NotePage />, },
    { path: '/research/:slug', element: <Research /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);