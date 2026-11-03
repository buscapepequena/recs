import { IdentityText } from "@/types/i18n.types";

const identity: IdentityText = {
  signIn: "Sign in",
  titleLead: "Your ",
  titleMark: "key",
  intro: "No email, no account, no password on our side. Your key lives on your device and signs what you publish.",
  walletTitle: "Connect a wallet",
  walletBody: "Same wallet, same key on any device. You sign one message in your wallet; nothing is sent anywhere and it costs nothing.",
  walletButton: "Connect wallet",
  localTitle: "Local key",
  localBody: "A new key is created in this browser. Download an encrypted backup to come back from another device or browser.",
  localButton: "Create local key",
  restoreTitle: "Restore a backup",
  restoreBody: "Paste your encrypted backup (ncryptsec…) with its password, or a raw key (nsec…).",
  restorePlaceholder: "ncryptsec1… or nsec1…",
  openFile: "Open backup file",
  password: "Backup password",
  restoreButton: "Restore",
  signedAs: "Signed in as",
  kindWallet: "Wallet key",
  kindLocal: "Local key",
  backupTitle: "Encrypted backup",
  backupBody: "Choose a password and download your key. Without this file and password you cannot get this key back.",
  backupButton: "Download backup",
  signOut: "Sign out",
  signOutWarn: "A local key without a backup is lost for good when you sign out.",
  needIdentity: "Sign in to publish a listing.",
  working: "Waiting for your wallet…",
  errors: {
    generic: "Something went wrong. Try again.",
    noWallet: "No wallet found in this browser.",
    rejected: "The wallet request was cancelled.",
    backup: "That backup or password is not valid.",
    password: "Use a password of at least 8 characters.",
  },
};

export default identity;
