// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDetail } from '../../redux/actions/actions';
// import styles from './Detail.module.css';

// const Detail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const country = useSelector(state => state.detail);

//   useEffect(() => {
//     dispatch(getDetail(id))
//   }, [dispatch, id]);

//   return (
//     <>
//       <h1 className={styles.h1_titel}>Country Detail</h1>
//       <div className={styles.card_div}>
//         <div className={styles.card}>
//           <img className={styles.card_image} src={country.flagImage} alt={`Bandera de ${country.name}`} />
//           <div className={styles.card_content}>
//             <h2 className={styles.detail_title}>{country.name}</h2>
//             <p className={styles.detail_text}>
//               <strong>ID:</strong> <span className={styles.detail_info}></span> {country.id}
//             </p>
//             <p className={styles.detail_text}>
//               <strong>Capital:</strong> <span className={styles.detail_info}></span>{country.capital}
//             </p>
//             <p className={styles.detail_text}>
//               <strong>Continente:</strong> <span className={styles.detail_info}></span>{country.continent}
//             </p>
//             <p className={styles.detail_text}>
//               <strong>Sub-Region:</strong> <span className={styles.detail_info}></span>{country.subregion}
//             </p>
//             <p className={styles.detail_text}>
//               <strong>Area:</strong> <span className={styles.detail_info}></span>{country.area?.toLocaleString()} km²
//             </p>
//             <p className={styles.detail_text}>
//               <strong>Población:</strong> <span className={styles.detail_info}></span>{country.population?.toLocaleString()}
//             </p>
            
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Detail;
import {React, useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/actions";

import s from "./Detail.module.css"

export default function Detail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id
    const countryDetails = useSelector((state) => state.detail)
    // const history = useHistory()
    console.log(countryDetails.selectedActivity);
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    return (
        
        <div className={s.prindiv}>
            <div className={s.cardd}>

                <div className={s.conpais} >
                <h2 className={s.titulod}>Country</h2>
                {countryDetails? (
            
                <div >
                    <img className={s.banderad} src={countryDetails.flagImage} alt="Imagen no disponible" />
                    <h2 className={s.nombred}>{countryDetails.name}</h2>
                    <h4 className={s.continented}>{countryDetails.continent}</h4>
                    <h4 className={s.codigo}>{countryDetails.id}</h4>
                    <h4 className={s.detalle}>Capital: {countryDetails.capital}</h4>
                    <h4 className={s.detalle}>Región: {countryDetails.subregion}</h4>
                    <h4 className={s.detalle}>Área: {countryDetails.area} km²</h4>
                    <h4 className={s.detalle}>Population: {countryDetails.population} Hab.</h4>
                </div> 
                ) : (
                    <p>Loading...</p> 
                    )}
                </div>
                
            <div className={s.conact}>
            <h3 className={s.titulod}>Country Activities</h3>
            {   
                countryDetails.selectedActivity&&countryDetails.selectedActivity.length? 
                countryDetails.selectedActivity.map(e => {
                return (
                        <div key={e.id}>
                            <h4 className={s.nombreact}>{e.name}</h4>
                            <br />
                            <p className={s.detalle}>Difficulty: {e.difficulty}</p>
                            <br />
                            <p className={s.detalle}>Duration: {e.duration} horas</p>
                            <br />
                            <p className={s.detalle}>Sesion: {e.season}</p>
                        </div>
                        
                    ) 
                 }) 
                 : <p>No activities yet</p> 
            }             
            </div>
            </div>
        </div>
    )
};
