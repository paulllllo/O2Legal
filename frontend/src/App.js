import { lazy, Suspense, useState } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { MyContext } from './utils/myContext';


import './App.css';
// import Protected from './HOFs/Protected';
// import Home from './routes/Home/Home';
// const Protected = lazy(() => import('./HOFs/Protected'));
// const SinglePost = lazy(() => import('./routes/SinglePost/SinglePost'));
// const Login = lazy(() => import('./routes/login/Login'));
const Home = lazy(() => import('./routes/Home/Home'));
const Contact = lazy(() => import('./routes/Contact/Contact'));
const Admin = lazy(() => import('./routes/Admin/Admin'));
// const Customize = lazy(() => import('./routes/Customize/Customize'));
// const Cart = lazy(() => import('./routes/Cart/Cart'));
// const Edit = lazy(() => import('./routes/Cart/Edit/Edit'));
// const Checkout = lazy(() => import('./routes/Checkout/Checkout'));


function App() {
	const [user, setUser] = useState(null);
	// const [theme, setTheme] = useState("dark");

	// const setUserHandler = (userData) => {
	// 	console.log('setUser Clicked!');
	// 	setUser(userData);
	// }

	return (
		<div>
			{/* <MyContext.Provider value={{ theme, setTheme }}> */}
			<Suspense fallback={<div className="container">Loading...</div>}>
				<Routes>
					{/* <Route element={<Protected user={user} />}> */}
					<Route path='/' element={<Home />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/admin' element={<Admin />} />
					{/* <Route path='/customize/:id' element={<Customize />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/cart/edit' element={<Edit />} />
					<Route path='/checkout' element={<Checkout />} /> */}
					{/* <Route path='/post/:id' element={<SinglePost user={user} />} /> */}
					{/* </Route> */}
					{/* <Route path='/login' element={<Login setUser={(userInfo) => setUserHandler(userInfo)} user={user} />} /> */}
				</Routes>
			</Suspense>
			{/* </MyContext.Provider> */}
		</div>
	);
}

export default App;
