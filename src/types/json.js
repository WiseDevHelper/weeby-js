const { get } = require("node-superfetch");
const chalk = require("chalk");
const { version } = require("../../package.json");
const word = require("../assets/json/word.json");
const responses = require("../assets/json/response.json");

/**
* @class JSON
*/
class JSON {

  constructor(token, baseURL) {
    /** @access private */
    this.token = token;
    /** @access private */
    this.baseURL = baseURL;
  }

  /**
    * Returns a random word. (list endpoint not supported)
    * @param {string} type - The Type of JSON response to request. See https://weebyapi.xyz/api/docs#section4 for all the JSON endpoints.
    * @returns {Promise<string>} The response in a string.
    */
  async word(type) {
    if (typeof type !== "string") throw new Error(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("The Type parameter is not a string.")}`);
    if (!type) throw new TypeError(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("Type parameter is missing. You will need to provide the type of Word Category.")}`);

    const { body } = await get(`${this.baseURL}/word/${type}`)
      .set("Authorization", `Bearer ${this.token}`)
      .set("User-Agent", `Weeby-JS by NTM Development » v${version}`);

    if (word.includes(type)) {
      return body.word;
    } else {
      throw new TypeError(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("The Word Category you tried to request was not found. Make sure it is spelt correctly.")}`);
    }
  }

  /**
    * Returns a random response.
    * @param {string} type - The Type of JSON response to request. See https://weebyapi.xyz/api/docs#section4 for all the JSON endpoints.
    * @returns {Promise<string>} The response in a string.
    */
  async response(type) {
    if (typeof type !== "string") throw new Error(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("The Type parameter is not a string.")}`);
    if (!type) throw new TypeError(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("Type parameter is missing. You will need to provide the type of Response Category.")}`);

    const { body } = await get(`${this.baseURL}/${type}`)
      .set("Authorization", `Bearer ${this.token}`)
      .set("User-Agent", `Weeby-JS by NTM Development » v${version}`);

    if (responses.includes(type)) {
      return body.response;
    } else {
      throw new TypeError(`${chalk.magenta("Weeby-JS")} ${chalk.gray("»")} ${chalk.yellow("The Response Category you tried to request was not found. Make sure it is spelt correctly.")}`);
    }
  }

}

module.exports = JSON;
