var Excel = require('exceljs');
const puppeteer = require("puppeteer");
const request = require("request-promise");
const Promise = require("bluebird");

const crawlAllData = async () => {

    const link = {
        path: "https://www.cronoslauncher.org/",
    }
    const browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
    await page.goto(`${link.path}`);

    await page.waitForSelector('body > div > div.header.w-nav > div.container-header-dapp > div.pitch-deck > a.button-home.w-button')

    await page.click("body > div > div.header.w-nav > div.container-header-dapp > div.pitch-deck > a.button-home.w-button");
    await page.waitForNavigation();

    // await page.waitForSelector('#email')
    await page.focus('#email');
    await page.keyboard.type("con mua ngang wua");


    await page.focus('#entry-form > div:nth-child(12) > span > div > input');
    await page.keyboard.type("ABCD");

    await page.focus('##entry-form > div:nth-child(13) > span > div > input');
    await page.keyboard.type("ABCD");

    await page.click("#entry-form > div.form_item_wrapper.tep.tep-button > a > span");

}


crawlAllData();