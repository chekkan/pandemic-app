import React from "react";
import CountriesList from "./components/CountriesList";
import TotalStats from "./components/TotalStats";

function App() {
  return (
    <>
      <TotalStats />
      <div stlye={{ marginBottom: "1rem" }}>&nbsp;</div>
      <CountriesList />
    </>
  );
}

export default App;
