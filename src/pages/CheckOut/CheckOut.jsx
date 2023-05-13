import { useContext } from "react";
import { useLoaderData, } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const { title, _id, price } = service;
  const {user} = useContext(AuthContext)

  const handleBookService = e =>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
      customerName: name,
      email,
      date,
      service: title,
      service_id: _id,
      price,
    }
    console.log(booking);
    fetch('http://localhost:5000/bookings', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId){
        alert("Successfully order placed")
      }
    })
  }
  return (
    <div>
      <h2 className='text-3xl'>Book Now! {title}</h2>
      <form onSubmit={handleBookService}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              name="name"
              placeholder="name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
            defaultValue={user?.email}
              type="text"
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
            disabled
              type="text"
              defaultValue={`$` + price}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
      <div className="card-body"></div>
    </div>
  );
};

export default CheckOut;
