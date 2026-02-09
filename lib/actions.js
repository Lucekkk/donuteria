"use server";
import argon2 from "argon2";
import { getUsers } from "@/app/api/getUsers/route";
import { sendRegisterInfo } from "@/app/api/register/route";
import { sendNewOrder } from "@/app/api/order/route";
import { redirect } from "next/navigation";
import { editUser } from "@/app/api/editUserData/route";

const loginRegex = /^[a-zA-Z0-9_.-]{1,35}$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;
const textLengthRegex = /^[\p{L}\p{N}\p{P}\p{S} ]{1,65}$/u;
const phoneRegex = /^(\d{3}\s?){2}\d{3}$/;
const postalCodeRegex = /^\d{2}-\d{3}$/;

function isInvalidText(text) {
  return !text || text.trim() === "";
}

function isValidLogin(login) {
  return loginRegex.test(login);
}

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return passwordRegex.test(password);
}

function isValidText(text) {
  return textLengthRegex.test(text);
}

function isValidPhoneNumber(phoneNumber) {
  return phoneRegex.test(phoneNumber);
}

function isValidPostalCode(postalCode) {
  return postalCodeRegex.test(postalCode);
}

function randomBigInt26Digits() {
  let result = String(Math.floor(Math.random() * 9) + 1);

  for (let i = 0; i < 25; i++) {
    result += Math.floor(Math.random() * 10);
  }

  return BigInt(result);
}

function drawRandomBankName() {
  const bankNames = [
    "PKO Bank Polski (PKO BP)",
    "Bank Pekao S.A.",
    "Santander Bank Polska",
    "ING Bank Śląski",
    "mBank",
    "BNP Paribas Bank Polska",
    "Bank Millennium",
    "Alior Bank",
    "VeloBank",
    "Credit Agricole Bank Polska",
  ];

  const index = Math.floor(Math.random() * (bankNames.length - 1));

  return bankNames[index];
}

