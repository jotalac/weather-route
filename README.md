Weather Route

Semestrální práce - KAJ 2026 - [Tvé Jméno]

Webová aplikace, která slouží jako interaktivní plánovač tras obohacený o přesnou předpověď počasí v průběhu celé cesty.
Uživatelé si zadají počáteční a cílový bod, zvolí typ dopravy a čas odjezdu. Aplikace následně vypočítá trasu a zobrazí meteorologické podmínky (teplotu, srážky atd.) pro různé úseky cesty s ohledem na odhadovaný čas průjezdu.

Cíl projektu a postup
Cílem projektu bylo vytvořit responzivní a uživatelsky přívětivou aplikaci pro lidi, kteří plánují delší cestu (např. na kole nebo autem) a chtějí vědět, zda je po cestě nepotká déšť či bouřka.
Cílem bylo propojit mapové podklady, geolokační služby, navigační algoritmy a otevřené archivy dat o počasí do jednoho plynulého UI.

Uživatelská dokumentace
Vyhledání trasy a počasí
Na domovské obrazovce aplikace se nachází hlavní vyhledávací formulář.
Pro vyhledání trasy stačí vyplnit Start location (1) a Destination (2).
Místo ručního vypisování startovní pozice můžete využít tlačítko pro GPS lokalizaci (3), které automaticky detekuje vaši aktuální polohu.

Dále si můžete zvolit Typ dopravy (chodník, kolo, auto) a nepovinný Čas odjezdu. Pokud čas odjezdu nevyplníte, použije se aktuální čas.

Pro expertní použití je k dispozici posuvník Weather route precision, kterým si volíte s jakou frekvencí a na kolika bodech trasy se má počasí vyhodnocovat. Po vyplnění potvrďte tlačítkem Submit.

Zobrazení výsledků cesty (WeatherDashboard)
Po odeslání požadavku je uživatel přesměrován na stránku s přehledem. Dominantou stránky je interaktivní mapa (1), na které je trasa vykreslena.

Níže se nachází dynamický seznam bodů trasy (2), u kterých je jasně vyznačeno předpokládané počasí spojené s časem protažení. Pokud v seznamu kliknete na konkrétní bod, dané místo se automaticky naanimuje a zvýrazní na mapě. Aplikace dokonce mění celkové video na pozadí podle převládajícího počasí.

Kliknutím na tlačítko Open in Mapy.cz se navíc můžete přesunout k přímé navigaci v externí aplikaci.

Historie vyhledávání
Aplikace do lokálního úložiště ukládá historii vašich předchozích vyhledávání. Zobrazena je přímo pod formulářem na domovské stránce a komplexní pohled na historii (včetně možnosti hromadného promazání) je dostupný na samostatné podstránce.

Kdykoli stačí na panel z historie kliknout, a aplikace vás znovu přesměruje rovnou na výsledky dané trasy s ohledem na aktuální časové podmínky.

Offline režim
Aplikace dbá na aktuální připojení k internetu uživatele. V případě ztráty spojení je uživatel okamžitě informován oranžovou chybovou hláškou na domovské obrazovce a vyhledávací tlačítka se dočasně zablokují, dokud není připojení obnoveno. Zabraňuje se tak pádu aplikace i nekompletnímu načítání dat.

Technická dokumentace
Použité technologie a knihovny
Jazyk: Typescript

Framework: Vue 3 (Composition API, <script setup>)

Build systém: Vite

State Management: Pinia

Router: Vue Router pro SPA (Single Page Application) navigaci.

Leaflet - Pro zobrazení interaktivní navigační mapy v detailu výsledků.

vue3-toastify - Balíček pro notifikace a vyskakovací zprávy o stavu (Error, Success atd.).

Vlastní SVG Ikony - Většina vizuálních prvků aplikace je zapouzdřena do vlastních znovupoužitelných zkompilovaných Vue komponent.

Použitá API rozhraní
Vzhledem k tomu, že spojení geolokativních, routovacích a meteorologických dat napříč jedním zdrojem nebývá dostupné bez poplatků, aplikace logicky a postupně řetězí volání 3 nezávislých otevřených API:

Nominatim API (nominatimApi.ts) - Zodpovědné za Geocoding a Reverse Geocoding. Přetváří textově zadaná města uživatelem (např. "Praha") na GPS souřadnice, které jsou vyžadovány dalšími servery.
OSRM API (osrmApi.ts) - Open Source Routing Machine. Přebírá startovní a cílové GPS souřadnice z Nominatimu a vrací přesný navigační polygon (cestu) spolu s odhadovaným celkovým časem dojezdu na základě typu dopravy.
OpenMeteo API (openMeteoApi.ts) - V aplikaci byly naprogramovány obslužné utility (např. extractWeatherPoints), které rozloží trasu z OSRM na několik menších bodů a spočítají orientační čas průjezdu daným bodem. Tyto body jsou následovně sériově staženy přes OpenMeteo API za účelem zisku přesného počasí, viditelnosti a teploty pro daný čas.
Architektura uložení a State Management
Aplikace využívá Pinia pro uchování globálních stavů:

searchStore - Drží aktuálně zadaná data uživatelem ve formuláři, přesnost výsledku trasy, mód dopravy a odvozené GPS souřadnice lokací. Zabraňuje ztrátě rozeplněných dat ve chvíli, kdy uživatel přechází mezi pohledy (Views).
networkStore - Obsahuje jednoduchý isOnline reaktivní stav.
Struktura View/Komponent odpovídá reaktivnímu konceptu. Views (HomeView.vue, WeatherView.vue) provádí těžkou logiku skládání a načítání API (vytvářejí loading stav zobrazený uživateli), zatímco obslužné komponenty (MainSearchForm.vue, RouteMap.vue, WeatherBigCard.vue) reagují pouze na dodaná data (Props) nebo odesílají akce (Emits).

Error Handling a Rate Limiting
Aplikace je vybavena vlastním generickým obalujícím HTTP klientem (apiClient.ts). V něm je naimplementováno centrální ošetření chyb v síti.

Aplikace dokáže detekovat HTTP Status 429 - Too Many Requests a zamezit chybě. Obzvláště bezplatné API od Nominatim je vysoce restriktivní. Pokud Nominatim namísto standardní HTTP chyby ukončí API spojení bez CORS hlaviček, detekuje apiClient.ts generický network TypeError příznak v izolovaném bloku vyjímek a automaticky jej aplikaci pošle interpretovaný přes bezpečný objekt RateLimitError. V UI je následně vyvolán korektní Toast, který o rate-limitu informuje uživatele.

Offline handling
Pro detekci sítě je využit nativní JS navigator.onLine a Window Event listenery (online, offline), které aktualizují Pinia Store. Z tohoto Storu čtou následně interaktivní tlačítka (např. zablokování GPS tlačítka s disabled) a odesílací formulářová logika, která podává explicitní zpětné hlášení uživateli v případě propadu WiFi-Off ikoně.
