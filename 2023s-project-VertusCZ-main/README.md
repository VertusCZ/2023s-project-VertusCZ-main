# Návod na stažení a instalaci závislostí a spuštění projektu

## Stažení všech závislostí

Instalace závislostí v složce projektu:

    npm install

Instalace závislostí v adresáři be:

1. Přejděte do adresáře be.

2. Spusťte následující příkaz, který nainstaluje všechny závislosti pro backend:


    cd ./be
    npm install

Instalace závislostí v adresáři fe:

1. Přejděte do adresáře fe.

2. Spusťte následující příkazy, který nainstaluje všechny závislosti pro frontend:


    cd ..
    cd ./fe
    npm install

## Spuštění aplikace

1. Přejděte do adresáře zdrojového projektu
2. Spustte příkaz:


    npm run dev



Server by měl běžet na adrese http://localhost:5000.

React aplikace by se měla otevřít v prohlížeči na adrese http://localhost:3000.

Poznámka: Před spuštěním serveru v adresáři be ujistěte se, že jste spustili příkaz npm install a že jsou nainstalovány všechny závislosti. Stejně tak před spuštěním React aplikace v adresáři fe se ujistěte, že jste spustili příkaz npm install.

V souboru be/server.js je možno nalést počáteční vytvoření a přidání dat do databáze