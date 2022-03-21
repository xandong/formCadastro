const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#password-check");
const btnSend = document.querySelector("#btn-send");
const inputs = [username, email, password, passwordCheck];
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();
});

function checkInput() {
  console.log("Validando...");
  inputs.forEach((input) => {
    if (input.value == "") {
      setError(input, `Campo obrigatório.`);
    } else setSuccess(input);
  });

  if (!checkEmail(email.value)) setError(email, `Insira um email válido`);
  else setSuccess(email);

  if (password.value.length < 8)
    setError(password, `Deve conter no mínimo 8 caracteres.`);
  else setSuccess(password);

  if (!(passwordCheck.value === password.value)) {
    console.log(passwordCheck.value, password.value);
    setError(passwordCheck, `As senhas não coencidem.`);
  } else {
    let passwordParent = password.parentElement;
    if (passwordParent.className === "form-control error")
      setError(passwordCheck, `Campo de senha incorreto.`);
    else setSuccess(passwordCheck);
  }

  const formControls = form.querySelectorAll(".form-control");
  let formIsValid = [...formControls].every((formControl) => {
    return formControl.className != "form-control error";
  });
  send(formIsValid);
}

function setSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = "form-control success";
}

function setError(input, message) {
  let formControl = input.parentElement,
    small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function send(isValid) {
  if (isValid) form.innerHTML = "<h2>Conta cadastrada com sucesso!<h2>";
  else console.log("Erro ao cadastrar");
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
