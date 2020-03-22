import React from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import { useQuery } from "react-query";

function CountriesList() {
  const { status, data, error } = useQuery("countries", () => {
    async function run(url) {
      let res = await fetch(url);
      return await res.json();
    }
    return run(
      "https://localhost:5001/countries?_sort=total_confirmed&_order=desc"
    );
  });

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <TableContainer component={Paper}>
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
              {data.map(country => (
                <TableRow key={country.id}>
                  <TableCell component="th" scope="row">
                    {country.name}
                  </TableCell>
                  <TableCell align="right">{country.total_confirmed}</TableCell>
                  <TableCell align="right">{country.total_death}</TableCell>
                  <TableCell align="right">{country.total_recovered}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CountriesList;
