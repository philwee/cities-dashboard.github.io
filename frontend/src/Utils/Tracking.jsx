// disable eslint for this file
/* eslint-disable */

export const Events = {
    internalNavigation: "internal_navigation",
    themeChange: "theme_change",
    getDataset: "get_dataset",
    expandSampleData: "expand_sample_data",
    collapseSampleData: "collapse_sample_data"
}

export const sendEventAnalytics = (eventName, options) => {
    if (window.location.hostname == "citiesdashboard.com") window.gtag("event", eventName, options);
};