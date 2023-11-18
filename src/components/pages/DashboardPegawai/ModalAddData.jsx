import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Input,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTrigger } from "../../store";
import axiosInstance from "../../../utils/axios";
import Swal from "sweetalert2";

const ModalAddData = ({ isOpen, onClose }) => {
	const { register, handleSubmit, reset } = useForm();
	const { trigger, setTrigger } = useTrigger((state) => state);

	const onSubmit = (data) => {
		console.log("data post", data);
		axiosInstance
			.post("http://corenet.usadi.co.id/BaseAPI/Pegawai", data)
			.then((res) => {
				console.log(res);
				Swal.fire({
					title: "Success Add Data!",
					text: "",
					icon: "success",
				});
				reset();
				setTrigger(!trigger);
				onClose();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		reset();
	}, [onClose]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Add Data</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl>
								<FormLabel>Nama</FormLabel>
								<Input type="text" {...register("nama")} />
							</FormControl>
							<FormControl my={4}>
								<FormLabel>NIP</FormLabel>
								<Input type="text" {...register("nip")} />
							</FormControl>
							<FormControl>
								<FormLabel>Jabatan</FormLabel>
								<Input type="text" {...register("jabatan")} />
							</FormControl>
							<Box my={4}>
								<Button variant="solid" type="submit" mr={3} colorScheme="blue">
									Submit
								</Button>
								<Button type="button" colorScheme="red" onClick={onClose}>
									Close
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalAddData;
