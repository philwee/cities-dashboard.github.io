// disable eslint for this file
/* eslint-disable */

import { Link } from 'react-router-dom';
import citiesLogo from '../../cities-logo.png';

import * as Tracking from '../../Utils/Tracking';

export function CITIESlogoLinkToHome() {
    return (
        <Link
            to="/"
            onClick={() => {
                Tracking.sendEventAnalytics(Tracking.Events.internalNavigation,
                    {
                        destination_id: "/",
                        destination_label: "home",
                        origin_id: "cities-logo"
                    })
            }}>
            <img style={{
                height: "100%", width: "auto", borderRadius: "0.5rem"
            }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
        </Link>
    );
}
