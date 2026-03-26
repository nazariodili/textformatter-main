# Guida super semplice (passo passo)

Questa guida ti accompagna come un piccolo tutor. Non serve sapere programmare.

---

## 1) Cosa ti serve prima di iniziare

- Un computer
- L’app **Figma Desktop** (quella da installare)
- Una connessione Internet

Se non hai Figma Desktop, installala prima.

---

## 2) Metti il plugin dentro Figma (modalità prova)

1. Apri **Figma Desktop**.
2. Apri un file qualsiasi (anche vuoto).
3. In alto vai su **Plugins → Development → Import new plugin from manifest…**.
4. Scegli questo file dal tuo computer:

```
/Users/nazariodiliberto/Sviluppo/textformatter-main/figma-plugin/manifest.json
```

5. Ora il plugin è dentro Figma (ma solo in prova).

---

## 3) Avvia il plugin

1. In Figma vai su **Plugins → Development**.
2. Clicca **Text Formatter**.
3. Si apre la finestra del plugin.

---

## 4) Prova le funzioni sul canvas (facile)

1. Nel canvas di Figma, seleziona un **testo**.
2. Nel plugin premi **Import from selection**.
3. Il testo entra nel plugin.
4. Fai una modifica (esempio: usa un bottone di trasformazione).
5. Premi **Apply to selection**.
6. Il testo nel canvas si aggiorna.

---

## 5) Pubblicare il plugin (per tutti)

Prima di pubblicare devi:

- Avere **Figma Desktop**
- Attivare la **verifica in 2 passaggi (2FA)** sul tuo account Figma

Poi:

1. Apri Figma Desktop.
2. Vai su **Plugins → Manage plugins**.
3. Trova **Text Formatter**.
4. Clicca i tre puntini **⋯** vicino al nome.
5. Scegli **Publish**.
6. Compila i campi (nome, descrizione, categoria).
7. Invia.

Ora il plugin va in **revisione**. Figma ti scrive una email quando finisce.

---

## 6) Se qualcosa non funziona

- Chiudi e riapri Figma.
- Controlla di aver scelto il file giusto (`manifest.json`).
- Riprova a importare il plugin.

---

## 7) Piccolo promemoria finale

- **Development** = prova solo per te
- **Publish** = visibile a tutti

---

Se vuoi, posso anche creare una versione con immagini e frecce per renderla ancora più semplice.
