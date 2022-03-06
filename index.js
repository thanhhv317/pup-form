var Excel = require('exceljs');
const puppeteer = require("puppeteer");
const request = require("request-promise");
const Promise = require("bluebird");

const crawlAllData = async () => {

    const link = {
        path: "https://docs.google.com/forms/d/e/1FAIpQLSfWvSJtYW_RtSjDQnQx1y_WDvIiZOYWHSmXE7Iee8QRNBvybg/viewform?fbclid=IwAR2Bd-Lk_z9GPCV6yCXu7FHRn_ymBCDkSAigXHBk0ckdqQcHbp7-txpWiqs",
    }
    // crawl data
    const browser = await puppeteer.launch({ headless: false });

    var wb = new Excel.Workbook();
    var path = require('path');
    var filePath = path.resolve(__dirname, '/home/thanhhv/pup/excel/form1.xlsx');
    const fs = require('fs');
    const workSheetName = "Sheet1";

    await wb.xlsx.readFile(filePath).then(async function () {
        console.log(filePath)

        var sh = wb.getWorksheet(workSheetName);
        let rowCount = sh.rowCount;

        console.log("Reading the excel file: " + sh.rowCount + " rows");
        //Get all the rows data [1st and 2nd column]

        for (i = 3; i <= rowCount; i++) {
            if (!!sh.getRow(i).getCell(1).value) {
                const value1 = sh.getRow(i).getCell(1).value;
                const value2 = sh.getRow(i).getCell(2).value;
                const value3 = sh.getRow(i).getCell(3).value;
                const value4 = sh.getRow(i).getCell(4).value;
                const value5 = sh.getRow(i).getCell(5).value;

                const page = await browser.newPage();
                await page.goto(`${link.path}`);

                // page.focus là vị trí của ô cần xác định.
                // page.keyboard.type là nhập giá trị vào là bao nhiêu.
                await page.focus('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await page.keyboard.type(value1)

                await page.focus('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(4) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await page.keyboard.type(value2)

                await page.focus('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(5) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await page.keyboard.type(value3)

                await page.focus('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(6) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await page.keyboard.type(value4)

                await page.focus('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(7) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await page.keyboard.type(value5)


                // Nút click
                await page.click('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span');

                // Đóng tab chrome
                await page.close();
            }
        }

    });

    // Đóng trình duyệt
    await browser.close();
    return true;
}


crawlAllData();