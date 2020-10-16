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
    done: true,
  },
]

//리스트 개수
let count = lists.length

//변경시 리스트를 다시 렌더링하는 함수
function refresh() {
  console.log('refresh')
  //리스트 그리기
  let html = ''
  for (let i of lists) {
    html += `<div id="item_${i._id}" class="item ${i.done}">
    <div class="button done hover ${i.done}"></div>
      <div class="text"><textarea class="${i.done}">${i.text}</textarea></div>
      <div class="button delete hover">-</div>
    </div>`
  }
  const list = document.querySelector('.lists')
  if (list) list.innerHTML = html

  //add 이벤트 추가
  const add = document.querySelector('.add')
  if(add) add.onclick = function () {
    addItem()
  }

  //done 이벤트 추가
  const dones = document.querySelectorAll('.done')
  for (let i of dones) {
    i.onclick = function () {
      toggleDone(Number(i.parentNode.id.replace('item_', '')))
    }
  }

  //delete 이벤트 추가
  const deletes = document.querySelectorAll('.delete')
  for (let i of deletes) {
    i.onclick = function () {
      deleteItem(Number(i.parentNode.id.replace('item_', '')))
    }
  }

  //textarea onchange 이벤트 시 lists 업데이트
  const texts = document.querySelectorAll('textarea')
  for (let i of texts) {
    i.onchange = function () {
      changeText(Number(i.parentNode.parentNode.id.replace('item_', '')))
    }
  }
}

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
  texts[texts.length - 1].focus()
}

//삭제 클릭하면 item 삭제하고 refresh()
function deleteItem(_id) {
  lists = lists.filter((i) => i._id !== _id)
  refresh()
}

//done 클릭하면 item의 스타일 변경하고 refresh()
function toggleDone(_id) {
  console.log(_id)
  lists = lists.map((i) => (i._id === _id ? { ...i, done: !i.done } : i))
  refresh()
}

//textarea 변경되면 lists 변경
function changeText(_id) {
  const textEl = document.querySelector(`#item_${_id}`)
  let text = ''
  if (textEl) text = textEl.querySelector('textarea').value
  console.log(text)
  lists = lists.map((i) => (i._id === _id ? { ...i, text: text } : i))
}



//로드 완료 후 리프레시
window.addEventListener('load', function () {
  refresh()
})
