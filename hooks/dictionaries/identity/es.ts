import { IdentityText } from "@/types/i18n.types";

const identity: IdentityText = {
  signIn: "Entrar",
  titleLead: "Tu ",
  titleMark: "clave",
  intro: "Sin correo, sin cuenta y sin contraseña en nuestro lado. Tu clave vive en tu dispositivo y firma lo que publicas.",
  walletTitle: "Conectar una wallet",
  walletBody: "Misma wallet, misma clave en cualquier dispositivo. Firmas un mensaje en tu wallet; no se envía a ningún sitio y no cuesta nada.",
  walletButton: "Conectar wallet",
  localTitle: "Clave local",
  localBody: "Se crea una clave nueva en este navegador. Descarga una copia cifrada para volver desde otro dispositivo o navegador.",
  localButton: "Crear clave local",
  restoreTitle: "Restaurar una copia",
  restoreBody: "Pega tu copia cifrada (ncryptsec…) con su contraseña, o una clave sin cifrar (nsec…).",
  restorePlaceholder: "ncryptsec1… o nsec1…",
  openFile: "Abrir archivo de copia",
  password: "Contraseña de la copia",
  restoreButton: "Restaurar",
  signedAs: "Has entrado como",
  kindWallet: "Clave de wallet",
  kindLocal: "Clave local",
  backupTitle: "Copia cifrada",
  backupBody: "Elige una contraseña y descarga tu clave. Sin este archivo y su contraseña no podrás recuperar esta clave.",
  backupButton: "Descargar copia",
  signOut: "Salir",
  signOutWarn: "Una clave local sin copia se pierde para siempre al salir.",
  needIdentity: "Entra para publicar un anuncio.",
  working: "Esperando a tu wallet…",
  errors: {
    generic: "Algo ha fallado. Inténtalo de nuevo.",
    noWallet: "No hay ninguna wallet en este navegador.",
    rejected: "Se canceló la petición de la wallet.",
    backup: "Esa copia o contraseña no es válida.",
    password: "Usa una contraseña de al menos 8 caracteres.",
  },
};

export default identity;
