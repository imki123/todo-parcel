const lists = [
  {
    text: 'first item',
    done: false,
  },
  {
    text: 'second item',
    done: true,
  },
]

const list = document.querySelector('.lists')

//리스트 그리기
let html = ''
if(lists.length > 0){
  for(let i of lists){
    html += `<div class="item">
      <div class="done hover ${i.done}"></div>
      <div class="text">${i.text}</div>
      <button class="button edit hover">edit</button>
      <button class="button delete hover">delete</button>
    </div>`
  }
  if(list) list.innerHTML = html
}
