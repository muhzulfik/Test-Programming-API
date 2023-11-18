import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/organism/Layout";
import LoginPage from "./components/pages/LoginPage";
import DashboardPegawai from "./components/pages/DashboardPegawai";
import withAuth from "./utils/withAuth";

const AuthDashboardPegawai = withAuth(DashboardPegawai);

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<LoginPage />} />
					<Route path="/dashboard-pegawai" element={<AuthDashboardPegawai />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
