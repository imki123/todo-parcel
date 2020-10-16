//초기 lists
let lists = [
  {
    _id: 1,
    text: 'first item',
    done: false,
  },
  {
    _id: 2,
    text: 'second item',
    done: false,
  },
]

//리스트 개수
let count = lists.length
// refresh. 변경시 리스트를 다시 렌더링하는 함수
function refresh() {
  console.log('refresh')
  //리스트 그리기
  let html = ''
  for (let i of lists) {
    html += `<div id="item_${i._id}" class="item ${i.done}">
    
    <div class="button done hover ${i.done}">
      <img class="check" src="./images/check.png"/>
    </div>
      <div class="text"><textarea class="${i.done}">${i.text}</textarea></div>
      <div class="button remove hover">
        <img class="remove" src="./images/remove.png"/>
      </div>
    </div>`
  }
  const list = document.querySelector('.lists')
  if (list) list.innerHTML = html

  //add 이벤트 추가
  const add = document.querySelector('.add')
  if (add)
    add.onclick = function () {
      addItem()
    }

  //done 이벤트 추가
  document.querySelectorAll('.done').forEach(i =>{
    let _id = Number(i.parentNode.id.replace('item_', ''))
    i.onclick = function () {
      toggleDone(_id)
    }
  })

  //remove 이벤트 추가
  document.querySelectorAll('.remove').forEach((i) => {
    let _id = Number(i.parentNode.id.replace('item_', ''))
    i.onclick = function () {
      removeItem(_id)
    }
  })

  //textarea onchange 이벤트 시 lists 업데이트
  document.querySelectorAll('textarea').forEach(i=> {
    let _id = Number(i.parentNode.parentNode.id.replace('item_', ''))
    i.onchange = function () {
      changeText(_id)
    }
    i.onkeyup = function () {
      resizeTextarea(_id)
    }
    i.onkeydown = function () {
      resizeTextarea(_id)
    }
    i.onfocusout = function () {
      resizeTextarea(_id)
    }
  })
  resizeTextarea()
}
// refresh. 변경시 리스트를 다시 렌더링하는 함수 //

/* 이벤트 함수들 생성 */
//add버튼 클릭하면 item 추가하고 focus
function addItem() {
  count++
  lists.push({
    _id: count,
    text: '',
    done: false,
  })
  refresh()
  const texts = document.querySelectorAll('textarea')
  texts[texts.length - 2].focus()
}

//삭제 클릭하면 item 삭제하고 refresh()
function removeItem(_id) {
  lists = lists.filter((i) => i._id !== _id)
  let scroll = document.body.scrollTop
  refresh()
  document.body.scrollTop = scroll
}

//done 클릭하면 item의 스타일 변경하고 refresh()
function toggleDone(_id) {
  lists = lists.map((i) => (i._id === _id ? { ...i, done: !i.done } : i))
  let scroll = document.body.scrollTop
  refresh()
  document.body.scrollTop = scroll
}

//textarea 변경되면 lists 변경
function changeText(_id) {
  const $text = document.querySelector(`#item_${_id} textarea`)
  let text = ''
  if ($text) {
    text = $text.value
    lists = lists.map((i) => (i._id === _id ? { ...i, text: text } : i))
  }
}

//textarea를 찾아서 크기를 글자 높이에 맞게 변경하기
function resizeTextarea(_id) {
  const fake = document.querySelector('#fakeTextarea')
  if (_id && fake) {
    const textarea = document.querySelector(`#item_${_id} textarea`)
    if (textarea) {
      fake.style.height = '0px'
      fake.style.width = textarea.clientWidth + 'px'
      fake.value = textarea.value
      textarea.style.height = 8 + fake.scrollHeight + 'px'
      fake.value = ''
      fake.style.height = '0px'
    }
    return
  }

  const textareas = document.querySelectorAll('textarea')
  if (fake) {
    for (let i = 0; i < textareas.length - 1; i++) {
      fake.style.height = '0px'
      fake.style.width = textareas[i].clientWidth + 'px'
      fake.value = textareas[i].value
      textareas[i].style.height = 8 + fake.scrollHeight + 'px'
    }
    fake.value = ''
    fake.style.height = '0px'
  }
}

//로드 완료 후 리프레시
window.addEventListener('load', function () {
  refresh()
})
