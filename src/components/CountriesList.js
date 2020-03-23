import React from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

import { usePaginatedQuery } from "react-query";

function CountriesList() {
  const [page, setPage] = React.useState(0);

  const { status, resolvedData, error } = usePaginatedQuery(
    ["countries", page],
    (key, page) => {
      async function run(url) {
        let res = await fetch(url);
        return await res.json();
      }

      return run(
        `https://pandemic-api.azurewebsites.net/v1/countries?_limit=15&_page=${page +
          1}`
      );
    }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Paper>
          <TableContainer>
            <Table aria-label="countries">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Confirmed</TableCell>
                  <TableCell align="right">Deaths</TableCell>
                  <TableCell align="right">Recovered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resolvedData.map(country => (
                  <TableRow key={country.id}>
                    <TableCell component="th" scope="row">
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      {country.confirmed.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {country.deaths.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {country.recovered.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15]}
            component="div"
            count={250}
            rowsPerPage={15}
            page={page}
            onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

export default CountriesList;
