const fs = require("fs");
const {nanoid} = require("nanoid");
const moment = require("moment");

const fileName = "./db.json";
let data = [];

module.exports = {
    init() {
        try{
            data = JSON.parse(fs.readFileSync(fileName));
        } catch (e) {
            data = [];
        }
    },
    getItems() {
        return data;
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(data));
    },
    addItem(item) {
        item.id = nanoid();
        item.data = moment().format('MMMM Do YYYY, h:mm:ss a');
        data.push(item);
        this.save();
        return item;
    }
};