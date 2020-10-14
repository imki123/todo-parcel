let lists = [
  {
    _id: 1,
    text: 'first item',
    done: false,
    edit: false,
  },
  {
    _id: 2,
    text: 'second item',
    done: true,
    edit: false,
  },
]

let length = lists.length

function refresh() {
  console.log('refresh')
  //리스트 그리기
  let html = ''
  for (let i of lists) {
    html += `<div id="item_${i._id}" class="item ${i.done}">
    <div class="done hover ${i.done}"></div>`

    if (i.edit)
      html += `<div class="text"><textarea class="${i.edit}">${i.text}</textarea></div>
    <button class="button edit hover">저장</button>
      <button class="button delete hover">삭제</button>
    </div>`
    else
      html += `<div class="text"><textarea class="${i.edit}" disabled>${i.text}</textarea></div>
    <button class="button edit hover">수정</button>
      <button class="button delete hover">삭제</button>
    </div>`
  }
  const list = document.querySelector('.lists')
  if (list) list.innerHTML = html

  const item = document.querySelectorAll('.item')
  for (let i of item) {
    i.onclick = function () {
      toggleDone(Number(i.id.replace('item_', '')))
      refresh()
    }
  }
}

function addItem() {
  length++
  lists.push({
    _id: length,
    text: '',
    done: false,
    edit: true,
  })
}

function toggleDone(_id) {
  lists = lists.map((i) => (i._id === _id ? { ...i, done: !i.done } : i))
}

window.addEventListener('load', function () {
  refresh()

  document.querySelector('.add').onclick = function () {
    addItem()
    refresh()
  }
})
