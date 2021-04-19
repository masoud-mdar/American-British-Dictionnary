'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log(req.body)
      let text = req.body.text
      let locale = req.body.locale

      if (text === "") {
        res.json({error: "No text to translate"})
      } else if (!locale || !text) {
        res.json({error: "Required field(s) missing"})
      } else if (locale !== "american-to-british" && locale !== "british-to-american") {
        res.json({error: "Invalid value for locale field"})
      } else {
        // ok for translation!
        let answer = translator.translate(text, locale)
        //console.log(answer)
        res.json(answer)
      }

      
    });
};
