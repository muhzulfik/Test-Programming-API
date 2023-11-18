import {
	Box,
	Container,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Button,
} from "@chakra-ui/react";
import { PasswordField } from "../../molecules/PasswordField";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

const LoginPage = () => {
	const { register, handleSubmit, reset } = useForm();

	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log(data);
		axiosInstance(
			`http://corenet.usadi.co.id/BaseAPI/User?user=${data.user}&password=${data.password}`
		)
			.then((res) => {
				console.log(res);
				Cookies.set("authToken", true);
				reset();
				navigate("/dashboard-pegawai");
			})
			.catch((err) => console.log(err));
	};
	return (
		<Container
			maxW="lg"
			py={{
				base: "12",
				md: "24",
			}}
			px={{
				base: "0",
				sm: "8",
			}}>
			<Stack spacing="8">
				<Stack spacing="6">
					<Stack
						spacing={{
							base: "2",
							md: "3",
						}}
						textAlign="center">
						<Heading
							size={{
								base: "xs",
								md: "lg",
							}}>
							Log in to your account
						</Heading>
					</Stack>
				</Stack>
				<Box
					py={{
						base: "0",
						sm: "8",
					}}
					px={{
						base: "4",
						sm: "10",
					}}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing="6">
							<Stack spacing="5">
								<FormControl>
									<FormLabel htmlFor="user">User</FormLabel>
									<Input id="user" type="text" {...register("user")} />
								</FormControl>
								<PasswordField {...register("password")} />
							</Stack>
						</Stack>
						<Stack mt={6}>
							<Button type="submit">Sign in</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Container>
	);
};

export default LoginPage;
