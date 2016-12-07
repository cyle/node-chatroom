# Chatroom

La la la...

## Install

Make sure ya got node, make sure ya got npm.

Clone this repo. Go into it with Terminal.

Then: `npm install` to get the dependencies.

Then: make a self-signed certificate:

1. Make your key: `openssl genrsa -out chatroom.key.pem 4096`
2. Make your signing request: `openssl req -new -sha512 -key chatroom.key.pem -out chatroom.csr.pem`
3. Sign it yourself: `openssl x509 -req -in chatroom.csr.pem -signkey chatroom.key.pem -out chatroom.crt.pem`

(Yes, that makes an "insecure" self-signed certificate, but that's fine.)

Then: `node chatroom.js` to run the chatroom, access it in your browser via `https://localhost:31337/` (HTTPS, with our custom port).

That's it. Check it out.

## Usage

Change your name if you want, or don't. There's no security/authentication.

## Notes

This purposefully doesn't keep any storage of messages anywhere.

Also, the client only ever keeps the last 200 messages.

The [font I used](https://managore.itch.io/m5x7) is pretty awesome.

## To dos

- [ ] Encryption of messages using PGP or something? I dunno.
- [ ] Auth/register capability of some kind? But always allow anonymous.
- [ ] Current user list
- [ ] Sounds, lol
- [ ] iOS client
- [x] Serve over https/wss
