const fetch = require("node-fetch");

const peoples = [];
const namesForRequests = [];
const names = [];
const height = [];
let namesForConsole;

start();

async function start() {
  await request();
  if (peoples.length !== 0) {
    sortArray();
    EliminatDuplicateNames();
    writeInformationInConsole();
  }
}

async function request() {
  let requests;
  if (process.argv.length === 2) {
    console.warn("write an a list of people");
    process.kill(process.pid);
  }
  for (let i = 2; i < process.argv.length + 1; i++) {
    if (process.argv[i] !== undefined) {
      namesForRequests.push(process.argv[i]);
    }
  }
  if (namesForRequests.length === process.argv.length - 2) {
    requests = namesForRequests.map(async (name) => {
      return await fetch(`https://swapi.dev/api/people/?search=${name}`).then((response) => {
        return response.json();
      });
    });
  }
  await Promise.all(requests).then((datas) => {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].count === 0) {
        console.log(`No results found for ${namesForRequests[i]}`);
      } else {
        datas[i].results.forEach((data) => {
          peoples.push(data);
        });
      }
    }
  });
}

function sortArray() {
  peoples.forEach((el) => {
    height.push(el);
    names.push(" " + el.name);
  });
  height.sort((a, b) => a.height - b.height);
  names.sort();
}

function EliminatDuplicateNames() {
  namesForConsole = names.filter((name, index) => names.indexOf(name) == index);
}

function writeInformationInConsole() {
  console.log(`Total results: ${namesForConsole.length}`);
  console.log(`All:${namesForConsole}`);
  console.log(`Min height: ${height[0].name}, ${height[0].height} cm`);
  console.log(`Max height: ${height[height.length - 1].name}, ${height[height.length - 1].height} cm`);
}
