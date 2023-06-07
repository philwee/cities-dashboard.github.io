// disable eslint for this file
/* eslint-disable */

import { Link } from 'react-router-dom';
import citiesLogo from '../../cities-logo.png';

export function CITIESlogoLinkToHome() {
    return (
        <Link
            to="/"
            onClick={() => {
                window.gtag("event", "cities_logo_click");
            }}>
            <img style={{
                height: "100%", width: "auto", borderRadius: "0.5rem"
            }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
        </Link>
    );
}
