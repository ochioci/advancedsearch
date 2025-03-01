const minScoreCoefficent = 1.5, lengthDifferenceCoefficent = 1.5

function init () {
  search = document.getElementById('search')
  searchButton = document.getElementById('searchButton')
  searchButton.addEventListener('click', initSearch)
  search.addEventListener('keydown', handleSearchKeydown)
  lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in gravida odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum venenatis arcu id leo auctor sollicitudin vel in nibh. Maecenas purus velit, commodo ac lectus eu, laoreet facilisis nulla. Pellentesque vestibulum commodo odio, eu egestas tellus viverra sit amet. Integer finibus quis urna non luctus. Aenean nec porta ligula. Donec nec nibh elit. Etiam eu fermentum neque. Phasellus porta dolor quis ligula viverra, vel semper neque consequat. Donec aliquam finibus lectus, sed aliquam justo accumsan sed. Sed congue massa a dictum tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam scelerisque vulputate accumsan. Donec eu lobortis nisi. Mauris mattis justo eu sem tristique suscipit. Quisque convallis, urna a elementum finibus, ex ex tristique nibh, a pellentesque dui tortor nec leo. Aenean pellentesque molestie ex, vel ultrices orci commodo tincidunt. Fusce et placerat magna, vel pulvinar ipsum. Vestibulum varius commodo posuere. Donec pharetra libero eget odio finibus, suscipit vulputate massa ultricies. Curabitur molestie odio eu eros commodo, et iaculis lectus ullamcorper. Morbi dapibus nisl sit amet tortor vehicula bibendum. Quisque cursus ex turpis, ut pretium libero congue sed. Aliquam aliquet lacus eget nunc rutrum pellentesque. Nulla ut sodales ligula, scelerisque faucibus odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ultrices lobortis quam, vitae volutpat erat ultricies non. Aenean a placerat nulla. Vivamus aliquam id mi ac feugiat. Quisque tristique libero eu massa suscipit vulputate. Sed mollis nulla nec venenatis tristique. Vestibulum vitae feugiat nunc. Aenean nec consectetur neque. Integer maximus bibendum tincidunt. Sed imperdiet odio eget elit imperdiet, feugiat molestie lacus lacinia. Suspendisse rhoncus id nunc at varius. Curabitur finibus fermentum dapibus. Maecenas pellentesque pretium risus vel posuere. Donec sodales risus at eros eleifend porta. Vestibulum auctor neque vitae orci porttitor dignissim. Morbi mollis augue sit amet volutpat pharetra. In aliquam ac eros quis elementum. Pellentesque vestibulum justo vitae tempus rutrum. Duis suscipit interdum nibh, at varius velit placerat tristique. Aliquam condimentum bibendum dolor, eu volutpat diam ultrices et. Aenean justo ipsum, semper vel nibh ut, accumsan tempus tortor. Sed nisl massa, congue non odio id, vehicula maximus turpis. Duis nec laoreet nisl. Praesent imperdiet feugiat mauris, id efficitur urna egestas quis. Nam eget nulla pulvinar, ultricies quam vel, cursus ante. Cras ac nisi quis ex imperdiet laoreet cursus quis magna. Aliquam convallis sollicitudin condimentum. Ut suscipit commodo bibendum. Phasellus quis tristique purus. Etiam suscipit purus sagittis, euismod lectus sed, accumsan nisi.Cras a sem feugiat, laoreet risus sed, cursus nunc. Donec massa orci, bibendum a facilisis eu, malesuada vel velit. In euismod eleifend sollicitudin. Ut condimentum erat a risus imperdiet, non luctus metus sollicitudin. Aenean rhoncus, massa sed finibus facilisis, libero mi luctus arcu, eget volutpat massa risus id quam. Maecenas semper arcu at est placerat, sit amet ornare quam vehicula. Suspendisse in quam id ante pharetra ornare."
lorem = lorem.split(" ")

  getCards()
}

function initSearch () {
  console.log(smartSearch(search.value, cardsData))
}

function handleSearchKeydown (e) {
  // console.log(e)
  if (e.keyCode === 13) {
    initSearch()
  }
}

function cardSearch(name) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].name.toLowerCase() === name.toLowerCase()) {
      return cards[i]
    }
  }
  return null
}

function getCards () {
      console.log('fetching')
      fetch('https://api.scryfall.com/bulk-data').then(res => res.json()).then(handleData)
    }

    function handleData(dat) {
      console.log('fetching 2')
      for (let i = 0; i < dat.data.length; i++) {
        if (dat.data[i].type === "oracle_cards") {
          fetch(dat.data[i].download_uri).then(res => res.json()).then(handleCards)
        }
      }
    }

    function handleCards (data) {
      cards = data
      let o = []
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].legalities.commander === "legal") {
          o.push(cards[i].name)
        }
      }
      cardsData = o
      console.log(cardsData)
    }

document.addEventListener("DOMContentLoaded", init)


function smartSearchSD(query,data) {
  //query expects string
  //data expects array of strings
  let output = []

  for (let i = 0; i < data.length; i++) {
    output.push({ "result": data[i], "score": SorensenDice(query,data[i])})
  }

  output = output.sort(function(a,b) {
    return b.score - a.score
  })

  let ref = getSmartSearchScore(query,query,true)
  let refWord = query
  // console.log(ref, refWord.length)
  if (1 === 1) {
    return output[0].result
  }
    // console.log(ref, output[0], (ref / refWord.length) * minScoreCoefficent)
  //   return 'No Results'
  // }

}

