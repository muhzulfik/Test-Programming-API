import { Box, Button, Center, Flex } from "@chakra-ui/react";

export const Pagination = ({
	itemsPerPage,
	totalItems,
	currentPage,
	paginate,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<Box mt={5}>
			<Center>
				<Flex>
					<Button
						onClick={() => paginate(currentPage - 1)}
						colorScheme="gray"
						mr={2}
						isDisabled={currentPage <= 1}>
						Previous
					</Button>

					{pageNumbers.map((number) => (
						<Button
							key={number}
							onClick={() => paginate(number)}
							colorScheme={currentPage === number ? "blue" : "gray"}
							mx={2}>
							{number}
						</Button>
					))}

					<Button
						onClick={() => paginate(currentPage + 1)}
						colorScheme="gray"
						ml={2}
						isDisabled={currentPage >= pageNumbers.length}>
						Next
					</Button>
				</Flex>
			</Center>
		</Box>
	);
};
