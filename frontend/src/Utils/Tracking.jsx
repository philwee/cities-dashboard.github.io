export const Events = {
  internalNavigation: 'internal_navigation',
  themeChange: 'theme_change',
  getDataset: 'get_dataset',
  expandSampleData: 'expand_sample_data',
  collapseSampleData: 'collapse_sample_data',
  openContactFormInExternalTab: 'open_contact_form_in_external_tab'
};

export const sendEventAnalytics = (eventName, options) => {
  if (window.location.hostname === 'citiesdashboard.com') window.gtag('event', eventName, options);
};
