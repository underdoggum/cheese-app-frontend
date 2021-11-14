import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";


const Main = props => {

  const [cheeses, setCheeses] = useState(null);

  const URL = "https://nn-cheese-app.herokuapp.com/cheese/";

  const getCheeses = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheeses(data);
  };

  const createCheese = async cheese => {
    // make post request to create a cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update the list of cheeses
    getCheeses();
  };

  const updateCheese = async (cheese, id) => {
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese)
    });
    getCheeses();
  };

  const deleteCheese = async id => {
    await fetch(URL + id, {
      method: "delete",
    });
    getCheeses();
  }

  useEffect(() => getCheeses(), []);


  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Index cheeses={cheeses} createCheese={createCheese} />} />
        <Route path="/cheese/:id" element={
          <Show
            cheeses={cheeses}
            updateCheese={updateCheese}
            deleteCheese={deleteCheese}
          />} />
      </Routes>
    </main>
  )
}


export default Main;
