# estridpagels.dk

En lille statisk side til Estrid — to sider, ingen database, intet CMS.

## Om designet

Formen er bevidst lagt tæt op ad **mariehost.dk**: fast menu på 57 px, hero i to lige
spalter à 456 px med 48 px imellem, foto til venstre i forholdet 456:578, og til højre
spærret eyebrow, Playfair Display i vægt 900 på 60/75 px og grå brødtekst.

Det er *formen*, der er lånt. Kode, tekst og billeder er vores egne — der er ikke
kopieret filer, formuleringer eller fotos fra den side. Marie Høst er en navngiven
dansk journalist, så slægtskabet er værd at være bevidst om, hvis siden en dag skal
have sit eget udtryk.

## Filer

```
estridpagels-site/
  index.html       ← forsiden + kontaktformularen
  donorbarn.html   ← siden om Donorbarn (ikke udgivet endnu)
  stil.css         ← fælles stilark for begge sider
  billeder/        ← læg evt. fotos her
  CNAME            ← fortæller GitHub Pages at siden bor på estridpagels.dk
  LÆSMIG.md        ← denne fil
```

Rettelser i `stil.css` slår igennem på begge sider. Åbn filerne i en teksteditor
(VS Code, Notepad++ — ikke Word).

## Sådan opdaterer du siden

```bash
git add -A
git commit -m "Rettet teksten"
git push
```

Siden er opdateret ca. et minut senere.

Bemærk: push kræver de to miljøvariabler herunder, ellers nægter Windows'
credential-manager at spørge om login:

```powershell
$env:GCM_INTERACTIVE="true"; $env:GIT_TERMINAL_PROMPT="1"; git push
```

## Donorbarn-siden

Teksten er ikke udgivet endnu, så siden siger indtil videre bare det.
To ting at gøre, når den skal offentliggøres:

1. Skriv teksten ind i `<div class="tekst">` i `donorbarn.html`
2. Slet linjen `<meta name="robots" content="noindex">` i toppen — den holder
   siden ude af Google, så længe den ikke er klar

Fjern også `<p class="status">Ikke udgivet endnu</p>`, når det ikke passer længere.

## Kontaktformularen

Formularen sender via **Web3Forms**, som er gratis og ikke kræver en server.
**Den virker ikke, før nøglen er sat ind.**

1. Gå på [web3forms.com](https://web3forms.com), indtast `estridpagels@proton.me`,
   få en access key på mail
2. Find linjen `<input type="hidden" name="access_key" value="DIN-ACCESS-KEY">` i `index.html`
3. Indsæt nøglen i stedet for `DIN-ACCESS-KEY`

Beskederne lander derefter direkte i indbakken. Formularen har en skjult fælde
for spam-robotter, og efter afsendelse sendes man tilbage til forsiden med en kvittering.

E-mailadressen står også i højre spalte, så man kan skrive direkte.

## Billeder

Skal der et portræt på forsiden, læg det i `billeder/` og indsæt i `index.html`:

```html
<img src="billeder/estrid.jpg" alt="Estrid Pagels">
```

Gem det som JPG i ca. 1200×1500 px og under 400 kB — større filer gør siden langsom.

## Hosting og domæne

| Post | Pris |
|---|---|
| Domæne hos Simply | ca. 99 kr/år |
| Hosting (GitHub Pages) | 0 kr |
| SSL | 0 kr |
| Kontaktformular (Web3Forms) | 0 kr |

Repoet er `enfugl/estridpagels` på GitHub. Pages kører fra `main`, mappe `/ (root)`.

### DNS hos Simply

Sat op 10. august 2026:

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
| CNAME | `www` | `enfugl.github.io` |

De fire A-poster dækker `estridpagels.dk` uden www, CNAME-posten dækker `www.estridpagels.dk`.
Simply advarer om "flere records med samme navn og type" — det er meningen, GitHub bruger fire.

Sæt **Enforce HTTPS** under repoets Settings → Pages, når GitHub har udstedt
certifikatet (kan tage en times tid efter DNS er slået igennem).

## Mail på domænet

Fravalgt — formularen leverer til `estridpagels@proton.me`, og der er derfor
intet at sætte op.

Skifter I mening: enhver **betalt** Proton-plan understøtter eget domæne (den gratis gør ikke).
Proton udleverer MX-, SPF- og DKIM-poster, som skal ind i Simplys DNS-panel.
Vejledning: <https://proton.me/support/custom-domain>

## Mørk baggrund

Siden følger automatisk brugerens systemindstilling, og der er en knap nederst til at
skifte manuelt. Skal siden altid være lys, sæt `<html lang="da" data-theme="light">`
og slet `@media (prefers-color-scheme: dark)`-blokken i `stil.css`.
