## Installation

```sh
# get it
git clone git@bitbucket.org:svgsprite/prototext.git
cd prototext

# install dependencies
npm install && cd electron npm install

# start dev on localhost:3333
task up
task logapp

# bild JS and run electron
task app

# build for MacOS [Window, Linux]
task bapp
task bwapp
task blapp

# see more commands in the Taskfile.yml
```

Please note: This codebase was created in a macOS environment. There may be some issues in other environments.


## License

CC BY-NC