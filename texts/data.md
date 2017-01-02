##Prologo
Il web è il luogo al quale stiamo progressivamente demandando l'immagine del nostro tempo: notizie interazioni sociali, documenti ufficiali e non, sono oggi codificati digitalmente.
Nei campi delle scienze sociali e dei _new media studies_ è possibile notare un crescente approccio allo studio di fenomeni sociali in cui il web è visto come uno spazio di discussione dove sedimentano nel tempo le _tracce digitali_. Tramite la loro raccolta e analisi è possibile creare un punto di accesso al fenomeno analizzato.

##Cosa
Il nostro fenomeno preso in considerazione è la metropoli e tutti i complessi fenomeni urbano-sociali ad essa collegata. In particolare ci siamo soffermanti sul ipotetico percorso del Naviglio martesana una volta riaperto.

Il punto di partenza è stato fare dei sopralluoghi in tutte le zone della città toccate dal percorso cercando di descriverle visivamente tramite una serie di riprese video.

Per quanto riguarda invece la raccolta delle nostre tracce digitali, abbiamo cercato di capire quale potessero essere dei **layer aggiuntivi** che potesso creare una base per poter raccontare più avanti le trasformazioni socio/urbanistiche/economiche.

Ci siamo quindi soffermati su:

* i servizi pubblici e privati [Mappatura del PGT, Openstreetmap]
* il mercato immobiliare [Airbnb, Idealista]

Come facciamo a recuperare questi dati? Saranno significativi?
Andiamo con ordine :)

##Processo
Come primo passo abbiamo messo su mappa il percorso del Naviglio tramite la piattaforma online [carto](http://www.carto.com)
![percorso](images-md/percorso.png)

Successivamente ci siamo concentrati sull'area di Milano e abbiamo suddiviso il percorso in 4 aree di interesse, disegnandole con [geojson.io](http://geojson.io) e importandolo in [Carto](http://carto.com).
![aree](images-md/aree.png)
Potete trovare i _.geojson_ qui:

- [Melchiorre Gioia](data/melchiorre.json)
- [Isola/P.ta Nuova](data/isola.json)
- [Centro storico](data/centro.json)
- [Darsena](data/darsena.json)

Dopo diversi giorni sopralluoghi abbiamo prodotto due output video per ogni area:

dei dettagli significativi:
![dettagli](images-md/dettagli.gif)
Potete trovare i video qui:

- [Melchiorre Gioia](videos/melchiorre.mp4)
- [Isola/P.ta Nuova](videos/isola.mp4)
- [Centro storico](videos/centro.mp4)
- [Darsena](videos/darsena.mp4)

l'attraversamento in bicicletta con ripresa frontale:
![bici](images-md/bici.gif)
Potete trovare il video qui:

- [Percorso bici](videos/path.mp4)

***

Per quanto riguarda i servizi sul territorio abbiamo preso come sorgente un [.pdf](http://mediagallery.comune.milano.it/cdm/objects/changeme:63910/datastreams/dataStream10354039052621674/content?pgpath=ist_it_contentlibrary/sa_sitecontent/utilizza_servizi/territorio/pianificazione_urbanistica_generale/piano_governo_territorio_vigente/piano_servizi_vigente/pds_nil_new) pubblicato sul sito del [comune di Milano](http://www.comune.milano.it/wps/portal/ist/it/servizi/territorio/pianificazione_urbanistica_generale/piano_governo_territorio_vigente/piano_servizi_vigente/pds_nil_new) contenente una lista esaustiva e categorizzata di serivzi pubblici presenti sul territorio (diviso per N.I.L).
Purtroppo non abbiamo trovato dei formati riutilizzabili (se sapete dove trovarlo segnalatecelo!) e il _pdf_ non conteneva infomazioni geografiche se non l'indirizzo.
Non ci siamo di certo arresi davanti a questo ostacolo. Tramite il software libero [Tabula](http://tabula.technology/) abbiamo trasformato le tabelle del pdf in _.csv_ in modo da _liberarlo_
![tabula](images-md/tabula.gif)

Da qui abbiamo dovuto recuperare le coordinate di ogni luogo per poter successivamente filtrare solo quelli presenti delle nostre aree di interesse. Abbiamo utilizzato un servizio API di geocoding offerto da [Mapzen](https://mapzen.com/documentation/search/) e, con una serie di semplici script (ovvero dei piccoli software che automatizzano dei passaggi), abbiamo recuperato le coordinate di circa 4000 luoghi e filtrati per ogni area mantenendo la tipologia del luogo come informazione.
![pgt](images-md/pgt.png)
Potete trovare il file finale qui:

- [Pgt](data/pgt.tsv)

Altra sorgente dati è stata [Openstreetmap](http://www.openstreetmap.org), una sorta di wikipedia per le mappe :)
Pur essendo al corrente della parzialità dei dati raccolti, abbiamo voluto provare a vedere che dati riuscivamo ad estrarre per ognuna delle nostre aree.
Oltre le informazionisulle strade (edifici, ect) in OSM possiamo trovare i POI (Point of Interest) che contengono informazioni interessati dal posizionamento delle panchine ai servizi commerciali.
Tramite il servizio [overpass turbo](https://overpass-turbo.eu/),che si appoggia sulle [Overpass API](http://wiki.openstreetmap.org/wiki/Overpass_API), un  abbiamo scaricato e filtrato le informazioni che ci interessavano.
![overpass](images-md/overpass.gif)

Potete trovare il file finale qui:

- [Osm](data/osm.tsv)

Dai servizi passsiamo agli affitti! Ci siamo concentrati su due sorgenti principali: [idealista](https://www.idealista.it/en/) come riferimento il mecato immobiliare a lungo termine e [Airbnb](http://www.airbnb.com) per il mercato immobiliare a breve termine.
Per idealista abbiamo fatto richiesta per accedere alle loro API che purtroppo non sono pubbliche ma ci hanno dato accesso senza problemi ([qui](http://developers.idealista.com/access-request) va fatta la richiesta). Abbiamo estratto il numero di affitti nelle diverse zone e il costo al m2 mensile.

Airbnb non ha un servizio di API ufficiale, per fortuna qualcuno ha fatto [reverse-engineering](https://it.wikipedia.org/wiki/Reverse_engineering) dell'applicazione mobile e ha [reso disponibile](http://airbnbapi.org/) le informazioni necessarie per scaricare i dati.
Anche qui abbiamo scaricato il numero di affitti e il prezzo a notte per una persona per ogni annuncio.
![affitti](images-md/affitti.png)

Potete trovare il file finale qui:

- [Idealista](data/idealista.tsv)
- [Airbnb](data/airbnb.tsv)

Ora che anche ultimi dati mancanti erano stati _liberati_ avevamo a disposizione [tutti](https://offtopic.carto.com/viz/9a7cdda4-9a2a-11e6-a979-0e233c30368f/public_map) gli ingredienti per costruire il sito che state navigando adesso :)

![infornare](http://i.giphy.com/13rDkCufm6BhHq.gif)


##Dati e codice
Potete trovare i dati in formato aperto/modificabile/riutilizzabile qui:

-[data/](https://github.com/scandaglio/ancora/tree/master/app/data)

Il codice del sito qui:

-[scandaglio/ancora](https://github.com/scandaglio/ancora)


##Disclaimer
Questa ricerca non è perfetta e non è terminata, è l'inizio di un laboratorio politico che verrà [portato avanti](http://www.offtopiclab.org/scandaglio/) presso PianoTerra. Ogni consiglio e critica costruttiva è benvenuta!
