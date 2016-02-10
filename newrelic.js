/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   * [NOTE: PULLED FROM ENV]
   */
  app_name: [],
  /**
   * Your New Relic license key.
   * [NOTE: PULLED FROM ENV]
   */
  license_key: '',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  },
  capture_params: true
};
