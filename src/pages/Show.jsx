import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Show = ({ cheeses, updateCheese, deleteCheese }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const cheese = cheeses.find(c => c._id === id);

  const [editForm, setEditForm] = useState(cheese);

  const handleChange = event => {
    // console.table(editForm);
    // console.log("event.target.name", event.target.name);
    // console.log("event.target.value", event.target.value);

    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    updateCheese(editForm, id);
    navigate("/");
  };

  const removeCheese = () => {
    deleteCheese(cheese._id);
    navigate("/");
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editForm.name}
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.image}
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.countryOfOrigin}
        name="countryOfOrigin"
        placeholder="Country of origin"
        onChange={handleChange}
      />
      <input type="submit" value="Update cheese" />
    </form>
  )

    return (
      <div className="cheese">
        <h1>{cheese.name}</h1>
        <h3>Country of origin: {cheese.countryOfOrigin}</h3>
        <img src={cheese.image} alt={cheese.name} width={200} />
        <button id="delete" onClick={removeCheese}>
          DELETE
        </button>
        {form}
      </div>
    )

  
}


export default Show;
