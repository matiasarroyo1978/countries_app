import React from "react";
import GitHub from '../../assets/github.png';
import Linkedin from '../../assets/linkedin.png';
import styles from './Footer.module.css';
const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={`${styles.column} ${styles.left}`}>
                <p className={styles.copyright}>&copy; Copyright 2023</p>
            </div>
            <div className={`${styles.column} ${styles.center}`}>
                <p >Developed by Matias Arroyo</p>
            </div>
            <div className={`${styles.column} ${styles.right}`}>
                <a href="https://github.com/matiasarroyo1978/countries_app" target='_black'>
                <img className={styles.logos_img} src={GitHub} alt="Logo de GitHub" />
                </a>
                <a href="https://linkedin.com/in/matias-arroyo19" target='_black'>
                <img className={styles.logos_img} src={Linkedin} alt="Logo de Linkedin" />
                </a>
            </div>
        </div>

    );
}
export default Footer;