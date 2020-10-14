const lists = [
  {
    _id: 1,
    text: 'first item',
    done: false,
  },
  {
    _id: 2,
    text: 'second item',
    done: true,
  },
]

let length = lists.length

function refresh() {
  console.log('refresh')
  //리스트 그리기
  let html = ''
  for (let i of lists) {
    html += `<div class="item ${i.done}">
    <div class="done hover ${i.done}"></div>
    <div class="text ${i.done}">${i.text}</div>
    <button class="button edit hover">수정</button>
    <button class="button delete hover">삭제</button>
  </div>`
  }
  const list = document.querySelector('.lists')
  if (list) list.innerHTML = html
}

function addItem() {
  length++
  lists.push({
    _id: length,
    text: '',
    done: false,
  })
}

window.addEventListener('load', function () {
  refresh()
  document.querySelector('.add').onclick = function(){
    addItem()
    refresh()
  }
})
