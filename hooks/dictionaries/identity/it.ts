import { IdentityText } from "@/types/i18n.types";

const identity: IdentityText = {
  signIn: "Entra",
  titleLead: "La tua ",
  titleMark: "chiave",
  intro: "Niente email, niente account e nessuna password da parte nostra. La tua chiave vive sul tuo dispositivo e firma ciò che pubblichi.",
  walletTitle: "Collega un wallet",
  walletBody: "Stesso wallet, stessa chiave su qualsiasi dispositivo. Firmi un messaggio nel wallet; non viene inviato da nessuna parte e non costa nulla.",
  walletButton: "Collega wallet",
  localTitle: "Chiave locale",
  localBody: "In questo browser viene creata una chiave nuova. Scarica un backup cifrato per tornare da un altro dispositivo o browser.",
  localButton: "Crea chiave locale",
  restoreTitle: "Ripristina un backup",
  restoreBody: "Incolla il tuo backup cifrato (ncryptsec…) con la sua password, oppure una chiave in chiaro (nsec…).",
  restorePlaceholder: "ncryptsec1… o nsec1…",
  openFile: "Apri file di backup",
  password: "Password del backup",
  restoreButton: "Ripristina",
  signedAs: "Sei entrato come",
  kindWallet: "Chiave del wallet",
  kindLocal: "Chiave locale",
  backupTitle: "Backup cifrato",
  backupBody: "Scegli una password e scarica la tua chiave. Senza questo file e la password non potrai recuperare questa chiave.",
  backupButton: "Scarica backup",
  signOut: "Esci",
  signOutWarn: "Una chiave locale senza backup va persa per sempre quando esci.",
  needIdentity: "Entra per pubblicare un annuncio.",
  working: "In attesa del tuo wallet…",
  errors: {
    generic: "Qualcosa è andato storto. Riprova.",
    noWallet: "Nessun wallet trovato in questo browser.",
    rejected: "La richiesta al wallet è stata annullata.",
    backup: "Backup o password non validi.",
    password: "Usa una password di almeno 8 caratteri.",
  },
};

export default identity;
