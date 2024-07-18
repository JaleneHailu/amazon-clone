// Catagory.js
import React from 'react';
import classes from '../../../assets/catagoryCard.module.css';
import { catagoryInfos } from './catagoryFullInfos';
import CatagoryCard from './CatagoryCard';

const Catagory = () => {
  return (
    <section className={classes.catagory_container}>
      {catagoryInfos.map((infos) => {
        console.log(infos); // Log each info object to check the data
        return <CatagoryCard key={infos.name} data={infos} />;
      })}
    </section>
  );
};

export default Catagory;
