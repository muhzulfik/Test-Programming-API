"use client";

import {
	Box,
	Flex,
	Button,
	useColorModeValue,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();

	const handleLogout = () => {
		Cookies.remove("authToken");
		navigate("/");
	};
	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={20}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<Box>Logo</Box>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							</Button>
							<Button onClick={handleLogout}>
								<BiLogOut size={25} />
							</Button>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
