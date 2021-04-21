const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()

suite('Unit Tests', () => {
  suite("American to British", () => {
    suite("spelling", () => {
      test("favorite fruit", (done) => {
        let text = "Mangoes are my favorite fruit."
        let translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("yogurt", (done) => {
        let text = "I ate yogurt for breakfast."
        let translation = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })

    })
    suite("simple words", () => {
      test("condo", (done) => {
        let text = "We had a party at my friend's condo."
        let translation = 'We had a party at my friend\'s <span class="highlight">flat</span>.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("trashcan", (done) => {
        let text = "Can you toss this in the trashcan for me?"
        let translation = 'Can you toss this in the <span class="highlight">bin</span> for me?'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
    suite("complex words", () => {
      test("parking lot", (done) => {
        let text = "The parking lot was full."
        let translation = 'The <span class="highlight">car park</span> was full.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("Rube Goldberg machine", (done) => {
        let text = "Like a high tech Rube Goldberg machine."
        let translation = 'Like a high tech <span class="highlight">Heath Robinson device</span>.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("To play hooky", (done) => {
        let text = "To play hooky means to skip class or work."
        let translation = 'To <span class="highlight">bunk off</span> means to skip class or work.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
    suite("title", () => {
      test("Mr.", (done) => {
        let text = "No Mr. Bond, I expect you to die."
        let translation = 'No <span class="highlight">Mr</span> Bond, I expect you to die.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("Dr.", (done) => {
        let text = "Dr. Grosh will see you now."
        let translation = '<span class="highlight">Dr</span> Grosh will see you now.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
    suite("Hour", () => {
      test("12:15", (done) => {
        let text = "Lunch is at 12:15 today."
        let translation = 'Lunch is at <span class="highlight">12.15</span> today.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
  })
  suite("British to American", () => {
    suite("words & spellings", () => {
      test("footie", (done) => {
        let text = "We watched the footie match for a while."
        let translation = 'We watched the <span class="highlight">soccer</span> match for a while.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("Paracetamol", (done) => {
        let text = "Paracetamol takes up to an hour to work."
        let translation = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("caramelise", (done) => {
        let text = "First, caramelise the onions."
        let translation = 'First, <span class="highlight">caramelize</span> the onions.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("bank holiday + funfair", (done) => {
        let text = "I spent the bank holiday at the funfair."
        let translation = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("bicky + chippy", (done) => {
        let text = "I had a bicky then went to the chippy."
        let translation = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("bits and bobs + bum bag", (done) => {
        let text = "I've just got bits and bobs in my bum bag"
        let translation = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("car boot", (done) => {
        let text = "The car boot sale at Boxted Airfield was called off."
        let translation = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
    suite("titles", () => {
      test("Mrs", (done) => {
        let text = "Have you met Mrs Kalyani?"
        let translation = 'Have you met <span class="highlight">Mrs.</span> Kalyani?'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("Prof", (done) => {
        let text = "Prof Joyner of King's College, London."
        let translation = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
    suite("Hour", () => {
      test("4 or 4.30", (done) => {
        let text = "Tea time is usually around 4 or 4.30."
        let translation = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
    })
  })
  suite("highlights", () => {
      test("favorite fruit", (done) => {
        let text = "Mangoes are my favorite fruit."
        let translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("yogurt", (done) => {
        let text = "I ate yogurt for breakfast."
        let translation = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        let locale = "american-to-british"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("footie", (done) => {
        let text = "We watched the footie match for a while."
        let translation = 'We watched the <span class="highlight">soccer</span> match for a while.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
      test("Paracetamol", (done) => {
        let text = "Paracetamol takes up to an hour to work."
        let translation = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        let locale = "british-to-american"
        assert.equal(translator.translate(text, locale).translation, translation)
        done()
      })
  })

});
