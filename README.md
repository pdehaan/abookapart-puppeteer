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

**NOTE:** You can also specify an `EMAIL=` and `PASSWORD=` on the command line, <kbd>EMAIL="__YOUR_EMAIL_HERE__" PASSWORD="__YOUR_PASSWORD_HERE__" npm run scrape</kbd>.

Next, we'll scrape our orders and cache the data into an "orders.json" file for parsing. This way we don't need to constantly rescrape the server for order information if you want to do multiple queries of the data.

```sh
npm run scrape
```

Finally, run the reporter with whatever result you're trying to run:

```sh
npm run report
```

## OUTPUT

```
[#000001] Accessibility for Everyone - ebook
[#000002] Animation at Work - ebook
[#000003] Color Accessibility Workflows - ebook
[#000004] Content Strategy for Mobile - ebook
[#000005] Design Is a Job - ebook
[#000006] Designing for Emotion & Mobile First Bundle - ebook bundle
[#000007] Everyday Information Architecture - ebook
[#000008] Get Ready for CSS Grid Layout - ebook
```
