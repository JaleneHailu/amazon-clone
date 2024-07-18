// CatagoryCard.js
import React from 'react';
import classes from '../../../assets/catagoryCard.module.css';

const CatagoryCard = ({ data }) => {
  console.log(data); // Log the data prop to ensure it is not undefined

  return (
    <div className={classes.catagory}>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </a>
    </div>
  );
};

export default CatagoryCard;
