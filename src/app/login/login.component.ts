import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Router } from "@angular/router";

export class LoginModel {
  email: string;
  senha: string;

  constructor() {
    this.email = "";
    this.senha = "";
  }
}

export class SignUpModel {
  nome: string;
  email: string;
  senha: string;

  constructor() {
    this.email = "";
    this.nome = "";
    this.senha = "";
  }
}

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  isFormCadastroVisible: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  cadastroForm = new FormGroup({
    nome: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    senha: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loginForm = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    senha: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private router: Router) {}

  onRegister() {
    const localUser = localStorage.getItem("usuarios");
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.cadastroForm.value);
      localStorage.setItem("usuarios", JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.cadastroForm.value);
      localStorage.setItem("usuarios", JSON.stringify(users));
    }
    alert("Registration Success");
  }

  onLogin() {
    const localUsers = localStorage.getItem("usuarios");
    if (localUsers != null) {
      const users = JSON.parse(localUsers);

      const isUserPresent = users.find(
        (user: SignUpModel) =>
          user.email == this.loginForm.get("email")?.getRawValue() &&
          user.senha == this.loginForm.get("senha")?.getRawValue()
      );

      if (isUserPresent != undefined) {
        alert("Usuário Logado...");
        localStorage.setItem("usuarioLogado", JSON.stringify(isUserPresent));
        this.router.navigateByUrl("/home");
      } else {
        alert("No User Found");
      }
    }
  }

  isInputValid(field: string, formName: string) {
    let control: AbstractControl<any, any> | null;
    if (formName === "cadastroForm") {
      control = this.cadastroForm.get(field);
    } else {
      control = this.loginForm.get(field);
    }

    if (control) {
      return control.invalid && control.touched;
    } else {
      return false;
    }
  }

  showCadastroForm() {
    if (this.isFormCadastroVisible) {
      this.loginForm.reset();
      this.isFormCadastroVisible = false;
    } else {
      this.cadastroForm.reset();
      this.isFormCadastroVisible = true;
    }
  }
}
