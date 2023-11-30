import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import isEmpty from "../../util/isEmpty";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { GetProfiles } from '../../redux/actions/profileActions';
import { DeleteProfile } from "../../redux/actions/profileActions";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};





export default function CustomPaginationActionsTable() {
  const { t, i18n } = useTranslation();
  const dispatch  = useDispatch()
  const profiles = useSelector(state => state.profiles.profiles.profiles)
  const totalItems = useSelector(state => state.profiles.profiles.totalItems)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  React.useEffect(()=>{async function fetchData(){
    await dispatch(GetProfiles(page,rowsPerPage))
  }; fetchData()},[page,rowsPerPage])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalItems) : 0;
console.log(emptyRows)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const DeleteHandler = (id)=>{
    dispatch(DeleteProfile(id))
  }
  return (
    <TableContainer component={Paper}>
      <h1>test</h1>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell scope="col"><h6>{t('name')}</h6></TableCell>
            <TableCell ><h6>{t('prenom')}</h6></TableCell>
            <TableCell ><h6>{t('email')}</h6></TableCell>
            <TableCell ><h6>{t('role')}</h6></TableCell>
            <TableCell ><h6>{t('telephone')}</h6></TableCell>
            <TableCell ><h6>{t('city')}</h6></TableCell>
            <TableCell ><h6>{t('country')}</h6></TableCell>
            <TableCell ><h6>{t('actions')}</h6></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(profiles) ? profiles.map((row) => (
            <><TableRow key={row.user.nom}>
              <TableCell component="th" scope="row">
                {row.user.nom}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.prenom}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.role}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.tel}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.city}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.country}
              </TableCell>
              <TableCell style={{ width: 160 }} >
              <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(row._id)}>Delete</button>
              </TableCell>
            </TableRow></>
          )): (<></>)}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 2, 3, { label: "All", value: -1 }]}
              colSpan={3}
              count={totalItems}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page"
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
