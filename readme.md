

![App. Screenshot from MacOS](https://prototext.app/assets/screenshots/promo/1.jpg)


## Installation

#### Get it

```sh
git clone git@bitbucket.org:svgsprite/prototext.git
cd prototext
```


#### Install dependencies

```sh
npm install && cd electron npm install
```


#### Check the availability of the necessary dev tools on your computer
- [Hoomebrew](https://brew.sh/)
- [Go lang to use Taskfile](https://go.dev/doc/install)
- [NodeJS](https://nodejs.org/en/download/releases/)
- npm install -g @go-task/cli
- npm install pm2 -g


#### Start development on localhost:3333

```sh
task up
task logApp
```


#### Build React App & start Electron

```sh
task app
```


#### See more commands in the Taskfile.yml

```sh
task
```


>Please note: This codebase was created in a MacOS environment. There may be some issues in other environments.

## License

CC BY-NC