# estridpagels.dk

En statisk one-pager til Estrid — én fil, ingen database, intet CMS.
Layoutet følger samme opbygning som mariehost.dk (foto til venstre, kaps-titler,
stor display-serif, grå brødtekst, centreret indholdskolonne), men med eget indhold.

## Filer

```
estridpagels-site/
  index.html      ← hele siden: HTML + CSS + lidt JS i én fil
  billeder/       ← læg portrætterne her
  CNAME           ← fortæller GitHub Pages at siden bor på estridpagels.dk
  LÆSMIG.md       ← denne fil
```

## Sådan retter du teksten

Alt der skal udskiftes står i **kantede parenteser**: `[Din titel]`, `[Ydelse 1]` osv.
Åbn `index.html` i en teksteditor (VS Code, Notepad++ — ikke Word) og søg efter `[`.

Rækkefølge det giver mening at udfylde i:

1. `<title>` og `<meta name="description">` øverst — det er dét Google viser
2. Forsiden: eyebrow (titler), overskriften, de tre-fire linjer
3. Om Estrid
4. De tre ydelser — også i menuen, hvor der står `[Ydelse]`
5. Udvalgte opgaver
6. Citatet — slet hele `<section>`-blokken hvis der ikke er en anbefaling endnu
7. Kontakt: e-mail, LinkedIn, Instagram

## Billeder

Læg portrætterne i `billeder/` og udskift de to pladsholdere:

```html
<div class="photo-ph">EP</div>
```

med

```html
<img src="billeder/estrid.jpg" alt="Estrid Pagels">
```

Formatet er 4:5 (stående). Gem dem som JPG i ca. 1200×1500 px og under 400 kB —
større filer gør bare siden langsom.

## Kontaktformularen

Formularen sender via **Web3Forms**, som er gratis og ikke kræver en server.

1. Gå på [web3forms.com](https://web3forms.com), indtast Estrids e-mail, få en access key på mail
2. Find linjen `<input type="hidden" name="access_key" value="DIN-ACCESS-KEY">` i `index.html`
3. Indsæt nøglen i stedet for `DIN-ACCESS-KEY`

Beskederne lander derefter direkte i hendes indbakke. Formularen har en skjult fælde
for spam-robotter, og efter afsendelse sendes man tilbage til siden med en kvittering.

Vil I helt undgå formularen: slet `<form>`-blokken — e-mailadressen står stadig i højre spalte.

## Lægge siden online — GitHub Pages

Domænet er købt hos Simply (ca. 99 kr/år). Hosting, SSL og formular koster 0 kr.
Mappen her er allerede et git-repo med første commit.

### 1. Opret repoet på github.com

Nyt **offentligt** repo — GitHub Pages kræver det på gratis-planen.
Opret det tomt, uden README og uden .gitignore.

Kør derefter her i mappen:

```bash
git remote add origin https://github.com/<brugernavn>/estridpagels.git
git push -u origin main
```

### 2. Slå Pages til

Repoets **Settings → Pages**: Source = "Deploy from a branch", branch = `main`, mappe = `/ (root)`.
Under **Custom domain** skrives `estridpagels.dk`. Filen `CNAME` i repoet gør det samme
automatisk, så feltet skulle gerne være udfyldt i forvejen.

Sæt flueben i **Enforce HTTPS**, når GitHub har udstedt certifikatet (kan tage en times tid).

### 3. DNS hos Simply

I Simplys DNS-panel for `estridpagels.dk`:

| Type | Navn | Værdi |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `<brugernavn>.github.io` |

De fire A-poster dækker `estridpagels.dk` uden www, CNAME-posten dækker `www.estridpagels.dk`.
AAAA-posterne er IPv6 og kan udelades, men bør med.

Der går fra ti minutter til et døgn, før det slår igennem overalt.

### 4. Opdatere siden bagefter

```bash
git add -A
git commit -m "Rettet teksten"
git push
```

Siden er opdateret ca. et minut senere.

## Mail på domænet

Fravalgt — formularen leverer til `estridpagels@proton.me`, og der er
derfor intet at sætte op. Samme adresse står i højre spalte under Kontakt og i bunden.

Skifter I mening: enhver **betalt** Proton-plan understøtter eget domæne (den gratis gør ikke).
Proton udleverer MX-, SPF- og DKIM-poster, som skal ind i Simplys DNS-panel.
Vejledning: <https://proton.me/support/custom-domain>

## Sprogversion

Der ligger et `EN`-link i menuen som pladsholder. Skal der en engelsk udgave til,
er opskriften: kopiér `index.html` til `en/index.html`, oversæt teksten, og lad
de to sider linke til hinanden. Ellers slet linjen med `class="lang"`.

## Mørk baggrund

Siden følger automatisk brugerens systemindstilling, og der er en knap nederst til at
skifte manuelt. Skal siden altid være lys, sæt `<html lang="da" data-theme="light">`
og slet `@media (prefers-color-scheme: dark)`-blokken.
