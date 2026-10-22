// ==UserScript==
// @name         voxco-session-reconnect
// @version      0.0.2
// @description  Restore page
// @author       loke/kriby5y
// @match        *://*/voxco.agent/FrameLayout.aspx
// @grant        none
// @namespace    https://github.com/kriby5y/voxco-session-reconnect
// @homepage     https://github.com/kriby5y/voxco-session-reconnect

// @downloadURL  https://raw.githubusercontent.com/kriby5y/voxco-session-reconnect/main/voxco-session-reconnect.js
// @updateURL    https://raw.githubusercontent.com/kriby5y/voxco-session-reconnect/main/voxco-session-reconnect.js
// ==/UserScript==

(function() {
    'use strict';
    // Check running
    console.log("Running")
	const website = new URL(window.location.href).origin;
	
    // save intweb.dll request load
    let lastpayload=null;
    let fixcount=0;

    // check every 5 seconds
    const timer = setInterval(() => {
        let currform=null;

        //Navigate page
        const f1 = document.querySelector("#fm");
        const f2 = f1.querySelector("#fmP");
        const f3 = f2.querySelector("#fm0");
        const f4 = f3.querySelector("#fs");
        const f5 = f4.querySelector("#f2");
        //const doc = f5.contentDocument || f5.contentWindow.document;
        //console.log("inner"+doc.body.innerHTML);
        try{
            //Check for document, if error attempt to reconnect
            const doc = f5.contentDocument || f5.contentWindow.document;
			console.log("content found")
            //console.log(doc.childElementCount);
			// check for blank response by. Checking for any child element in intweb.dll twice
            if (doc.childElementCount>=1){
                fixcount=0
            }else{
                fixcount=fixcount+1
                if (fixcount>=2){
                    console.log("Content Missing")
					console.log("Content Missing")
                    console.log(`Attempt to reload:${website}/Survey/intweb.dll?${lastpayload}`);
                    f5.src = `${website}/Survey/intweb.dll?${lastpayload}`;
					console.log("inner"+doc.body.innerHTML)
                }
            }
            try{
				//check for INTWEB, if found save last payload else ignore
                currform = f5.contentWindow.document.querySelector("form[name='INTWEB']");
                currform.addEventListener('submit', function() {
                    console.log("INTWEB submitted");
                    const body = new URLSearchParams(
                        new FormData(currform)
                    ).toString();
                    lastpayload=body
                    console.log(body);
                });
            }catch(e){
            }
        }catch(e){
			console.log("Content Missing")
            console.log(`Attempt to reload:${website}/Survey/intweb.dll?${lastpayload}`);
            f5.src = `${website}/Survey/intweb.dll?${lastpayload}`;
        }finally{
        }
    }, 3000);
})();
