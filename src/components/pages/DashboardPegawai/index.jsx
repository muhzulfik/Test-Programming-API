import {
	Box,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Center,
	HStack,
	Flex,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalAddData from "./ModalAddData";
import ModalEditData from "./ModalEditData";
import { Pagination } from "../../molecules/Pagination";
import { useTrigger } from "../../store";
import axiosInstance from "../../../utils/axios";
import Swal from "sweetalert2";

const DashboardPegawai = () => {
	const { trigger, setTrigger } = useTrigger((state) => state);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onClose: onCloseEdit,
	} = useDisclosure();
	const [data, setData] = useState([]);
	const [dataDetail, setDataDetail] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(4); // Set the number of items to display per page

	const fetchData = () => {
		axiosInstance
			.get("http://corenet.usadi.co.id/BaseAPI/Pegawai")
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			});
	};

	useEffect(() => {
		fetchData();
	}, [trigger]);

	const handleEditData = (id, nama, nip, jabatan) => {
		let dataUpdate = { id: id, nama: nama, nip: nip, jabatan: jabatan };
		setDataDetail(dataUpdate);
		onOpenEdit();
	};

	const handleDelete = (id, nama, nip, jabatan) => {
		axiosInstance
			.delete(`http://corenet.usadi.co.id/BaseAPI/Pegawai`, {
				id: id,
				nama: nama,
				nip: nip,
				jabatan: jabatan,
			})
			.then((res) => {
				console.log("delete", res.data);
				Swal.fire({
					title: "Success Delete Data!",
					text: "",
					icon: "success",
				});
				setTrigger(!trigger);
			});
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	// Calculate the index of the first item on the current page
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// Get the current items to display on the page
	const currentItems = data.rows?.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<Center>
				<Box py={10}>
					<Flex justifyContent="flex-end" mb={5}>
						<Button colorScheme="linkedin" onClick={() => onOpen()}>
							Add Task
						</Button>
					</Flex>
					{data.rows?.length > 0 ? (
						<TableContainer>
							<Table variant="striped" colorScheme="linkedin">
								<Thead>
									<Tr>
										{data.columns?.map((val) => (
											<Th
												key={val.name}
												w={`${val.width}%`}
												textAlign={"center"}>
												{val.caption}
											</Th>
										))}
										<Th textAlign={"center"}>Action</Th>
									</Tr>
								</Thead>

								<Tbody>
									{currentItems?.map((val) => (
										<Tr key={val.id}>
											<Td>{val.nama}</Td>
											<Td>{val.nip}</Td>
											<Td>{val.jabatan}</Td>
											<Td>
												<HStack>
													<Button
														colorScheme="red"
														onClick={() =>
															handleDelete(
																val.id,
																val.nama,
																val.nip,
																val.jabatan
															)
														}>
														Delete
													</Button>
													<Button
														type="button"
														colorScheme="green"
														onClick={() =>
															handleEditData(
																val.id,
																val.nama,
																val.nip,
																val.jabatan
															)
														}>
														Edit
													</Button>
												</HStack>
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
							<Pagination
								itemsPerPage={itemsPerPage}
								totalItems={data.rows?.length}
								currentPage={currentPage}
								paginate={paginate}
							/>
						</TableContainer>
					) : (
						<Text>Data Not Found</Text>
					)}
				</Box>
			</Center>
			<ModalAddData isOpen={isOpen} onClose={onClose} />
			<ModalEditData
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				dataDetail={dataDetail}
			/>
		</>
	);
};

export default DashboardPegawai;
