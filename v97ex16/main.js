import express from "express"
import mongoose from "mongoose";
import { Employee } from './models/employeemodel.js'

const app = express()
const port = 3000

const conn = await mongoose.connect('mongodb://localhost:27017/adobe');

function generateRandomString(n) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

function generateRandomNumber(a, b) {
    return Math.floor(a + (b - a) * Math.random());
}

function getRandomTrueFalse() {
    return Math.random() < 0.5 ? false : true;
}

function generateRandomEmployee() {
    const emp = new Employee({
        name: `${generateRandomString(7)}`, salary: `${generateRandomNumber(500, 2000)}`,
        language: "c++", city: `${generateRandomString(5)}`, isManager: getRandomTrueFalse()
    })
    return emp;
}

app.get('/', (req, res) => {
    const htmlForm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submit Form</title>
    </head>
    <body>
      <form action="/submit" method="post">
        <label for="noe">Number of employee entries to be generated:</label>
        <input type="Number" id="noe" name="noe">
        <button type="submit">Generate</button>
      </form>
    </body>
    </html>
    `;
    res.send(htmlForm);
})

app.post('/submit',async (req,res) => {
    // const {noe} = await req.body.noe;
    // console.log(noe + typeof(noe));
    // console.log(req);
    await Employee.deleteMany();
    for (let i = 0; i < 10; i++) {
        const getRandomEmpl = generateRandomEmployee();
        getRandomEmpl.save();
    }
    const htmlData = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submit Form</title>
    </head>
    <body>
      Random employees data generated in database.
      <form action="/" method="get">
        <button type="submit">Go Back</button>
      </form>
    </body>
    </html>
    `;
    res.send(htmlData);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})