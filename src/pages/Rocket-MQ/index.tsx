import * as React from "react";
import TableAddBtn from "@com/Table-list-add";
import Tablelist from "@com/Table-list";

export default function(props) {
	interface Data {
		name: string;
		code: string;
		population: number;
		size: number;
		density: number;
	}
	function createData(
		name: string,
		code: string,
		population: number,
		size: number
	): Data {
		const density = population / size;
		return { name, code, population, size, density };
	}
	const rows = [
		createData("India", "IN", 1324171354, 3287263),
		createData("China", "CN", 1403500365, 9596961),
		createData("Italy", "IT", 60483973, 301340),
		createData("United States", "US", 327167434, 9833520),
		createData("Canada", "CA", 37602103, 9984670),
		createData("Australia", "AU", 25475400, 7692024),
		createData("Germany", "DE", 83019200, 357578),
		createData("Ireland", "IE", 4857000, 70273),
		createData("Mexico", "MX", 126577691, 1972550),
		createData("Japan", "JP", 126317000, 377973),
		createData("France", "FR", 67022000, 640679),
		createData("United Kingdom", "GB", 67545757, 242495),
		createData("Russia", "RU", 146793744, 17098246),
		createData("Nigeria", "NG", 200962417, 923768),
		createData("Brazil", "BR", 210147125, 8515767)
	];

	interface Column {
		id: "name" | "code" | "population" | "size" | "density" | "operation";
		label: string;
		minWidth?: number;
		align?: "right";
        format?: (value: number) => string;
        render?: any 
	}

	const columns: Column[] = [
		{ id: "name", label: "Name", minWidth: 170 },
		{ id: "code", label: "ISO\u00a0Code", minWidth: 100 },
		{
			id: "population",
			label: "Population",
			minWidth: 170,
			align: "right",
			format: (value: number) => value.toLocaleString()
		},
		{
			id: "size",
			label: "Size\u00a0(km\u00b2)",
			minWidth: 170,
			align: "right",
			format: (value: number) => value.toLocaleString()
		},
		{
			id: "density",
			label: "Density",
			minWidth: 170,
			align: "right",
			format: (value: number) => value.toFixed(2)
        },
        {
            id: "operation",
            label: "操作",
            minWidth: 170,
            align: "right",
            render: (text: any, record: any, index: any) => {
                console.log('text ,', text);
                console.log('record ,', record);
                console.log('index ,', index);
                return <span>123</span>
            }
        }
	];

	return (
		<>
			<TableAddBtn />
			<Tablelist rows={rows} columns={columns} />
		</>
	);
}
