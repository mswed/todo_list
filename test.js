superlist = []
test = []

todoInfo = 
    {html: '<input type="checkbox">fsdafaf&nbsp;&nbsp;&nbsp;<button>X</button>', status: 'none'};
test.push(todoInfo)
test.push('wtf?')
superlist.push(test)
console.log(superlist)
const wtf = JSON.stringify(superlist)
console.log(wtf)
localStorage.setItem('idiot', wtf)
let why = localStorage.getItem('idiot')
console.log(why)