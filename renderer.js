/*
  It is not possible to access the Node.js APIs directly from the renderer process
*/

const information = document.getElementById("info");
console.log(information);
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()})`;

const func = async () => {
  const response = await versions.ping();
  console.log(response);
};

func();
