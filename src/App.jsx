import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Upcoming from "./pages/upcoming";
import ErrorPage from "./pages/ErrorPage";
import InterviewPrep from "./pages/interview/InterviewPrep";
import Cheatsheet from "./pages/cheatsheet/Cheatsheet";
import MachineCoding from "./pages/interview/machineCoding";
import ChallengeDetail from "./pages/interview/ChallengeDetail";
import { useAPI } from "./context/apiContext";
import Chat from "./components/chatbot/Chat";
import Product from "./pages/products/product";
import Playground from "./pages/playground/Playground";
import Community from './pages/community/Community'
import MainNavbar from "./components/MainNavbar";
import DSProblem from "./pages/dsproblem/DSProblem";
import AnimatedCursor from "react-animated-cursor";
import Terms from "./pages/terms/Terms";
import Faqs from "./pages/FAQS/Faqs";

import Quiz from "./pages/quizzes/Quiz";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Signup from "./pages/Auth/Signup";

const App = () => {
	const { dark } = useAPI();

	const [display, setDisplay] = useState(false);

	return (
		<>
			<AnimatedCursor
				innerSize={8}
				outerSize={35}
				innerScale={1}
				outerScale={2}
				outerAlpha={0}
				trailingSpeed={1}
				hasBlendMode={true}
				innerStyle={{
					backgroundColor: "var(--cursor-color)",
				}}
				outerStyle={{
					border: "3px solid var(--cursor-color)",
				}}
			/>
			<div
				className={`${
					dark ? "bg-[#0F111D] text-white" : ""
				} relative  min-h-screen scroll-smooth`}
				style={{
					height: "100vh",
					overflowY: "scroll",
					scrollbarWidth: "thin", // For Firefox
					scrollbarColor: "rgba(178, 121, 216, 0.959) #2d1950",
				}}
			>
				<Routes>


          <Route path="/login" element={<Login/>} />
		  <Route path="/signup" element={<Signup/>} />

					<Route path="/" element={<Homepage />} />
					<Route path="/upcoming" element={<Upcoming />} />

					<Route path="/playground" element={<Playground />} />
					<Route path="/faqs" element={<Faqs />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/community" element={<Community />} />


					{/* page not found */}
					<Route path="*" element={<ErrorPage />} />

					{/* Protected routes */}
					<Route element={<ProtectedRoute />}>
						<Route path="/cheats" element={<Cheatsheet />} />
						<Route path="/interview" element={<InterviewPrep />} />
						<Route path="/machinecoding" element={<MachineCoding />} />
						<Route path="/dsproblem" element={<DSProblem />} />
						<Route path="/Quizzes" element={<Quiz />} />
						<Route path="/challenge/:id" element={<ChallengeDetail />} />
						<Route path="/product" element={<Product />} />
						{/* <Route path="/dashboard" element={<Dashboard />} /> */}
					</Route>
				</Routes>
			</div>

			<Chat />
		</>
	);
};

export default App;
