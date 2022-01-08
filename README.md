# g2a-scraper
An API and web scraper thing for grabbing product info from g2a.com.

The scraper run on a container and connect to a headless Chrome browser from [browserless](https://www.browserless.io/) via a web socket connection. Optionally, you can specify a proxy, [tor-privoxy-alpine](https://github.com/rdsubhas/docker-tor-privoxy-alpine) in our case (very lightweight).

## Prerequisites
* Docker
* Docker Compose

## Configuration
You can make change to these files
* Compose related files : `docker-compose.yaml` (for local development) and `production.yaml` (for production)
  * Browserless chrome image configuration options can be found there: https://docs.browserless.io/docs/docker.html
  * Scraper environment variables
    * BROWSER_WS_ENDPOINT: browser web socket connection endpoint
    * LOG_DIR: container path for logging files
* `/src/scraper.config.json` : this file host fields to scrape and CSS selectors associated to them, you can add or remove as many as you want.
  
  ```json
  {
    "fields": [
      {
        "field": "name",
        "selector": ".indexes__StyledBaseTypography-wgki8j-99"
      },
      {
        "field": "price",
        "selector": ".eIewAh"
      },
      ...
    ]
  }
  ```


## Usage

Start services with :

```console
docker-compose -f production.yaml up -d
```

If everything fine, go to this address http://localhost:8080/, and you should get an HTML page with a "hello world !" message.

### Get a product info

Example : http://localhost:8080/microsoft-windows-10-home-microsoft-key-global-i10000083914003

Result : 
```json
{
    "url":"https://www.g2a.com/microsoft-windows-10-home-microsoft-key-global-i10000083914003",
    "name":"Microsoft Windows 10 Home Microsoft Key GLOBAL",
    "price":"$ 27.16",
    "type":"Key",
    "region":"GLOBAL"
}
```