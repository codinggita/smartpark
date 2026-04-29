/**
 * Simple Google Analytics 4 integration helper.
 * Assumes GTAG is loaded in index.html or through a script manager.
 */
export const analytics = {
  /**
   * Track a page view
   * @param {string} path - The page path
   */
  pageView: (path) => {
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: path,
      });
    }
  },

  /**
   * Track a custom event
   * @param {string} eventName - Name of the event
   * @param {Object} params - Event parameters
   */
  event: (eventName, params = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  },

  /**
   * Track user login
   * @param {string} method - Login method (e.g. 'google', 'email')
   */
  login: (method) => {
    if (window.gtag) {
      window.gtag('event', 'login', { method });
    }
  },

  /**
   * Track booking conversion
   * @param {number} value - Transaction value
   * @param {string} transactionId - Unique ID for the booking
   */
  purchase: (value, transactionId) => {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'INR',
        items: [{ item_name: 'Parking Spot' }]
      });
    }
  }
};