export async function registerUser(prevState, formData) {
  // await new Promise (resolve => setTimeout(resolve, 5000));
  const users = await getUsers();

  const newUser = {
    login: formData.get("login"),
    email: formData.get("email"),
    password_hash: formData.get("password"),
    isChecked: formData.get("regulations") === "on",
  };

  if (
    isInvalidText(newUser.login) ||
    isInvalidText(newUser.email) ||
    isInvalidText(newUser.password_hash)
  ) {
    return {
      message: "Uzupełnij dane",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  if (!isValidLogin(newUser.login)) {
    return {
      message: "Login musi mieć długość między 1 a 35 znaków",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  const loginTaken = await users.some(
    (user) => user.login === newUser.login.trim(),
  );
  if (loginTaken) {
    return {
      message: "Nazwa loginu jest już zarezerowana",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  if (!isValidEmail(newUser.email)) {
    return {
      message: "Wpisz poprawny email",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  const emailTaken = await users.some(
    (user) => user.email === newUser.email.trim(),
  );
  if (emailTaken) {
    return {
      message: "Ten email jest już zajęty",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  if (!isValidPassword(newUser.password_hash)) {
    return {
      message:
        "Hasło musi mieć od 8 do 20 znaków, oraz posiadać jedną cyfrę i jedną, wielką literę",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  if (!newUser.isChecked) {
    return {
      message: "Zaznacz, że zapoznałeś się z regulaminem",
      values: {
        login: newUser.login || "",
        email: newUser.email || "",
        password_hash: newUser.password_hash || "",
        isChecked: newUser.isChecked || false,
      },
    };
  }

  const hash = await argon2.hash(newUser.password_hash, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
    encoding: "utf-8",
  });

  newUser.password_hash = hash;

  await sendRegisterInfo(newUser);
  redirect("/rejestracja/register-done");
}

export async function loginUser(prevState, formData) {
  const users = await getUsers();

  const loggedUser = {
    email: formData.get("email"),
    password_hash: formData.get("password"),
    isChecked: formData.get("rememberMe") === "on",
  };

  if (
    isInvalidText(loggedUser.email) ||
    isInvalidText(loggedUser.password_hash)
  ) {
    return {
      message: "Uzupełnij dane",
      values: {
        email: loggedUser.email || "",
        password_hash: loggedUser.password_hash || "",
        isChecked: loggedUser.isChecked || false,
      },
    };
  }

  const foundUser = await users.find((user) => user.email === loggedUser.email);

  if (!foundUser) {
    return {
      message: "Wprowadzone dane użytkownika są niepoprawne",
      values: {
        email: loggedUser.email || "",
        password_hash: loggedUser.password_hash || "",
        isChecked: loggedUser.isChecked || false,
      },
    };
  }

  const valid = await argon2.verify(
    foundUser.password_hash,
    loggedUser.password_hash,
  );

  if (!valid) {
    return {
      message: "Wprowadzone dane użytkownika są niepoprawne",
      values: {
        email: loggedUser.email || "",
        password_hash: loggedUser.password_hash || "",
        isChecked: loggedUser.isChecked || false,
      },
    };
  }

  // Import auth functions
  const { generateToken, setAuthCookie } = await import("./auth");

  // Generate and set token
  const token = await generateToken(
    {
      userId: foundUser.id,
      email: foundUser.email,
      login: foundUser.login,
      role: foundUser.rola,
      donutPoints: foundUser.punkty
    },
    loggedUser.isChecked,
  );

  await setAuthCookie(token, loggedUser.isChecked);

  redirect(`/profil/${foundUser.id}`);
}

export async function cartSummary(prevState, formData) {
  const clientFormOrder = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    street: formData.get("street"),
    town: formData.get("town"),
    postalCode: formData.get("postalCode"),
    deliveryMethod: formData.get("deliveryMethod"),
    payMethod: formData.get("payMethod"),
    isChecked: formData.get("regulations") === "on",
    isCheckedNewsletter: formData.get("newsletter") === "on",
    totalPrice: (formData.get("totalPrice") * 1).toFixed(2) * 1,
    userId: formData.get("userId") || null,
    cart: JSON.parse(formData.get("cart")),
  };

  // console.log(clientFormOrder.cart.length);

  if (
    isInvalidText(clientFormOrder.name) ||
    isInvalidText(clientFormOrder.surname) ||
    isInvalidText(clientFormOrder.email) ||
    isInvalidText(clientFormOrder.phoneNumber) ||
    isInvalidText(clientFormOrder.street) ||
    isInvalidText(clientFormOrder.town) ||
    isInvalidText(clientFormOrder.postalCode) ||
    isInvalidText(clientFormOrder.deliveryMethod) ||
    isInvalidText(clientFormOrder.payMethod)
  ) {
    return {
      message: "Uzupełnij dane",
      values: {
        name: clientFormOrder.name || "",
        surname: clientFormOrder.surname || "",
        email: clientFormOrder.email || "",
        phoneNumber: clientFormOrder.phoneNumber || "",
        street: clientFormOrder.street || "",
        town: clientFormOrder.town || "",
        postalCode: clientFormOrder.postalCode || "",
        deliveryMethod: clientFormOrder.deliveryMethod || "",
        payMethod: clientFormOrder.payMethod || "",
        isChecked: clientFormOrder.isChecked || false,
        isCheckedNewsletter: clientFormOrder.isCheckedNewsletter || false,
      },
    };
  }
  if (
    !isValidText(clientFormOrder.name) ||
    !isValidText(clientFormOrder.surname) ||
    !isValidText(clientFormOrder.street) ||
    !isValidText(clientFormOrder.town)
  ) {
    return {
      message: "Nieodpowiednia długość znaków",
      values: {
        name: clientFormOrder.name || "",
        surname: clientFormOrder.surname || "",
        email: clientFormOrder.email || "",
        phoneNumber: clientFormOrder.phoneNumber || "",
        street: clientFormOrder.street || "",
        town: clientFormOrder.town || "",
        postalCode: clientFormOrder.postalCode || "",
        deliveryMethod: clientFormOrder.deliveryMethod || "",
        payMethod: clientFormOrder.payMethod || "",
        isChecked: clientFormOrder.isChecked || false,
        isCheckedNewsletter: clientFormOrder.isCheckedNewsletter || false,
      },
    };
  }

  if (!isValidEmail(clientFormOrder.email)) {
    return {
      message: "Wpisz poprawny email",
      values: {
        name: clientFormOrder.name || "",
        surname: clientFormOrder.surname || "",
        email: clientFormOrder.email || "",
        phoneNumber: clientFormOrder.phoneNumber || "",
        street: clientFormOrder.street || "",
        town: clientFormOrder.town || "",
        postalCode: clientFormOrder.postalCode || "",
        deliveryMethod: clientFormOrder.deliveryMethod || "",
        payMethod: clientFormOrder.payMethod || "",
        isChecked: clientFormOrder.isChecked || false,
        isCheckedNewsletter: clientFormOrder.isCheckedNewsletter || false,
      },
    };
  }

  if (!isValidPhoneNumber(clientFormOrder.phoneNumber)) {
    return {
      message: "Wpisz poprawny numer telefonu",
      values: {
        name: clientFormOrder.name || "",
        surname: clientFormOrder.surname || "",
        email: clientFormOrder.email || "",
        phoneNumber: clientFormOrder.phoneNumber || "",
        street: clientFormOrder.street || "",
        town: clientFormOrder.town || "",
        postalCode: clientFormOrder.postalCode || "",
        deliveryMethod: clientFormOrder.deliveryMethod || "",
        payMethod: clientFormOrder.payMethod || "",
        isChecked: clientFormOrder.isChecked || false,
        isCheckedNewsletter: clientFormOrder.isCheckedNewsletter || false,
      },
    };
  }

  if (!isValidPostalCode(clientFormOrder.postalCode)) {
    return {
      message: "Wpisz poprawny kod pocztowy",
      values: {
        name: clientFormOrder.name || "",
        surname: clientFormOrder.surname || "",
        email: clientFormOrder.email || "",
        phoneNumber: clientFormOrder.phoneNumber || "",
        street: clientFormOrder.street || "",
        town: clientFormOrder.town || "",
        postalCode: clientFormOrder.postalCode || "",
        deliveryMethod: clientFormOrder.deliveryMethod || "",
        payMethod: clientFormOrder.payMethod || "",
        isChecked: clientFormOrder.isChecked || false,
        isCheckedNewsletter: clientFormOrder.isCheckedNewsletter || false,
      },
    };
  }

  const donutsPoints = (clientFormOrder.totalPrice / 5).toFixed() * 1;
  clientFormOrder.donutsPoints = donutsPoints;

  const clientID = Date.now();
  clientFormOrder.clientID = clientID;

  const accountNumber = randomBigInt26Digits().toString();
  clientFormOrder.accountNumber = accountNumber;

  const bankName = drawRandomBankName();
  clientFormOrder.bankName = bankName;

  clientFormOrder.addressID = clientID + 1;
  clientFormOrder.orderID = clientID + 2;

  clientFormOrder.orderStatus = "Wysłane";

  clientFormOrder.invoiceNumber = (clientID + 3).toString().substring(5);

  clientFormOrder.productsInCartID = clientID + 4;
  //  console.log(clientFormOrder);
  await sendNewOrder(clientFormOrder);
  redirect("/koszyk/podsumowanie-platnosci/platnosc-udana");
}

export async function editUserData(prevState, formData) {
  const editUserForm = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    street: formData.get("street"),
    town: formData.get("town"),
    postalCode: formData.get("postalCode"),
    clientID: formData.get("clientID") * 1,
    userID: formData.get("userID") * 1,
  };
  // console.log(editUserForm)

  if (
    isInvalidText(editUserForm.name) ||
    isInvalidText(editUserForm.surname) ||
    isInvalidText(editUserForm.email) ||
    isInvalidText(editUserForm.phoneNumber) ||
    isInvalidText(editUserForm.street) ||
    isInvalidText(editUserForm.town) ||
    isInvalidText(editUserForm.postalCode)
  ) {
    return {
      message: "Uzupełnij dane",
      values: {
        name: editUserForm.name || "",
        surname: editUserForm.surname || "",
        email: editUserForm.email || "",
        phoneNumber: editUserForm.phoneNumber || "",
        street: editUserForm.street || "",
        town: editUserForm.town || "",
        postalCode: editUserForm.postalCode || "",
      },
    };
  }

  if (
    !isValidText(editUserForm.name) ||
    !isValidText(editUserForm.surname) ||
    !isValidText(editUserForm.street) ||
    !isValidText(editUserForm.town)
  ) {
    return {
      message: "Nieodpowiednia długość znaków",
      values: {
        name: editUserForm.name || "",
        surname: editUserForm.surname || "",
        email: editUserForm.email || "",
        phoneNumber: editUserForm.phoneNumber || "",
        street: editUserForm.street || "",
        town: editUserForm.town || "",
        postalCode: editUserForm.postalCode || "",
      },
    };
  }

  if (!isValidEmail(editUserForm.email)) {
    return {
      message: "Wpisz poprawny email",
      values: {
        name: editUserForm.name || "",
        surname: editUserForm.surname || "",
        email: editUserForm.email || "",
        phoneNumber: editUserForm.phoneNumber || "",
        street: editUserForm.street || "",
        town: editUserForm.town || "",
        postalCode: editUserForm.postalCode || "",
      },
    };
  }

  if (!isValidPhoneNumber(editUserForm.phoneNumber)) {
    return {
      message: "Wpisz poprawny numer telefonu",
      values: {
        name: editUserForm.name || "",
        surname: editUserForm.surname || "",
        email: editUserForm.email || "",
        phoneNumber: editUserForm.phoneNumber || "",
        street: editUserForm.street || "",
        town: editUserForm.town || "",
        postalCode: editUserForm.postalCode || "",
      },
    };
  }

  if (!isValidPostalCode(editUserForm.postalCode)) {
    return {
      message: "Wpisz poprawny kod pocztowy",
      values: {
        name: editUserForm.name || "",
        surname: editUserForm.surname || "",
        email: editUserForm.email || "",
        phoneNumber: editUserForm.phoneNumber || "",
        street: editUserForm.street || "",
        town: editUserForm.town || "",
        postalCode: editUserForm.postalCode || "",
      },
    };
  }

  editUser(editUserForm);
  redirect("/profil/3");
}
