let qs = el => document.querySelector(el);
let qsa = el => document.querySelectorAll(el);

//Ação para visualizar senha digitada
qs('#showPass').addEventListener('click', e => {
    elPass = e.target;
    let inputPass = qs('#senha');
    if(inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text');
        elPass.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inputPass.setAttribute('type', 'password');
        elPass.classList.replace('fa-eye-slash','fa-eye');
    }
});

//Validador dos inputs
let validator = {
    handleSubmit: event => {
       event.preventDefault(); 
        let send = true;

        let inputs = form.querySelectorAll('input');

        for(let i=0; i<inputs.length;i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check) {
                send = false;
                // Exibir o erro
                console.log(check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput: input => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return `Campo não pode ser vazio!`;
                        }
                    break;
                    case 'min':

                    break;
                }
            }
        }

        return true;
    }
};

let form = qs('#formValidator');
form.addEventListener('submit', validator.handleSubmit);

