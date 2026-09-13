import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import ProdukLayanan from './pages/ProdukLayanan';
import Navbar from './components/ui/Navbar';
import Artikel from './pages/Artikel';
import DetailArtikel from './components/Artikel/DetailArtikel';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';

function NotFound() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center text-4xl font-medium'>Tidak ada halaman.</div>
  )
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); 

  return (
    <div className='wrap-break-word'>
    {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Beranda />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/produklayanan' element={<ProdukLayanan />} />
        <Route path='/artikel' element={<Artikel />} />
        <Route path='/artikel/:id' element={<DetailArtikel />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/dashboard' element={(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}