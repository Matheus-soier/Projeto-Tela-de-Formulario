let qs = el => document.querySelector(el);
let qsa = el => document.querySelectorAll(el);

//Ação para visualizar senha digitada
qs('#showPass').addEventListener('click', e => {
    elPass = e.target;
    let inputPass = qs('#senha');
    
    if(inputPass.value !== '') {
        if(inputPass.type === 'password') {
            inputPass.setAttribute('type', 'text');
            elPass.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inputPass.setAttribute('type', 'password');
            elPass.classList.replace('fa-eye-slash','fa-eye');
        }
    }
});

//Validador dos inputs
let validator = {
    handleSubmit: event => {
       event.preventDefault(); 
        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors(inputs);

        for(let input of inputs) {
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                // Exibir o erro
                validator.showError(input, check);
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
                        if(input.value.length < rDetails[1]) {
                            return `Mínimo ${rDetails[1]} caracteres!`;
                        }
                    break;
                }
            }
        }

       return true;
    },
    showError: (input, error) => {
        input.style.borderColor = `#FF0000`;
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        if(input.type == 'text' || input.type == 'email') {
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
        } else if(input.type == 'password') {
        let divPass = qs('.password');
        divPass.parentElement.insertBefore(errorElement, divPass.ElementSibling);
        divPass.style.borderColor = `#FF0000`;
        }
    },
    clearErrors: (inputs) => {
       qsa('.error').forEach((e)=>{
            e.remove();
        });
        inputs.forEach((e)=>{
            e.style = ``;
        });
        qs('.password').style = ``;
    }
 };

let form = qs('#formValidator');
form.addEventListener('submit', validator.handleSubmit);

