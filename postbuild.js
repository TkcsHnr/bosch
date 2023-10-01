import { readFile, writeFile } from "fs";

const file = ".svelte-kit/output/server/entries/pages/_page.svelte.js";

readFile(file, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = 
    data.replace(new RegExp("three/examples/jsm/loaders/DRACOLoader", 'g'), "three/examples/jsm/loaders/DRACOLoader.js")
    .replace(new RegExp("three/examples/jsm/loaders/KTX2Loader", 'g'), "three/examples/jsm/loaders/KTX2Loader.js")
    .replace(new RegExp("three/examples/jsm/loaders/GLTFLoader", 'g'), "three/examples/jsm/loaders/GLTFLoader.js")
    .replace(new RegExp("three/examples/jsm/controls/OrbitControls", 'g'), "three/examples/jsm/controls/OrbitControls.js");

  writeFile(file, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
