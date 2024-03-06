// sparar vädet som vi får fram i respektive variabel
// xml använder vi för att sedan konvertera det till json
//
const fs = require('fs');
const xml2js = require('xml2js');

// Läs XML-filen och har felhantering
fs.readFile('sma_gentext.xml', 'utf-8', (error, data) => {
    if (error) {
        console.error(error);
        return;
    }

    // Konvertera XML till JSON
    xml2js.parseString(data, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        // Hitta rätt trans-unit
        const transUnit = result.root.file[0].body[0]['trans-unit'].find(unit => unit.$.id === '42007');

        // Hämta värdet i elementet target
        const targetValue = transUnit.target[0];

        // Skriv värdet till en fil
        fs.writeFile('target_value.txt', targetValue, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log('Värdet skrivet till target_value.txt');
        });
    });
});
 
// fick även istallera extensions som fs xml2js för att få detta fungera