const fs = require('fs');
const { appLocales } = require('../../app/i18n');
const translate = require('@vitalets/google-translate-api');
const addCheckmark = require('./helpers/checkmark');
const IS_DEBUG = false;

// Helper functions
const newLine = () => process.stdout.write('\n');
const finishTask = () => addCheckmark(() => newLine());
const DIE = (code) => process.exit(code);
const DEBUG = (msg) => {
    if (IS_DEBUG){
        newLine();
        process.stdout.write("DEBUG : " + msg)
    } 
}

// Defining global variable;
let enTranslation;
const dumpableJSON = {};

// Opening and parsing english translation file
try {
    process.stdout.write("Opening english translation json file and parsing it");
    const enJSONString = fs.readFileSync("app/translations/en.json");
    DEBUG(enJSONString);
    enTranslation = JSON.parse(enJSONString);
    finishTask();
} catch (error){
    if (error.code !== 'ENOENT') {
        process.stderr.write(
          `Couldn't find the english translation file,\n you should run 
          the 'extract-intl'command before running this one : \n${error}`,
        );
    } else {
        process.stderr.write(
            `Couldn't parse the JSON object : \n${error}`,
          );
    }
    DIE(1);
}

const keys = [];
for (key in enTranslation){ 
    keys.push([key, enTranslation[key]]); 
}

for (const locale of appLocales){
    if (locale == "en") continue;
    
    Promise.all(keys.map(tuple => {
        return translate(enTranslation[tuple[0]], {to: locale}).then( res => {
            return [tuple[0] ,res.text];
        })
    })).then( values =>  {
        process.stdout.write(`Translating JSON object in ${locale}`);
        for (let i = 0; i < values.length; i++){
            dumpableJSON[values[i][0]] = values[i][1];
        }
        finishTask();

        process.stdout.write(`Dumping ${locale} translation JSON into file`);
        fs.writeFile(`app/translations/${locale}.json`, JSON.stringify(dumpableJSON), (err) => {
            if (err) {
                DEBUG("An error occured during the writeFile operation");
                DIE(1);
            };
            DEBUG("File has been created")
        });
        finishTask();
    });
    
    

}