(function(updateContentSelector){
  var socket = new WebSocket('ws://localhost:8080');
  var body = document.querySelector(updateContentSelector);
  var deboucing = false;

  socket.onopen = function(e) {
    console.log('[open] Connection established');
    console.log('Sending to server');
    socket.send(`UI client is connected!`);
  };

  socket.onmessage = function(e) {
    var obj = JSON.parse(e.data);
    var isHtml = obj.filename.split('.')[1] === 'html';
    var isJs = obj.filename.split('.')[1] === 'js';

    if(body) {
      if(isHtml) return body.innerHTML = obj.content;
      if(isJs) {
        if(deboucing) return;

        var oldScriptTag = document.querySelector('[data-type="injected-script"]');
        if(oldScriptTag) oldScriptTag.remove();
        deboucing = true;
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('data-type', 'injected-script');
        
        scriptTag.innerText = obj.content;
        
        //scriptTag.setAttribute('src', 'http://localhost:8080/app/test.js');
        body.appendChild(scriptTag);

        setTimeout(() => {
          deboucing = false;
        }, 200);
      }
    } else {
      //console.log(body);
    }
  };
  
  console.clear();
}('body'))