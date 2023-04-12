import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

import "./Place.css";


const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Place not found!</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input 
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter a valid title."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input 
        id="description"
        element="textarea"
        label="Description"
        errorText="Please enter a valid description (atleast 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>UPDATE PLACE</Button>
    </form>
  );
};

export default UpdatePlace;
