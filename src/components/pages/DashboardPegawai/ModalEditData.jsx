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

const ModalEditData = ({ isOpen, onClose, dataDetail }) => {
	const { register, handleSubmit, reset, setValue } = useForm();

	const { trigger, setTrigger } = useTrigger((state) => state);

	const onSubmit = (data) => {
		axiosInstance
			.post("http://corenet.usadi.co.id/BaseAPI/Pegawai", data)
			.then((res) => {
				console.log(res);
				Swal.fire({
					title: "Success Edit Data!",
					text: "",
					icon: "success",
				});
				setTrigger(!trigger);
				reset();
				onClose();
			});
	};

	useEffect(() => {
		if (dataDetail) {
			setValue("id", dataDetail?.id);
			setValue("nama", dataDetail?.nama);
			setValue("nip", dataDetail?.nip);
			setValue("jabatan", dataDetail?.jabatan);
		}
	}, [dataDetail]);

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

export default ModalEditData;
