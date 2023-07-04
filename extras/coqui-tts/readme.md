
## Coqui TTS 🐸
[A deep learning toolkit for Text-to-Speech](https://github.com/coqui-ai/TTS/)


### Requirements & Installation guide.

#### On Windows.

Python, version >= 3.7.
```sh
python -V
open https://www.python.org/downloads/windows/
```

Espeak.
```sh
open https://github.com/espeak-ng/espeak-ng/releases/
```

Build Tools for C++.
```sh
open https://aka.ms/vs/17/release/vs_BuildTools.exe
```

Installations of the packages on a local level.
```sh
# Go to the folder where you want to install the project.
cd .\extras\coqui-tts

# Activate the Python virtual environment.
python -m venv .
.\Scripts\activate.bat

pip install pip -U
pip install setuptools -U
pip install wheel -U
pip install tts -U
```


#### On MacOS.


Python, version >= 3.7.
```sh
python3 -V
open https://www.python.org/downloads/macos/
```

Espeak.
```sh
brew install espeak
```

Installations of the packages on a local level.
```sh
# Go to the folder where you want to install the project.
cd ./extras/coqui-tts

# Activate the Python virtual environment.
python3 -m venv .
source ./bin/activate

pip install pip -U
pip install setuptools -U
pip install wheel -U
pip install tts -U
```

### List models.
```sh
tts --list_models
```

### Run Server.
```sh
tts-server --model_name tts_models/en/ljspeech/vits
open http://localhost:5002
```