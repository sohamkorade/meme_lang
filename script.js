const shabd = {
	"intezaar karo": "await",
	"bas hua": "break",
	"nahi dikha": "default",
	"dikha": "case",
	"pakdo": "catch",
	"kism": "class",
	"sthir": "const",
	"chalo": "continue",
	"keede hatao": "debugger",
	"mitao": "delete",
	"karo": "do",
	"nahi to": "else",
	"ginati": "enum",
	"bhejo": "export",
	"vistaar": "extends",
	"jhoot": "false",
	"ant me": "finally",
	"jahaan": "for",
	"kaam": "function",
	"agar": "if",
	"implements": "implements",
	"aane do": "import",
	"ke andar": "in",
	"instanceof": "instanceof",
	"interface": "interface",
	"maan lo": "let",
	"naya": "new",
	"thenga": "null",
	"package": "package",
	"hamar": "private",
	"bacha ke": "protected",
	"tumhar": "public",
	"bhejo": "return",
	"lallantop": "super",
	"dhoondho": "switch",
	"achal": "static",
	"yeh": "this",
	"pheko": "throw",
	"koshish karo": "try",
	"satya": "true",
	"prakar": "typeof",
	"dekho": "var",
	"khaali": "void",
	"jab": "while",
	"saath": "with",
	"nikalo": "yield",

	" hai ": "=",
	" ho ": "==",
	" aur ": "&&",
	" ya ": "||",
	" badhao": "+=1",
	" ghatao": "-=1",

	"bolo": "print",
	"puchho": "input",
	"kitne": "inputf",
	"jo bhi": "REPLY"
}
const memes = {
	InternalError: "matter-internal-hai.png",
	RangeError: "Aap-toh-ghadi-se-bhi-tej-chal-rahe-hai-KBC-memes.jpeg",
	ReferenceError: "panchayat-Movie-meme-1024x576.jpg",
	SyntaxError: "download.jpeg",
	TypeError: "super-30-itna-galat-kaise-ho-sakte-hai-bhai.jpg",
	URIError: "Hera-Pheri-Memes-21.jpg"
}

const examples = {
	"hello world": `
bolo("hello world")
`,
	"addition": `
maan lo pehla hai kitne("pehla bol")
maan lo doosra hai kitne("doosra bol")
bolo(pehla + doosra)
`,
	"is prime?": `
number hai kitne("number bol")
prime hai satya
agar (number <= 1)
	bolo("1 prime bhi nahi aur composite bhi nahi")
nahi to agar (number > 1){
	jahaan (i hai 2; i < number; i badhao)
		agar (number % i ho 0){
			prime hai jhoot
			bolo(number + " prime nahi")
			bas hua
		}
	agar (prime ho satya)
		bolo (number + " prime Hai")
}
`,
	"college choice": `
puchho("college batao")
college hai jo bhi
dhoondho (college){
	dikha 'iit':
	dikha 'mit':
		print("maze karo")
		break
	dikha 'iiit':
		print("assignment karo")
		break
	nahi dikha:
		print("kuchh bhi karo")
}
`
}

let REPLY
let error, monacoEditor

function print(x) {
	output.innerText += x
}
function input(x, y = "") {
	REPLY = prompt(x, y)
	return REPLY
}
function inputf(x, y = "") {
	return parseFloat(prompt(x, y))
}
console.log = function (...x) {
	print(Array.prototype.slice.call(arguments).join(' '))
}
function execute(code) {
	try {
		output.style.color = 'blue'
		meme.src = `memes/positive/${Math.floor(Math.random() * 4 + 1)}`
		eval(code)
	} catch (e) {
		error = e
		console.warn(e)
		meme.src = `memes/${memes[e.name]}`
		output.style.color = 'red'
		output.innerText = e
	}
}
function compile(code) {
	for (let word in shabd)
		// code = code.replaceAll(word, shabd[word])
		code = code.replaceAll(new RegExp(`("[^"]*"|'[^']*')|${word}`, "g"), ($0, $1) => $1 == undefined ? shabd[word] : $1)
	return code
}
function output_compiled() {
	output.style.color = 'black'
	meme.src = ""
	output.innerText = compile(monacoEditor.getValue()).replaceAll("\n", "########")
	monaco.editor.colorizeElement(output).then(e =>
		output.innerHTML = output.innerHTML.replaceAll('<span class="mtk11">########</span>', "\n"))
}
function run() {
	output.innerText = ""
	let code = monacoEditor.getValue()
	code = compile(code)
	execute(code)
}

function setup_monaco() {
	monacoEditor = monaco.editor.create(document.getElementById('editor'), {
		value: `maan lo x hai kitne("x")
maan lo y hai kitne("y")
bolo (x+y)`,
		language: 'memelang',
		theme: 'memelang-theme'
	})
	monaco.languages.register({ id: 'memelang' })
	const keywords = Object.keys(shabd);
	monaco.languages.setMonarchTokensProvider('memelang', {
		keywords,
		tokenizer: {
			root: [[
				/@?[a-zA-Z][\w$]*/, {
					cases: {
						'@keywords': 'keyword',
						'@default': 'variable',
					}
				}
			],
			[/".*?"/, 'string'],
			[/\/\//, 'comment']]
		}
	})
	monaco.editor.defineTheme('memelang-theme', {
		base: 'vs',
		rules: [
			{ token: 'keyword', foreground: '#FF6600' },
			{ token: 'comment', foreground: '#999999' },
			{ token: 'string', foreground: '#009966' },
			{ token: 'variable', foreground: '#006699' }
		]
	})
	monaco.languages.registerCompletionItemProvider('memelang', {
		provideCompletionItems: (model, position) => {
			let suggestions = [...keywords.map(k => {
				return {
					label: k,
					kind: monaco.languages.CompletionItemKind.Keyword,	//keyword
					insertText: k
				}
			}), ...keywords.map(k => {
				return {
					label: shabd[k],
					kind: monaco.languages.CompletionItemKind.Keyword,	//keyword
					insertText: k
				}
			}),
			{
				label: 'agar - nahi to',
				kind: monaco.languages.CompletionItemKind.Snippet,
				insertText: ['agar (${1:condition}) {', '\t$0', '} nahi to {', '\t', '}'].join('\n'),
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			}
			]
			return { suggestions }
		}
	})
}

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' } })
require(["vs/editor/editor.main"], setup_monaco)
setTimeout(e => {
	cursor = document.querySelector("#editor > div > div.overflow-guard > textarea").style
	cursor.padding = 0
	cursor.border = 0
	cursor.color = 'white'
}, 500)

let html = ""

for (let i in examples)
	html += `
<div class="item">
	<button class="ui primary button" onclick="monacoEditor.setValue(examples['${i}'])">${i}</button>
</div>
`

menu.innerHTML = html + menu.innerHTML

