import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
	root: {
		width: "100%"
	},
	tableWrapper: {
		maxHeight: 440,
		overflow: "auto"
	}
});

interface ITableListProps {
    rows: any[],
    columns: any[]
}

const TableList: React.SFC<ITableListProps> = (props) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const {
        rows,
        columns
    } = props;

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
        <Paper className={classes.root} style={{marginLeft: '1px', marginTop: '10px',width: '98%'}}>
			<div className={classes.tableWrapper}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map(row => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.code}
									>
										{columns.map(column => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.format &&
													typeof value === "number"
														? column.format(value)
                                                        : value}
                                                    {
                                                        column.render ? column.render() : null
                                                    }
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					"aria-label": "previous page"
				}}
				nextIconButtonProps={{
					"aria-label": "next page"
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

export default TableList
