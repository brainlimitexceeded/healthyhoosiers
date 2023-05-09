import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Messenger from "./components/Messenger"
import { AuthContextProvider } from "./components/Messenger/context/AuthContext";
import { ChatContextProvider } from "./components/Messenger/context/ChatContext";
import Customerhomepage from "./components/CustomerHomepage";
import Staffhomepage from "./components/StaffHomePage";
import Adminhomepage from "./components/AdminHomepage";
import CustomerDashboard from "./components/Dashboard/CustomerDashboard/customerDashboard";
import CustomerCreate from "./components/ContentCRUD/contentCreates";
import Login from "./components/Login";
// import Upload from "./components/Upload";
import React, { Fragment } from 'react';
import Content from "./components/Content";
import SubcontentCreate from "./components/SubcontentCRUD";
import AllContents from "./components/AllContents";
import UpdateContent from "./components/ContentUpdate";
import ResetPassword from "./components/ResetPassword";
import Preferences from "./components/Preferences";
import About from "./components/About/AboutUs";
import { Container } from "@mui/system";
import { Footer } from "antd/es/layout/layout";


function App() {
	const user = localStorage.getItem("token");

	return (
		
		<AuthContextProvider>
        <ChatContextProvider>
		
		<Routes>
		<Route path="/signup" exact element={<Signup />} />
		<Route path="/login" exact element={<Login />} />
		<Route path="/" element={<Navigate replace to="/login" />} />
			{user && <Route path="/customerhomepage/*" exact element={<Customerhomepage />} />}
			{user && <Route path="/staffhomepage" exact element={<Staffhomepage />} />}
			{user && <Route path="/adminhomepage" exact element={<Adminhomepage />} />}
			{user && <Route path="/messenger/*" exact element={<Messenger />} />}
			{user && <Route path="/customerhomepage/:userName" exact element={<Customerhomepage />} />}
			{user && <Route path="/staffhomepage/:userName" exact element={<Staffhomepage />} />}
			{user && <Route path="/adminhomepage/:userName" exact element={<Adminhomepage />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{user && <Route path="/content/:contentName"  exact element={<Content />} />}
			{user && <Route path="/customerdashboard/:userName"  exact element={<CustomerDashboard />} />}
			{user && <Route path="/createContent/:userName"  exact element={<CustomerCreate />} />}
			{user && <Route path="/createSubcontent/:userName"  exact element={<SubcontentCreate />} />}
			{user && <Route path="/allContents/:userType/:userName"   exact element={<AllContents />} />}
			{user && <Route path="/content/:userType/:contentName"   exact element={<Content />} />}
			{user && <Route path="/updateContent/:userType/:userName/:contentName"   exact element={<UpdateContent />} />}
			{user && <Route path="/resetPassword/:firstName/:lastName/:userName/:userType"   exact element={<ResetPassword />} />}
			{user && <Route path="/preferences/:userName"   exact element={<Preferences/>} />}
		</Routes>
		

		<Footer>
			<About/>
		</Footer>

		</ChatContextProvider>
		</AuthContextProvider>
	);
}
export default App;