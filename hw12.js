// ************************* REQUIRED ******************************





// function printImg(data) {
//     elements = []
//     Object.values(JSON.parse(data))[0].forEach((item, index) => {
//         elements.push(required.appendChild(document.createElement('img')))
//         elements[index].style.width = '50px;'
//         elements[index].src = item['src']
//         elements[index].title = item['title']
//     });
// }

// readFile.onclick = (event) => {
//     var request = new XMLHttpRequest
//     request.open(
//         "GET",
//         './db.json'
//     )

//     request.onload = function (event) {
//         this.status === 200 ?
//             printImg(this.response) : console.warn('Something wrong with loading file!')
//     }
//     request.send()
// }

// // ******************* ADDITIONAL #1 *******************************************

const render = (() => {
    const image = additonalOne.appendChild(document.createElement('img'))
    return () => fetch(`https://picsum.photos/320/240`)
        .then(response => response.blob())
        .then(response => Object.assign(
            image,
            {
                src: URL.createObjectURL(response),
                style: 'position:absolute; width:320px; '
            }))

})()
render()
window.addEventListener('hashchange', function (event) {
    render()
    if (!localStorage['history']) {
        let arr = [{ pageId: location.hash, startTime: new Date().getTime() }]
        localStorage.setItem('history', JSON.stringify(arr))
    }
    else {
        let arr = JSON.parse(localStorage['history'])
        localStorage.setItem('history',
            JSON.stringify(
                [...arr, { pageId: location.hash, startTime: new Date().getTime() }]
            )
        )
    }
    this.console.log(
        `Hash was changed
    ${localStorage['history']}`)
}
)
// // ******************* ADDITIONAL #2 *******************************************
function promise(func, pause) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve => func(), pause * 1000)
    })
}

let button = additonalTwo.appendChild(document.createElement('button'))
button.innerText = 'Lets play!!!'
button.onclick = (event) => {
    let winner = Math.round(Math.random() * 200 + 1)
    let userName;
    button.style.display = 'none'
    let imgRuletka = additonalTwo.appendChild(document.createElement('img'))
    imgRuletka.src = './img/ruletka.gif'
    imgRuletka.classList.add('firstPicture')
    let imgSunduk = additonalTwo.appendChild(document.createElement('img'))
    imgSunduk.src = './img/sunduk.gif'
    imgSunduk.classList.add('secondPicture')
    promise(() => {
        imgRuletka.classList.add('opacityOff')
        imgSunduk.classList.add('opacityOn')

    }, 4).then(promise(() => {
        let user;
        fetch(`https://api.github.com/users/${winner}`)
            .then(response => response.json())
            .then(response => {
                
                imgSunduk.src = response.avatar_url
                console.log(response)
                let name = response.name ||'User without name'
                userName = outputName.appendChild(document.createElement('p'))
                userName.innerText = name
            })

    }, 6)).then(promise(()=>{
        button.style.display='block'
        imgRuletka.remove()
        imgSunduk.remove()
        userName.remove()
    },16))

}