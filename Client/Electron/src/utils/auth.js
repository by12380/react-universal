import querystring from 'querystring';
import url from 'url';

const remote = window.require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

export const webAuth = (authUrl, redirectUrl) => {
    
    return new Promise((resolve, reject) => {

        let win = new BrowserWindow({
            width: 350,
            height: 600,
            frame: true,
            resizable: false,
            autoHideMenuBar: true
        });

        try {
            let params = null;

            win.loadURL(authUrl);

            win.show();

            win.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
                if (newUrl.includes(redirectUrl)) {
                    const obj = url.parse(newUrl);
                    const hashParams = querystring.parse(obj.hash ? obj.hash.substring(1): null);
                    const queryParams = querystring.parse(obj.query);
                    params = {
                        ...hashParams,
                        ...queryParams
                    }
                    win.destroy();
                }
            })

            win.webContents.on('destroyed', () => {
                if (params) {
                    resolve({
                        type: 'success',
                        params
                    })
                }
                else
                {
                    resolve({
                        type: 'canceled'
                    })
                }
            })
        }
        catch (e)
        {
            win.destroy();
            reject(e);
        }

    })
}