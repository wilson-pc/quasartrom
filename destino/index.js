const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // y carga el  index.html de la aplicación.
  win.loadFile("render/index.html");
  //win.loadURL("http://localhost:8080/#/");
}

app.whenReady().then(createWindow);
