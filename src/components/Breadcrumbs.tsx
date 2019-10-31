/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:39 
 * @Last Modified: 2019-10-31 15:42:39 
 */ 
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(theme => ({
	root: {
		justifyContent: "center",
		flexWrap: "wrap"
	},
	paper: {
		padding: theme.spacing(1, 2)
	}
}));

export default function CustomSeparator() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper elevation={0} className={classes.paper}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
				>
					<Link color="inherit" href="/">
						Material-UI
					</Link>
					<Link color="inherit" href="/getting-started/installation/">
						Core
					</Link>
					<Typography color="textPrimary">Breadcrumb</Typography>
				</Breadcrumbs>
			</Paper>
		</div>
	);
}
