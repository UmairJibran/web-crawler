//core requires
const http = require("http");
const path = require("path");
const fs = require("fs");
//npm requires
const uuid = require("uuid");
//function that actually downloades the page
const webPageDownloader = (pageUrl) => {
   const folderName = uuid.v1(); //gives unique name to the folder in which the file will be stored
   fs.mkdirSync(folderName); //creates the folder with the name generated above to store the page in
   http
      .get(pageUrl, (response) => {
         let pageSource = " "; //buffer variable
         response.on("data", (chunk) => {
            console.log(`Downloading ${pageUrl}`);
            pageSource += chunk; //concatinates each line in the buffer variable(pageSource)
         });
         response.on("end", () => {
            fs.writeFileSync(
               path.join(__dirname, folderName, "page.html"),
               pageSource,
               (error) => {
                  if (error) return console.error(error);
                  console.log(`Page downloaded at: ${folderName}`); //console out success of the task
               }
            ); //writes file asynchronously to the file named page.html
            fs.writeFileSync(
               path.join(__dirname, folderName, "url.txt"),
               pageUrl,
               (error) => {
                  if (error) return console.error(error);
               }
            ); //creates a text file with page url inside
         });
         response.on("error", (error) => {
            console.error(`The following error has been encountered: ${error}`);
         }); //console out any error if faced
      })
      .on("error", (error) => {
         console.error(`The following error has been encountered: ${error} `);
      }); //console out any error if faced
};

webPageDownloader(process.argv[2]);
