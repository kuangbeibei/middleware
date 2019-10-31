/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:58 
 * @Last Modified: 2019-10-31 15:42:58 
 */ 
import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			"& > * + *": {
				marginLeft: theme.spacing(2)
			}
		}
	})
);

export default function CircularIndeterminate() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}
