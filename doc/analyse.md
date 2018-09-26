# Analyse

## Functionale analyse project 

### Beschrijving

Ons project kan men zeer kort beschrijven als een slimme plant.  
De slimme plant of plantenpot zal zelf zijn omstandigheden kunnen bepalen met behulp van bepaalde sensoren:  

*Een vochtigheidsgraadsensor, voor het bepalen van de vochtigheid van de bodemgrond  
*Een temperatuursensor, indien de plant nood heeft aan hogere of lagere temperaturen dan kamertemperatuur (ca. 21° C)  
*Een pH meter, voor het bepalen van de pH of zuurtegraad van de bodemgrond  

Ook zal er een toevoersysteem aanwezig zijn voor het toevoegen van water en/of voedingsstoffen.  

Om de plantenpot 24/7 te laten werken is er netstroom vereist, maar indien dit uitvalt of faalt, zal er ook nog een reserve batterij aanwezig zijn.  
Deze batterij zal aanslaan wanneer de netstroom wegvalt.  

Aangezien er sprake is van zowel netstroom als een reserve batterij zullen deze goed en veilig gescheiden moeten worden van zowel elkaar als, uiteraard ,van de watertoevoer.  

Ook draadloze communicatie is vereist om data van de plantenpot en de sensoren door te sturen naar het web dashbord.  

Om de slimme plantenpot te controleren zal men een web dashbord kunnen raadplegen met een unieke token dat wordt meegegeven aan de slimme plantenpot waarbij de toestand van de plant volledig zal worden weergegeven.  
Via het web dashbord zal men ook zelf de plantenpot kunnen aansturen en naar wens de plant water geven of voedingsstoffen toedienen.  

Om de vooruitgang van de plant vast te leggen en om een gezonde groei van de plant te garanderen zal er ook een camera aanwezig zijn in de slimme plantenpot.  
Deze camera zal periodiek foto's nemen en deze ook draadloos verzenden naar het web dashbord.  

via beeldherkenning zal het web dashbord de staat van de groei van de plant bepalen. (bv. snel, traag, gezond, ongezond, ...)  


Ook zal dit web dashbord waarschuwingen geven indien.  

*De vochtigheid extreem hoog of laag is
in een normale huiskamer kan een extreem hoge of lage vochtigheidsgraad het gevolg zijn van een defecte toevoer of een defecte vochtigheidssensor

*De temperatuur extreem hoog of laag is.

*De pH waarde extreem hoog of laag is.

*De toevoerstoffen op zijn of er nood is aan een aanvulling van voedingstoffen.

*De netstroom weg valt en de slimme plantenpot overschakelt op de reserve batterij.

*Er sprake is van geen gezonde groei van de plant.


### Marktonderzoek 

| Smart Object           | Technologieën                              |
|------------------------|--------------------------------------------|
| Smart Pot              | Water geven van op afstand, app dashboard  |
| Planty                 | Water geven van op afstand via internet    |
| Edyn garden sensor kit | trackt licht, temperatuur, vochtigheid ... |
| SPOT                   | Self-watering, neemt foto's & time lapses  |
| Aquaponics system      | gebruikt pompen en hydraulica              |
| Gardena Micro-dip      | Self-watering , Micro-dip systeem          |

### Diagrammen
![Diagram](/doc/img/Diagram.png)  
#### Algemene architectuur

#### Gedetailleerde diagrammen

#### Schema's van het product

#### Fysiek design (Optioneel)

#### Niet functionele analyse 

## Functionaliteit

## Release Plan 

## Inventarisatie Hardware  

DHT22 - Temperatuur & luchtvochtigheid sensor:  
zeer nauwkerige waardemetingen (2-5% afwijking) van temperatuur (-40 to 80°C) en luchtvochtigheid (0-100%)  
  
SEN-13637 - Bodemvochtigheid sensor:  
Waardemeting van de bodemvochtigheid, werking op 3.3V-5V  
  
SEN-10972 - pH sensor:  
  
APDS-9301 - Licht sensor:  
LDR sensor, max 120V dc, Omgevingstemperatuur -30 tot 70 °C  
  
Raspberry Pi 3:  
ingebouwde wifimodule, veel pinnen, ...  
  
PCB:  
Compacte elektrische schakeling die zorgt voor voeding, sensor verbinding, ...    
  
Kunststof water magneetventiel – 12V:    
Dit ventiel wordt gebruikt om het water tegen te houden of juist te laten stromen (aangestuurd door raspberry Pi)  
  
SLV-Transformer 60W 12V:  
Zet de netspanning om naar 12V  
  
## Inventarisatie Software 

Angular 6 & Node.js  
Python

## Test document

## Verdediging
