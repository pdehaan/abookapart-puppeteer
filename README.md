# Scraping your A Book Apart orders using Puppeteer

## USAGE

```sh
git clone https://github.com/pdehaan/abookapart-puppeteer.git
cd abookapart-puppeteer
npm install
touch .env
```

In your .env file, create an `ABA_EMAIL=""` and `ABA_PASSWORD=""` key/value pair with your respective credentials.

```ini
ABA_EMAIL="__YOUR_EMAIL_HERE__"
ABA_PASSWORD="__YOUR_PASSWORD_HERE__"
```

Next, we'll scrape our orders and cache the data into an "orders.json" file for parsing. This way we don't need to constantly rescrape the server for order information if you want to do multiple queries of the data.

```sh
npm run scrape
```

Finally, run the reporter with whatever result you're trying to run:

```sh
npm run report
```