
const express = require('express')
const app = express()
const { IncomingWebhook } = require('@slack/client')


const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)

app.get('/', (req, res) => res.send('Hello World V2!'))

app.get('/slack', (req, res) => {
    webhook.send('Hello there', function(err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });
    
    res.send('Slack sent')
})

app.get('/commit', (req, res) => {
    revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim()

    res.send(`Commit hash: ${revision}`)


})

let port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))