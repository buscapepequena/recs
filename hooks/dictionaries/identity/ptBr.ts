import { IdentityText } from "@/types/i18n.types";

const identity: IdentityText = {
  signIn: "Entrar",
  titleLead: "Sua ",
  titleMark: "chave",
  intro: "Sem e-mail, sem conta e sem senha do nosso lado. Sua chave fica no seu dispositivo e assina o que você publica.",
  walletTitle: "Conectar uma carteira",
  walletBody: "Mesma carteira, mesma chave em qualquer dispositivo. Você assina uma mensagem na carteira; nada é enviado e não custa nada.",
  walletButton: "Conectar carteira",
  localTitle: "Chave local",
  localBody: "Uma chave nova é criada neste navegador. Baixe um backup criptografado para voltar de outro dispositivo ou navegador.",
  localButton: "Criar chave local",
  restoreTitle: "Restaurar um backup",
  restoreBody: "Cole seu backup criptografado (ncryptsec…) com a senha, ou uma chave sem criptografia (nsec…).",
  restorePlaceholder: "ncryptsec1… ou nsec1…",
  openFile: "Abrir arquivo de backup",
  password: "Senha do backup",
  restoreButton: "Restaurar",
  signedAs: "Você entrou como",
  kindWallet: "Chave da carteira",
  kindLocal: "Chave local",
  backupTitle: "Backup criptografado",
  backupBody: "Escolha uma senha e baixe sua chave. Sem este arquivo e a senha, não dá para recuperar esta chave.",
  backupButton: "Baixar backup",
  signOut: "Sair",
  signOutWarn: "Uma chave local sem backup se perde para sempre ao sair.",
  needIdentity: "Entre para publicar um anúncio.",
  working: "Aguardando sua carteira…",
  errors: {
    generic: "Algo deu errado. Tente de novo.",
    noWallet: "Nenhuma carteira encontrada neste navegador.",
    rejected: "O pedido da carteira foi cancelado.",
    backup: "Esse backup ou senha não é válido.",
    password: "Use uma senha de pelo menos 8 caracteres.",
  },
};

export default identity;
