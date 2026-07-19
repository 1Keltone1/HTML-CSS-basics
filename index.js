console.log('Скрипт загружен!');

const markdown = document.getElementById("markdown-input");
const raw = document.getElementById("html-output");
const preview = document.getElementById("preview");
const h3Regex = /^\s{0,}### (.*)/gm;
const h2Regex = /^\s{0,}## (.*)/gm;
const h1Regex = /^\s{0,}# (.*)/gm;
const boldRegex = /\*\*(.*)\*\*|__(.*)__/g;
const emRegex = /\*(.*)\*|_(.*)_/g;
const imgRegex = /!\[(?<alt>.*?)\]\((?<link>.*?)\)/g;
const linkRegex = /\[(?<text>.*?)\]\((?<url>.*?)\)/g;
const quoteRegex = /^\s{0,}> (.*)/gm;

console.log('markdown:', markdown);
console.log('raw:', raw);
console.log('preview:', preview);

function convertMarkdown() {
    let result = markdown.value.slice();
    result = result.replaceAll(h3Regex, `<h3>$1</h3>`).replaceAll(h2Regex, `<h2>$1</h2>`).replaceAll(h1Regex, `<h1>$1</h1>`);
    result = result.replaceAll(boldRegex, `<strong>$1$2</strong>`);   
    result = result.replaceAll(emRegex, `<em>$1$2</em>`);
    result = result.replaceAll(imgRegex, `<img alt="$<alt>" src="$<link>">`);
    result = result.replaceAll(linkRegex, `<a href="$<url>">$<text></a>`);
    result = result.replaceAll(quoteRegex, `<blockquote>$1</blockquote>`);

    return result;
}

markdown.addEventListener("input", () => {
    raw.textContent = convertMarkdown();
    preview.innerHTML = convertMarkdown();
})
