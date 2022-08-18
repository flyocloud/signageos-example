# SignageOS Flyo Example

A very basic SignageOS Applet which reads the data from Flyo SigangeOS Integration and display them as slides. More generic informations on [dev.flyo.cloud/integrations/signageos](https://dev.flyo.cloud/integrations/signageos.html).

## Develop

+ Install depencies `npm install`, ensure to run the commands in the `Setup` sections afterwards.
+ Start local development server: `npm start`
+ visit in your browser `http://localhost:8090/`

## Setup (Once)

> This step must be done once after cloning (setting up) your signageos applet repository.

+ Ensure you have an active https://box.signageos.io account!
+ `npm install @signageos/cli -g` now the `sos` is gloabally available
+ `sos login`
+ `sos organization set-default`

## Links

+ [SignageOS Guide regarding Apps](https://docs.signageos.io/hc/en-us/articles/4405068855570-Introduction-to-applets)
+ [SignageOS Javascript SDK Reference](https://sdk.docs.signageos.io/)