import React from "react";

const BuildingsList = (props) => {
  console.log(props.buildings);
  return (
    <div>
      {props.buildings.map((building, idx) => {
        return (
          <div className="building-box">
            <h1 key={idx}>{building.name}</h1>
          </div>
        );
      })}
    </div>
  )
};

export default BuildingsList;
