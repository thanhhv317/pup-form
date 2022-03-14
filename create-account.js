var Excel = require('exceljs');
const puppeteer = require("puppeteer");
const request = require("request-promise");
const Promise = require("bluebird");

const crawlAllData = async () => {

    const link = {
        path: "https://polkadot.js.org/apps/#/accounts",
    }
    // crawl data
    const browser = await puppeteer.launch({ headless: false });

    var wb = new Excel.Workbook();
    var path = require('path');
    var filePath = path.resolve(__dirname, '/home/thanhhv/pup/excel/account.xlsx');
    const fs = require('fs');
    const workSheetName = "Sheet1";

    const page = await browser.newPage();
    await page.goto(`${link.path}`);

    const source = [];

    await wb.xlsx.readFile(filePath).then(async function () {
        console.log(filePath)

        var sh = wb.getWorksheet(workSheetName);
        let rowCount = sh.rowCount;

        console.log("Reading the excel file: " + sh.rowCount + " rows");
        //Get all the rows data [1st and 2nd column]


        for (i = 2; i <= rowCount; i++) {
            if (!!sh.getRow(i).getCell(1).value) {
                const value1 = sh.getRow(i).getCell(1).value;
                const value2 = sh.getRow(i).getCell(2).value;

                await page.waitForSelector('#root > div.apps--Wrapper.theme--light.Apps-sc-1153uyw-0.erOYeV > div.Content-sc-1lmz432-0.eLWBLy > main > div.Accounts-sc-mp0ofd-0.kiegNm > div:nth-child(3) > div > button:nth-child(1)')

                await page.click("#root > div.apps--Wrapper.theme--light.Apps-sc-1153uyw-0.erOYeV > div.Content-sc-1lmz432-0.eLWBLy > main > div.Accounts-sc-mp0ofd-0.kiegNm > div:nth-child(3) > div > button:nth-child(1)");

                const mNemonic = await page.evaluate(() => {
                    return document.querySelector('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div:nth-child(2) > div:nth-child(1) > div > div > div > textarea').textContent;
                });
                console.log(mNemonic);
                await page.click("body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div:nth-child(4) > div > div > div > label");
                await page.click("body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Actions-sc-16t6dp8-0.fvEGHv > div > button");

                await page.focus('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div:nth-child(2) > div:nth-child(1) > div > div > div > input[type=text]')
                await page.keyboard.type(value1.toString());


                // password
                await page.focus('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div > div > input[type=password]')
                await page.keyboard.type(value2.toString());

                // nhap lai password
                await page.focus('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div > input[type=password]')
                await page.keyboard.type(value2.toString());


                // next
                await page.click("body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Actions-sc-16t6dp8-0.fvEGHv > div > button:nth-child(2)");

                const partialSeed = await page.evaluate(() => {
                    return document.querySelector('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div.Content-sc-1yxi1dg-0.hWVvEv.ui--Modal__Content > div > div:nth-child(1) > div:nth-child(1) > div > div').textContent;
                });

                console.log(partialSeed)

                source.push({
                    username: value1.toString(),
                    password: value2.toString(),
                    mNemonic: mNemonic,
                    partialSeed: partialSeed
                })

                // save
                await page.click('body > div.theme--light.ui--Modal.Base-sc-190q8hp-0.cZmPFb.Create-sc-j2eorn-0.dRxZOZ.size-large > div.ui--Modal__body > div.Actions-sc-16t6dp8-0.fvEGHv > div > button:nth-child(2)');
            }
        }

    });

    // luu vao excel

    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("Sheet1");


    worksheet.addRow(['username', 'password', 'mNemonic', 'partialSeed']);

    for (let i = 0; i < source.length; ++i) {
        worksheet.addRow([
            source[i].username,
            source[i].password,
            source[i].mNemonic,
            source[i].partialSeed
        ]);
    }

    // Save Excel on Hard Disk
    workbook.xlsx.writeFile("ketqua.xlsx").then(function () {
        // Success Message
        console.log("Done " + source.length + " rows!")
    });

    return true;
}


crawlAllData();