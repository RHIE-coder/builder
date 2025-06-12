// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInIsolatedWorld(
    1004,
    'electron',
    {
      doThing: () => ipcRenderer.send('do-a-thing')
    }
  )