let min = 1
let max = 25
let sufix = 'rno'
let counter_games = 1;

let user_sequence_min = 1
let user_sequence_max = 10

if (localStorage.getItem("Results") === null){
  localStorage.setItem("Results",JSON.stringify([]))
}else {
  let results = JSON.parse(localStorage.getItem("Results"))
  if(results.length !== 0){
    counter_games = parseInt(results[results.length - 1].name.split(' ')[1]) + 1
  }
  for (let obj of results){
    $('.rno_results_table').append(`<tr><td>${obj.name}</td><td>${obj.time}</td></tr>`);
  }
}

let msg_error = 'Не вірна цифра'
let msg_congratulation = 'Вітаю ви виграли'

$('#message').dialog({
  autoOpen: false,
  show: {
    effect: "fadeIn",
    duration: 1000
  },
  hide: {
    effect: "fadeOut",
    duration: 1000
  }
});

let interval = null
let state_user = [user_sequence_min - 1]

document.getElementById('rno_btn_start').addEventListener("click", () => {
  $('.rno_first_form').hide()
  $('.rno_second_form').show()
  startGame()
})

document.getElementById('rno_btn_restart').addEventListener("click", () => {
  clearAndRestartGame()
})

function startGame() {
  state_user = [user_sequence_min - 1]
  if (interval != null) {
    clearInterval(interval);
  }
  arr_1d = getRandomArray()

  let counter = 0
  let jq_rows = $('.rno_game_table').children().children()
  for (let row of jq_rows) {
    let jq_cells = row.children
    for (let cell of jq_cells) {
      $(cell).html(`<p id="${arr_1d[counter]}_id_td" class="${sufix + '_p_style_' + getRandomIntInclusive(1, 5)}">${arr_1d[counter++]}</p>`);
    }
  }

  for (let j of arr_1d) {
    document.getElementById(`${j}_id_td`).addEventListener('click', () => {
      if (state_user.length === user_sequence_max - user_sequence_min + 1){
        $('#p_message').text(msg_congratulation)
        $( "#message" ).dialog( "open" );
        clearInterval(interval);
        let result = {
          name:`Гра ${counter_games++}`,
          time: timer.toString()
        }
        let results = JSON.parse(localStorage.getItem("Results"))
        let flag = true
        $(".rno_results_table").children("tr").remove();
        for (let obj of results){
          $('.rno_results_table').append(`<tr><td>${obj.name}</td><td>${obj.time}</td></tr>`);
          if (obj.time === result.time ){
            flag = false
          }
        }
        if (flag){
          results.push(result)
          $('.rno_results_table').append(`<tr><td>${result.name}</td><td>${result.time}</td></tr>`);
          localStorage.setItem("Results",JSON.stringify(results))
        }else{
          $('#p_message').text('Почніть нову гру')
          $( "#message" ).dialog( "open" );
        }
      }else {
        if (state_user[state_user.length - 1] + 1 === j){
          state_user.push(j)
          console.log(state_user)
        }else {
          $('#p_message').text(msg_error)
          $( "#message" ).dialog( "open" );
        }
      }
    })
  }

  let timer = 61
  interval = setInterval(() => {
    if (timer === 0) {
      $('#p_message').text('Час вийшов')
      $( "#message" ).dialog( "open" );
      clearInterval(interval);
    } else {
      timer--;
      $('.rno_timer_tick').text(timer)
    }
  }, 1000);
}

function clearAndRestartGame() {
  clearInterval(interval);
  let jq_rows = $('.rno_game_table').children().children()
  for (let row of jq_rows) {
    let jq_cells = row.children
    for (let cell of jq_cells) {
      $(cell).html('')
    }
  }
  startGame()
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getRandomArray() {
  let arr = []
  for (let i = 1; i <= max; i++) {
    arr.push(i)
  }
  arr = shuffle(arr)
  return arr
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




