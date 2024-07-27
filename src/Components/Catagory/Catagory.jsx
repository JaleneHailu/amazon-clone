// Catagory.js
import React from 'react';
import classes from '../../assets/catagoryCard.module.css'
import { catagoryInfos } from './catagoryFullInfos';
import CatagoryCard from './CatagoryCard';

const Category = () => {
  return (
    <section className={classes.catagory_container}>
      {catagoryInfos.map((infos) => {
        return <CatagoryCard key={infos.name} data={infos} />;
      })}
    </section>
  );
};

export default Category;
