import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";


const Main = props => {

  const [cheese, setCheese] = useState(null);

  const URL = "https://nn-cheese-app.herokuapp.com/cheese";

  const getCheeses = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async cheese => {
    // make post request to create a cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update the list of cheeses
    getCheeses();
  };

  useEffect(() => getCheeses(), []);


  return (
    <main>
      <Routes>
        <Route path="/" element={<Index cheese={cheese} createCheese={createCheese} />} />
        <Route path="/cheese/:id" element={<Show />} />
      </Routes>
    </main>
  )
}


export default Main;
