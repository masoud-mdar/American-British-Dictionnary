const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  suite("POST request to /api/translate", () => {
    test("with text and locale fields", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:"Mangoes are my favorite fruit.", locale:"american-to-british"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.translation,'Mangoes are my <span class="highlight">favourite</span> fruit.')
        done()
      })
    })
    test("with text and invalid locale field", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:"Mangoes are my favorite fruit.", locale:"american"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error,'Invalid value for locale field')
        done()
      })
    })
    test("with missing text field", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:undefined, locale:"american-to-british"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error,'Required field(s) missing')
        done()
      })
    })
    test("with missing locale field", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:"Mangoes are my favorite fruit.", locale:undefined})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error,'Required field(s) missing')
        done()
      })
    })
    test("with empty text", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:"", locale:"american-to-british"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error,'No text to translate')
        done()
      })
    })
    test("with text that needs no translation", (done) => {
      chai
      .request(server)
      .post("/api/translate")
      .send({text:"I had a bicky then went to the chippy.", locale:"american-to-british"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.translation,'Everything looks good to me!')
        done()
      })
    })
  })
});
