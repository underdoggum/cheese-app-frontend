import { useState } from "react"
import { Link } from "react-router-dom";


const Index = ({ cheeses, createCheese }) => {
  // state to hold form data
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  // handleChange function for the form
  const handleChange = event => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    createCheese(newForm);
    setNewForm({
      name: "",
      image: "",
      countryOfOrigin: "",
    });
  };

  // logic for determining if the API data has loaded
  const loaded = () => {
    return (
      cheeses.map(singleCheese => (
        <div key={singleCheese._id} className="singleCheese">
          <Link to={`/cheese/${singleCheese._id}`}>
            <h1>{singleCheese.name}</h1>
          </Link>
          <img src={singleCheese.image} alt={singleCheese.name} width={200} />
          <hr />
          <h3>Country of origin: {singleCheese.countryOfOrigin}</h3>
        </div>
      ))
    )
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }


  return (
    <section>
      <form id="createForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country of origin"
          onChange={handleChange}
        />
        <input type="submit" value="Create cheese" />
      </form>
      {cheeses ? loaded() : loading()}
    </section>
  );
}


export default Index;
