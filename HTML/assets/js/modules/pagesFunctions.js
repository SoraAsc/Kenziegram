export function ChangeScroolVisibility(comp){
    const body = document.body;
    if(comp.className.indexOf('hidden')>0){   
        body.style.height = '';
        body.style.overflowY = '';
    }
    else {
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';
    }
}

