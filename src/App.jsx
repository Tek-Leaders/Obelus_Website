import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToHash from './components/common/ScrollToHash';
import Home from './pages/Home';
import Products from './pages/Products';
import RequestDemo from './pages/RequestDemo';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        {/*
          Layout is the parent route, so Header and Footer are mounted once and
          every page renders into its <Outlet />. Adding a page later is a
          single <Route> here plus a component under src/pages.
        */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
