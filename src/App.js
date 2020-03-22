import React from "react";
import "./App.css";

import { useQuery } from "react-query";

function App() {
  const { status, data, error, isFetching } = useQuery("countries", () => {
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
        <div>
          {data.map(country => (
            <p key={country.id}>
              {country.name}: {country.totalConfirmed} : {country.totalDeath} :{" "}
              {country.totalRecovered}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
