# meme lang

Meme-lang is a programming language that compiles to javascript. It runs in browser.

## How to use

You can use the [online version](http://sohamapps.rf.gd/memelang).

Alternatively,
1. Open [index.html](index.html) in browser.
2. Write meme-lang code in the left code-editor.
3. Click on the `Run` button to run the code.
4. The output will be shown in the right textarea.

If in doubt, just type normal javascript code, the autocomplete will help you.


## About
- This was made as a fun project. It was inspired by [bhai-lang](https://bhailang.js.org/). The idea of using Hindi instead of English is taken from that.

- Meme-lang additionally show memes if your code has errors.
e.g. `Syntax error` shows this famous meme "Kuch to gadbad hai Daya" from CID.

![this](memes/download.jpeg)

- The memes are taken from a simple google search.

## Features
- [x] Syntax highlighting
- [ ] Code formatting
- [x] Autocomplete
- [x] Error reporting
- [x] Meme reporting
- [ ] More syntax improvements

## How it works

- it replaces all the Hindi words with their corresponding javascript keywords
- some common code parts are also given a hindi word
	e.g. `i badhao` compiles to `i+=1`
- there are a few convenience functions:
	1. `print` - prints the argument to the output
	2. `input` - takes input from the user
	3. `inputf` - takes number input from the user
- there is a global variable `REPLY` which stores the input given by the user; `jo bhi` is an alias for `REPLY`
- usual javascript code can be intermixed with meme-lang code


## Example

- Hello world program in meme-lang
	```js
	bolo("Hello world")
	```
- A program to take input from the user and print it
	```js
	puchho("Enter your name")
	bolo("Hello ", jo bhi)
	```

## Credits

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Semantic UI](https://semantic-ui.com/)

## License

[MIT](LICENSE)

## Author

Soham Korade
