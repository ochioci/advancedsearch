function init () {
  search = document.getElementById('search')

  data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in gravida odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum venenatis arcu id leo auctor sollicitudin vel in nibh. Maecenas purus velit, commodo ac lectus eu, laoreet facilisis nulla. Pellentesque vestibulum commodo odio, eu egestas tellus viverra sit amet. Integer finibus quis urna non luctus. Aenean nec porta ligula. Donec nec nibh elit. Etiam eu fermentum neque. Phasellus porta dolor quis ligula viverra, vel semper neque consequat. Donec aliquam finibus lectus, sed aliquam justo accumsan sed. Sed congue massa a dictum tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam scelerisque vulputate accumsan. Donec eu lobortis nisi. Mauris mattis justo eu sem tristique suscipit. Quisque convallis, urna a elementum finibus, ex ex tristique nibh, a pellentesque dui tortor nec leo. Aenean pellentesque molestie ex, vel ultrices orci commodo tincidunt. Fusce et placerat magna, vel pulvinar ipsum. Vestibulum varius commodo posuere. Donec pharetra libero eget odio finibus, suscipit vulputate massa ultricies. Curabitur molestie odio eu eros commodo, et iaculis lectus ullamcorper. Morbi dapibus nisl sit amet tortor vehicula bibendum. Quisque cursus ex turpis, ut pretium libero congue sed. Aliquam aliquet lacus eget nunc rutrum pellentesque. Nulla ut sodales ligula, scelerisque faucibus odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ultrices lobortis quam, vitae volutpat erat ultricies non. Aenean a placerat nulla. Vivamus aliquam id mi ac feugiat. Quisque tristique libero eu massa suscipit vulputate. Sed mollis nulla nec venenatis tristique. Vestibulum vitae feugiat nunc. Aenean nec consectetur neque. Integer maximus bibendum tincidunt. Sed imperdiet odio eget elit imperdiet, feugiat molestie lacus lacinia. Suspendisse rhoncus id nunc at varius. Curabitur finibus fermentum dapibus. Maecenas pellentesque pretium risus vel posuere. Donec sodales risus at eros eleifend porta. Vestibulum auctor neque vitae orci porttitor dignissim. Morbi mollis augue sit amet volutpat pharetra. In aliquam ac eros quis elementum. Pellentesque vestibulum justo vitae tempus rutrum. Duis suscipit interdum nibh, at varius velit placerat tristique. Aliquam condimentum bibendum dolor, eu volutpat diam ultrices et. Aenean justo ipsum, semper vel nibh ut, accumsan tempus tortor. Sed nisl massa, congue non odio id, vehicula maximus turpis. Duis nec laoreet nisl. Praesent imperdiet feugiat mauris, id efficitur urna egestas quis. Nam eget nulla pulvinar, ultricies quam vel, cursus ante. Cras ac nisi quis ex imperdiet laoreet cursus quis magna. Aliquam convallis sollicitudin condimentum. Ut suscipit commodo bibendum. Phasellus quis tristique purus. Etiam suscipit purus sagittis, euismod lectus sed, accumsan nisi.Cras a sem feugiat, laoreet risus sed, cursus nunc. Donec massa orci, bibendum a facilisis eu, malesuada vel velit. In euismod eleifend sollicitudin. Ut condimentum erat a risus imperdiet, non luctus metus sollicitudin. Aenean rhoncus, massa sed finibus facilisis, libero mi luctus arcu, eget volutpat massa risus id quam. Maecenas semper arcu at est placerat, sit amet ornare quam vehicula. Suspendisse in quam id ante pharetra ornare."
data = data.split(" ")
}

document.addEventListener("DOMContentLoaded", init)


function smartSearch(query,data) {
  //query expects string
  //data expects array of strings
  let output = []

  for (let i = 0; i < data.length; i++) {
    output.push({ "result": data[i], "score": getSmartSearchScore(query,data[i])})
  }

  return output.sort(function(a,b) {
    return a.score - b.score
  })
}


function getSmartSearchScore (q,t) {
  let query = q.toLowerCase()
  let target = t.toLowerCase()

  let score = 0
  let streak = 0

  for (let i = 0; i < target.length; i++) { //for each character in the target
    try {

      if (target[i] === query[i]) {
        streak++
      } else {
        score += (streak * streak)
      }

    }
    catch {
      console.log('err')
      score += (streak * streak)
      console.error(error)

    }

  }

  return score
}
