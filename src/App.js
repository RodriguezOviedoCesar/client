import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import Inicio from './views/inicio/Inico';
import SupplierView from './views/Suppliers/SuppliersView';
import SupplierDeta from './views/Suppliers/SupplierDetailsView';
import SupplierAdd from './views/Suppliers/SupplierAddViews';
import AddUsers from './views/users/UsersAdd';
import AuthRouter from './components/Auth/authRouter';
import VendedorView from './views/VendedorView';
import SuppliersEdit from './views/Suppliers/SuppliersEditVIew';
import UserView from './views/users/UserView';
import ProductView from './views/Products/ProductView';
import LogView from './views/Log/LogView';
import BrandsView from './views/Brans/BrandsView';
import CategoryView from './views/Category/CategoryView';
import AddCategory from './components/Category/categoryAdd';
import EditCategoryView from './views/Category/CategoryEdit';
import BrandsAddView from './views/Brans/BrandAdd';
import BrandsEditView from './views/Brans/BrandEdit';
import AddProductView from './views/Products/AddProducts';
import EditProductsView from './views/Products/EditProducts';
import OrdelListCreate from './views/vendedor/OrderList';
import OrderView from './views/orders/orderview';

function App() {

return (
  <Router>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route element={<AuthRouter/>}>
      <Route path="/inicio" element={<Inicio />} />
      </Route>
      <Route path='/vendedor' element={<VendedorView/>} />
      <Route path='/vendedor/order/:codigo' element={<OrdelListCreate/>}/>
      <Route path='/vendedor/add/:codigo' element={<OrderView />} />
      <Route path='/suppliers' element={<SupplierView />} />
      <Route path='/suppliers/:id' element={<SupplierDeta />} />
      <Route path='/suppliers/edit/:id' element={<SuppliersEdit />} />
      <Route path='/suppliers/add' element={<SupplierAdd />} />
      <Route path='/user' element={<UserView />} />
      <Route path='/user/create' element={<AddUsers/>}/>
      <Route path='/products' element={<ProductView/>} />
      <Route path='/products/add' element={<AddProductView/>} />
      <Route path='/products/edit/:id' element={<EditProductsView/>} />
      <Route path='/control' element={<LogView/>} />
      <Route path='/brands' element={<BrandsView/>} />
      <Route path='/brands/add' element={<BrandsAddView/>} />
      <Route path='/brands/edit/:id' element={<BrandsEditView/>} />
      <Route path='/category' element={<CategoryView/>} />
      <Route path='/category/add' element={<AddCategory/>} />
      <Route path='/category/edit/:id' element={<EditCategoryView/>} />
    </Routes>
  </Router>
);
};

export default App;

