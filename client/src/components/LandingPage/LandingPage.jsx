import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Footer from '../Footer/Footer';
const LandingPage = () => {
    return (
        <div>
            <div className={styles.landing}>
                <Link to="/home">
                    <button className={styles.button}>Get Started</button>
                </Link>
            </div>
                <Footer />
        </div>

    );
};

export default LandingPage;
