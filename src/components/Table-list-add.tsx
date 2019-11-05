/*
 * @Author: kuangdan
 * @Date: 2019-10-31 15:43:02
 * @Last Modified: 2019-10-31 15:43:02
 */

import * as React from "react";
import { connect } from "react-redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			margin: theme.spacing(1)
		},
		input: {
			display: "none"
		}
	})
);

function TableAddBtn(props) {
	const classes = useStyles();
	const { ADD_RMQ } = props;

	return (
		<Button
			variant="contained"
			color="primary"
			className={classes.button}
			style={{ marginLeft: 0 }}
			onClick={ADD_RMQ}
		>
			添加
		</Button>
	);
}

export default connect(
	state => ({}),
	dispatch => ({
		ADD_RMQ: setTableModalVisibility(dispatch)
	})
)(TableAddBtn);