function smartSearch(query,data,ignore = false) {
  //query expects string
  //data expects array of strings
  let output = []

  for (let i = 0; i < data.length; i++) {
    output.push({ "result": data[i], "score": getSmartSearchScore(query,data[i])})
  }

  output = output.sort(function(a,b) {
    return b.score - a.score
  })

  let ref = getSmartSearchScore(query,query,true)
  let refWord = query
  // console.log(ref, refWord.length)
  if (output[0].score > (ref / refWord.length) * minScoreCoefficent || ignore) {
    return output[0].result
  } else {
    // console.log(ref, output[0], (ref / refWord.length) * minScoreCoefficent)
    return 'No Results'
  }

}
//use cardsData or lorem
function massTest(coefficent = 0, dataset) {
  let successes = 0
  let failures = 0
  let total = 0
  for (let i = 0; i < dataset.length; i++) {
    if (i % 100 === 0) {
      console.log((i / dataset.length) * 100)
    }
    let c = dataset[i]

if (Math.random() > coefficent) {
  if (smartSearch(sl(c), dataset, true) === c) {
    successes++
  }  else {
    failures++
  }

  total++
}

  }

  return ((successes / total) * 100) + '% success'
}

function massTest2(coefficent = 0, dataset) {
  let successes = 0
  let failures = 0
  let total = 0
  for (let i = 0; i < dataset.length; i++) {
    if (i % 100 === 0) {
      console.log((i / dataset.length) * 100)
    }
    let c = dataset[i]

if (Math.random() > coefficent) {
  if (smartSearchSD(sl(c), dataset) === c) {
    successes++
  }  else {
    failures++
  }

  total++
}

  }

  return ((successes / total) * 100) + '% success'
}

function SorensenDice(s1, s2){
    //Algorithm using the Sørensen–Dice coefficient
    //Returns a normalized value (between zero and one)
    //representing how similar the two words are.
    //Zero means no similarity, one means exact match.
    function getPairs(s){
        //return an array of all pairs of consecutive letters
        return [...s].map(function(elem, index, arr){
            if (arr[index+1]) return elem + arr[index+1];
        }) //the last element is undefined so remove it
    }
    function arrayIntersect(a1, a2){
        //return an array of elements in both a1 and a2 (allows duplicates)
        return a1.filter(function(elem){
            return a2.indexOf(elem) > -1;
        });
    }
    //remove spaces, punctuation, etc.
    var p1 = getPairs(s1.toLowerCase().replace(/[^a-z]/gm, "")),
        p2 = getPairs(s2.toLowerCase().replace(/[^a-z]/gm, ""));
    //coefficient
    return (2 * arrayIntersect(p1, p2).length) / (p1.length + p2.length);
}

function sl(text) {
  let output = text
  let offset = 0
  for (let i = 0; i < text.length; i++) {
    if (Math.random() > 0.8) {
      if (Math.random() > 0.5) {
        output = output.slice(0, i + offset) + randLetter() + output.slice(i + offset); //insertion
        offset++
      } else {
        output[i+offset] = randLetter()
      }
    }
  }
  return output
}


function randLetter(length = 1) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


function numDiff (a, b) { return Math.abs(a - b); }


function getSmartSearchScore (q,t,ref) {
  let query = q.trim().toLowerCase().replace(/[^a-z\s']/g,'').replace(/\s{2,}/g,' ').replace(/\s/g, " ").trim()
  let target = t.trim().toLowerCase().replace(/[^a-z\s']/g,'').replace(/\s{2,}/g,' ').replace(/\s/g, " ").trim()


  if (query === target && !ref) {
    return 1000000
  }
  let score = 0
  let streakStart = 1
  let streak = 0

  for (let i = 0; i < target.length; i++) { //for each character in the target
    try {
      if (target[i] === query[i] || target[i] === query[i - 1] || target[i] === query[i+ 1] || target[i] === query[i+ 2] || target[i] === query[i - 2] || target[i] === query[i+ 3] || target[i] === query[i - 3]) { //having i+3 and i-3 increases score by 4%
      // if (target[i] === query[i] || target[i] === query[i - 1] || target[i] === query[i+ 1] || target[i] === query[i+ 2] || target[i] === query[i - 2]) { //having i+2 and i-2 increases score by 10%
      // if (target[i] === query[i] || target[i] === query[i - 1] || target[i] === query[i+ 1]) {
      // if (target[i] === query[i]) { having the i-1 and i+1 increases score by 30%
        streak++
      } else {
        //nullifies below line
        // streakStart = 2 THE STREAKSTART FEATURE RAISES SCORE BY 5%
        score += (streak * streak * (1 / streakStart) * 2)
        streakStart = i + 1
        streak = 0
      }

    }
    catch {
      console.log('err')
      score += (streak * streak)
      console.error(error)

    }

  }
  // streakStart = 2 //nullifies below line
  score += (streak * streak * (1 / streakStart) * 2) // THE STREAKSTART FEATURE RAISES SCORE BY 5%
  score -= numDiff(target.length, query.length) * lengthDifferenceCoefficent //THIS RAISES SCORE BY 6%
  return score
}
