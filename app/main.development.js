/**
 * @fileoverview
 *  This is the main process of the application, which spawns the renderer processes.
 *
 * @exitcode 16 - after the uncaughtException handler has run
 * @exitcode 17 - Pepper Flash Player plugin could not be found
 *
 * PS. Don't use flow here. Black magic.
 */
import {
  app,
  BrowserWindow,
  Menu,
  shell,
  ipcMain,
  TouchBar
} from 'electron';
import fs from 'fs';
import path from 'path';
import plist from 'plist';
import { reduce } from 'ramda';

import logger from './logger';
import { createTouchBar } from './modules/main';

logger.info('Starting application');

let menu;
let template;
let mainWindow = null;
let onlineStatusWindow = null;

// Load the Flash player plugin
logger.info('Checking for Pepper Flash Player plugin');

const libPath = path.resolve(__dirname, 'lib');
const pluginPath = path.resolve(libPath, 'PepperFlashPlayer.plugin');
const plistPath = path.resolve(pluginPath, 'Contents', 'Info.plist');
if (!fs.existsSync(pluginPath)) {
  logger.error('Could not find the Pepper Flash Player plugin.');
  // process.exit(17);
}
else {
  logger.info('Pepper Flash Player plugin found. Adding command-line switches.');
  logger.info('Figuring out Pepper Flash Player version');
  const { CFBundleVersion } = plist.parse(fs.readFileSync(plistPath, 'utf8'));
  logger.info(`Plugin version is ${CFBundleVersion}`);
  app.commandLine.appendSwitch('ppapi-flash-path', pluginPath);
  app.commandLine.appendSwitch('ppapi-flash-version', CFBundleVersion);
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS'
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  }
};

process.on('uncaughtException', err => {
  console.log(err.name);
  console.log(err.message);
  console.log(err.stack);
  logger.error('Process got an uncaught exception', { err });
  logger.error('Logging environment information', {
    config: process.config,
    memoryUsage: process.memoryUsage(),
    platform: process.platform,
    release: process.release,
    uptime: process.uptime(),
    versions: process.versions
  });
  process.exit(16);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error('Process got an unhandled rejection', { reason, p });
});

process.on('warning', w => {
  logger.warn('Process received warning', { name: w.name, message: w.message, stack: w.stack });
});

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    show: false,
    width: 1050,
    height: 970,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      experimentalFeatures: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
  const tb = new TouchBar([
    new TouchBarLabel({ label: 'jorma' })
  ]);

  mainWindow.setTouchBar(createTouchBar(TouchBar));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();

    mainWindow.webContents.send('app-paths',
      reduce(
        (o, p) => ({ ...o, [p]: app.getPath(p) }),
        {}, ['home', 'desktop', 'temp']));

    ipcMain.on('online-status', (event, msg) => {
      const { status } = msg;
      logger.info('status =', status);
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send('online-status', { status });
      }
    });

    onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });
    onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle logging failures and errors
  mainWindow.webContents.on('crashed', (event, killed) => {
    logger.error('Main window webContents crashed', { killed });
  });

  mainWindow.webContents.on('plugin-crashed', (event, name, version) => {
    logger.error('Plug-in in main window webContents crashed', { name, version });
  });

  mainWindow.on('unresponsive', e => {
    logger.warn('Main window unresponsive');
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
  else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
