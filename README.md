# access-control-system

## Installation
### Mongod for raspberry
MongoDB do not have official libs for ARM processors, so you must use next commands for installing MongoDB.
```{r, engine='bash', count_lines}
$ git clone https://github.com/svvitale/mongo4pi.git
$ cd mongo4pi
$ ./install.sh
```

### Boost library (experimental, not used in project)
For installation use
```{r, engine='bash', count_lines}
$ sudo apt-get install libboost-all-dev
$ sudo apt-get install aptitude
$ aptitude search boost
```
and compile with
```{r, engine='bash', count_lines}
$ g++ -lboost_system -pthread -o boostserver boostserver.cpp -std=c++11
```
Test with
```{r, engine='bash', count_lines}
$ ./boostserver
```

### Boost library with libnfc (experimental, not used in project)
For installation use
```{r, engine='bash', count_lines}
$ g++ -L/opt/z-way-server/libs -I/opt/z-way-server/libzway -lzway -lzcommons -lboost_system -lxml2 -lz -lm -lcrypto -larchive -pthread -o boostserver boostserver.cpp turn_off_on.c -std=c++11
```
Test with
```{r, engine='bash', count_lines}
$ ./boostserver
```


### Lib Z-Way
For installation Z-Way please follow previous work `power-management`.

### touchatag reader
For touchatag reader you need to have this library `libnfc`.
#### libnfc
We are using `libnfc` in version 1.7.1. For installation just follow these steps. For more information just check out their [page](http://nfc-tools.org/).

First make sure you have required dependencies
```{r, engine='bash', count_lines}
$ sudo apt-get install libusb-dev
```

Then download and extract `libnfc` archive
```{r, engine='bash', count_lines}
$ git clone https://github.com/nfc-tools/libnfc.git
$ cd libnfc
$ git checkout libnfc-1.7.1
$ git clean -d -f -x
$ # rm ../libnfc*.deb #not mandatory
$ git remote|grep -q anonscm||git remote add anonscm git://anonscm.debian.org/collab-maint/libnfc.git
$ git fetch anonscm
$ git checkout remotes/anonscm/master debian
$ git reset
$ dpkg-buildpackage -uc -us -b
```

Now make sure you have required run-time dependencies
```{r, engine='bash', count_lines}
$ sudo apt-get install libusb-0.1-4
```

Install `libnfc`
```{r, engine='bash', count_lines}
$ sudo dpkg -i ../libnfc*.deb
```

Now plug your NFC device and test it via command (you can find more commands typing `nfc-`<kbd>TAB</kbd>)
```{r, engine='bash', count_lines}
$ nfc-list
$ nfc-poll
```
The first command just lists all devices but the second can read your tag via device.


### Application
Our application consists of two parts backend - node.js, express and fronend - angular. Node and npm are required before installation both parts. You can follow steps in official page.

#### Frontend part
Before installing please copy file `angular/gulp/config.json.example` to `angular/gulp/config.json` and provide your configuration settings.

Run next scripts from `angular` folder
```{r, engine='bash', count_lines}
$ npm install -g yo gulp bower
$ npm install
$ bower install
```
Now you have all libraries downloaded.

##### Development mode with live reload
You can run application in developer mode by typing `gulp watch [--serve={prod|dev}]`. If you do not provide env, default environment is dev.

#### Building application
For building application just type `gulp [--serve={prod|dev}]`. Default environment is dev. Now your application is builded in `release` folder.

#### Backend part
Before installing please copy file `config.json.example` to `config.json` and provide your configuration settings. Now just run `npm install` for download all assets.

##### Development mode with live reload
For development mode you can use `nodemon app.js`. If you do not want live reload in dev mode, run application `node app.js`

##### Running in production
For running application in production you can use `forever`. For start application use `forever start app.js`.

#### Compiling scripts used in application
##### NFC reader
For compiling NFC read file use from `/scripts` folder
```{r, engine='bash', count_lines}
$ gcc -o read_nfc red_nfc.c -lnfc
```

##### Fibaro plugs
For compiling Fibaro plugs files use from `/scripts/fibaro` folder.
```{r, engine='bash', count_lines}
$ g++ -L/opt/z-way-server/libs -I/opt/z-way-server/libzway -lzway -lzcommons -o set_color set_color.c -std=c++11
$ g++ -L/opt/z-way-server/libs -I/opt/z-way-server/libzway -lzway -lzcommons -o turn_off_on turn_off_on.c -std=c++11
```
**IMPORTANT** do not forget to change path to your scripts in `/scripts/fibaro/set_color.sh` and `/scripts/fibaro/turn_off_on.sh`


## Problems
#### Port is in use
Check running procceses with
```{r, engine='bash', count_lines}
$ sudo netstat -lptu
```
and then just kill it with
```{r, engine='bash', count_lines}
$ kill PID
```

### MongoDB is corrupted
If you do not stop mongod correctly, your db may corrupt. Remove `.lock` file
```{r, engine='bash', count_lines}
$ sudo rm /var/lib/mongodb/mongod.lock
```

### NFC reader error
When you receive this error, just start server again.
```{r, engine='bash', count_lines}
stderr: error   libnfc.driver.acr122_usb        PN532 didn't reply
error   libnfc.driver.acr122_usb        PN532 init failed, trying again...

stderr: error   libnfc.driver.acr122_usb        Too small reply
error   libnfc.driver.acr122_usb        PN532 init failed, trying again...
error   libnfc.driver.acr122_usb        Too small reply

NFC closing code: 1
```
