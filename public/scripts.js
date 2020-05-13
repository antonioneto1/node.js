const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json())
  console.log(res);
  res.urls.map(({name, url}) => addElement({name, url}))
}

async function deleted() {
    const res = await fetch("http://localhost:3000/del").then((data) => data.json())
    // console.log(res);
    res.urls.map(({name, url}) => delete({name, url}))
  }

//    function salved() {
//     const res = fetch("http://localhost:3000/").then((data) => data.json())
//     console.log(res);
//     res.urls.map(({name, url}) => push({name, url}))
//   }


load();

// saved();
function addElement({ name, url }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");
//   salved();

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el) {
  if (confirm("Tem certeza que deseja deletar?")) el.parentNode.remove();
  deleted();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  addElement({ name, url });

  input.value = "";
});
