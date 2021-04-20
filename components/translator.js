const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  amerigo(textArr) {
    console.log("in amerigo")
    // should think about this kind of writing and dots or ? or ! (handled it in this.notation):
    
    /*
      No 
      Mr.                   Bond, I expect you to 
      die. We had a party at my friend's 
      condo. I 
      ate 
      yogurt 
      for breakfast.
    */
    // first translating words
    let translatedWords = []
    //first search for simple words
    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      if (americanOnly[lowWord]) {
        translatedWords.push([americanOnly[lowWord], i, 1])
      }
    })
    //now search for complex words like "Rube Goldberg machine":
    // step 1: an array of all keys
    let keys = Object.keys(americanOnly)
    //step 2: put all complex keys in an array
    let complexKeys = keys.filter(key => {
      let tempArr = key.split(" ")
      return tempArr.length > 1
    })

    let candidates = []
    let translatedComplexWords = []

    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      // first we see if word can be a compex word
      if (lowWord.length > 2) {
        let regex = new RegExp(`${lowWord}`)
        complexKeys.map(key => {
          if (regex.test(key)) {
            let tempArr = key.split(" ")
            let n = i
            let matchedWord = true
            for (let x=0; x<tempArr.length; x++) {
              if (textArr[n]) {
                if (tempArr[x].toLowerCase() !== textArr[n].toLowerCase()) {
                  matchedWord = false
                }
                n++
              }
            }
            if (matchedWord) {
              candidates.push([key, i, tempArr.length])
            }
          }
        })
      }
    })

    candidates.map(candidate => {
      translatedComplexWords.push([americanOnly[candidate[0]], candidate[1], candidate[2]])
    })

    let wordsNumber = translatedWords.length
    let complexWordsNumber = translatedComplexWords.length

    // now translation spellings
    let translatedSpelling = []
    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      if (americanToBritishSpelling[lowWord]) {
        translatedSpelling.push([americanToBritishSpelling[lowWord], i, 1])
      }
    })
    let spellingNumber = translatedSpelling.length

    // now translating titles
    let translatedTitles = []
    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      if (americanToBritishTitles[lowWord]) {
        let translation = americanToBritishTitles[lowWord]
        let tempArr = translation.split("")
        let letter = tempArr[0]
        tempArr.splice(0,1,letter.toUpperCase())
        translation = tempArr.join("")
        translatedTitles.push([translation, i, 1])
      }
    })
    let titlesNumber = translatedTitles.length

    // now translating hours
    let translatedHours = []
    textArr.map((word, i) => {
      let regex = /[0-9]/
      let regexTwo = /:/
      if (regexTwo.test(word)) {
        let tempArr = word.split("")
        console.log(tempArr)
        let n = tempArr.indexOf(":")
        let hour = true
        if (!regex.test(tempArr[n-1]) || !regex.test(tempArr[n+1])) {
          hour = false
        }
        if (hour) {
          tempArr.splice(n, 1, ".")
          word = tempArr.join("")
          translatedHours.push([word, i, 1])
        }
      }
    })
    let hoursNumber = translatedHours.length

    //////
    let translationArr = [...textArr]

    if (!wordsNumber && !spellingNumber && !titlesNumber && !complexWordsNumber && !hoursNumber) {
      return ({translation: "Everything looks good to me!"})

    } else {

      translatedWords.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedSpelling.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedTitles.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedHours.map(item => {
        console.log(item)
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      console.log(textArr)
      if (translatedComplexWords.length <= 1) {
        translatedComplexWords.map(item => {
          console.log(item)
          //console.log(translationArr)
          translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
          console.log(translationArr)
        })
      } else {
        let containerArr = []
        let finalArr = []
        for (let i=0; i<translatedComplexWords.length; i++) {
          let tempArr = [...translationArr]
          tempArr.splice(translatedComplexWords[i][1], translatedComplexWords[i][2], `<span class="highlight">${translatedComplexWords[i][0]}</span>`)
          containerArr.push(tempArr)
        }
        console.log(containerArr)
        let finalNotation

        containerArr.map(arr => {
          arr.map((word, n) => {
            let add = true
            let regex = /<span/
            containerArr.map(array => {
              if (array.indexOf(word) === -1 && !regex.test(word)) {
                add = false
              }
            })
            if (finalArr.indexOf(word) !== -1) {
              add = false
            }
            if (word === "." || word === "!" || word === "?") {
              if (n === arr.length-1) {
                add = false
                finalNotation = word
              }
            }
            if (add === true) {
              finalArr.push(word)
            }
          })
        })
        if (finalNotation) {
          finalArr.push(finalNotation)
        }

        console.log(finalArr)
        translationArr = [...finalArr]

      }
    }

    //the first letter will be capital:
    let firstWord = translationArr[0]
    let tempArr = firstWord.split("")
    tempArr.splice(0,1,tempArr[0].toUpperCase())
    firstWord = tempArr.join("")
    translationArr.splice(0,1,firstWord)

    //fixing the dot situation:

    let lastWord = translationArr[translationArr.length-1]
    
    if (lastWord === "." || lastWord === "!" || lastWord === "?" ) {
      let secondLast = translationArr[translationArr.length-2]
      translationArr.splice(translationArr.length-2, 2)
      translationArr.push(`${secondLast}${lastWord}`)
    }

    return({translation: translationArr.join(" ")})
  }
////////////////////////////////////////////////

  britany(textArr) {
    console.log("in britany")

    let translatedWords = []
    //first search for simple words
    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      if (britishOnly[lowWord]) {
        translatedWords.push([britishOnly[lowWord], i, 1])
      }
    })

    //now search for complex words:
    // step 1: an array of all keys
    let keys = Object.keys(britishOnly)

    //step 2: put all complex keys in an array

    let complexKeys = keys.filter(key => {
      let tempArr = key.split(" ")
      return tempArr.length > 1
    })
    //console.log(complexKeys)
    let candidates = []
    let translatedComplexWords = []

    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      // first we see if word can be a compex word
      if (lowWord.length > 2) {
        let regex = new RegExp(`${lowWord}`)
        complexKeys.map(key => {
          if (regex.test(key)) {
            let tempArr = key.split(" ")
            let n = i
            let matchedWord = true
            for (let x=0; x<tempArr.length; x++) {
              if (textArr[n]) {
                if (tempArr[x].toLowerCase() !== textArr[n].toLowerCase()) {
                  matchedWord = false
                }
                n++
              }
            }
            if (matchedWord) {
              candidates.push([key, i, tempArr.length])
            }
          }
        })
      }
    })

    candidates.map(candidate => {
      translatedComplexWords.push([britishOnly[candidate[0]], candidate[1], candidate[2]])
    })

    let wordsNumber = translatedWords.length
    let complexWordsNumber = translatedComplexWords.length


    let translatedSpelling = []

    let spellingKeys = Object.keys(americanToBritishSpelling)
    
    let inverseKeys = []
    spellingKeys.map(key => {
      inverseKeys.push(americanToBritishSpelling[key])
    })
    
    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      let index = inverseKeys.indexOf(lowWord)
      if (index > -1) {
        let value = lowWord
        //console.log(value)
        let theKey = spellingKeys.find(key => americanToBritishSpelling[key] === value)
        translatedSpelling.push([theKey, i, 1])
      }
    })
    let spellingNumber = translatedSpelling.length

    let translatedTitles = []
    let titlesKeys = Object.keys(americanToBritishTitles)

    let invereTitlesKeys = []
    titlesKeys.map(key => {
      invereTitlesKeys.push(americanToBritishTitles[key])
    })

    textArr.map((word, i) => {
      let lowWord = word.toLowerCase()
      let index = invereTitlesKeys.indexOf(lowWord)
      if (index > -1) {
        let value = lowWord
        let theKey = titlesKeys.find(key => americanToBritishTitles[key] === value)
        let tempArr = theKey.split("")
        tempArr.splice(0,1,tempArr[0].toUpperCase())
        theKey = tempArr.join("")
        translatedTitles.push([theKey, i, 1])
      }
    })
    let titlesNumber = translatedTitles.length

    let translatedHours = []
    textArr.map((word, i) => {
      let regex = /[0-9]/
      let regexTwo = /\./
      if (regexTwo.test(word)) {
        let tempArr = word.split("")
        let n = tempArr.indexOf(".")
        let hour = true
        if (!regex.test(tempArr[n-1]) || !regex.test(tempArr[n+1])) {
          hour = false
        }
        if (hour) {
          tempArr.splice(n, 1, ":")
          word = tempArr.join("")
          translatedHours.push([word, i, 1])
        }
      }
    })
    let hoursNumber = translatedHours.length


    let translationArr = [...textArr]

    if (!wordsNumber && !spellingNumber && !titlesNumber && !complexWordsNumber && !hoursNumber) {
      return ({translation: "Everything looks good to me!"})

    } else {

      translatedWords.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedSpelling.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedTitles.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      translatedHours.map(item => {
        translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
      })
      console.log(textArr)
      if (translatedComplexWords.length <= 1) {
        translatedComplexWords.map(item => {
          console.log(item)
          //console.log(translationArr)
          translationArr.splice(item[1], item[2], `<span class="highlight">${item[0]}</span>`)
          console.log(translationArr)
        })
      } else {
        let containerArr = []
        let finalArr = []
        for (let i=0; i<translatedComplexWords.length; i++) {
          let tempArr = [...translationArr]
          tempArr.splice(translatedComplexWords[i][1], translatedComplexWords[i][2], `<span class="highlight">${translatedComplexWords[i][0]}</span>`)
          containerArr.push(tempArr)
        }
        console.log(containerArr)
        let finalNotation

        containerArr.map(arr => {
          arr.map((word, n) => {
            let add = true
            let regex = /<span/
            containerArr.map(array => {
              if (array.indexOf(word) === -1 && !regex.test(word)) {
                add = false
              }
            })
            if (finalArr.indexOf(word) !== -1) {
              add = false
            }
            if (word === "." || word === "!" || word === "?") {
              if (n === arr.length-1) {
                add = false
                finalNotation = word
              }
            }
            if (add === true) {
              finalArr.push(word)
            }
          })
        })
        if (finalNotation) {
          finalArr.push(finalNotation)
        }

        console.log(finalArr)
        translationArr = [...finalArr]

      }
    }

    //the first letter will be capital:
    let firstWord = translationArr[0]
    let tempArr = firstWord.split("")
    tempArr.splice(0,1,tempArr[0].toUpperCase())
    firstWord = tempArr.join("")
    translationArr.splice(0,1,firstWord)

    //fixing the dot situation:

    let lastWord = translationArr[translationArr.length-1]
    
    if (lastWord === "." || lastWord === "!" || lastWord === "?" ) {
      let secondLast = translationArr[translationArr.length-2]
      translationArr.splice(translationArr.length-2, 2)
      translationArr.push(`${secondLast}${lastWord}`)
    }

    return({translation: translationArr.join(" ")})
  }
////////////////////////////////////////

  notation(textArr) {
    console.log("in notation")
    let filteredTextArr = []
    let lastNotation
    textArr.map((word, i) => {
      let tempArr = word.split("")
      let lastCarac = tempArr[tempArr.length - 1]
      if (lastCarac === "." || lastCarac === "!" || lastCarac === "?") {
        if (i === textArr.length-1){
          lastNotation = lastCarac
          tempArr.splice(tempArr.length-1,1)
        }
      }
      filteredTextArr.push(tempArr.join(""))
    })

    if (lastNotation) {
      filteredTextArr.push(lastNotation)
    }

    return filteredTextArr
  }
//////////////////////////////////////////

  translate(text, locale) {
    let rawTextArr = text.split(" ")
    let textArr = this.notation(rawTextArr)
    //console.log(textArr)
    let answer
    if (locale === "american-to-british") {
      answer = this.amerigo(textArr)
    } else {
      answer = this.britany(textArr)
    }

    answer.text = rawTextArr.join(" ")
    return answer
  }
}

module.exports = Translator;