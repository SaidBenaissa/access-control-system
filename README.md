# access-control-system

## Installation
### touchatag reader
For touchatag reader you need to have these two libraries `libnfc` and `nfc-bindings`.
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

Now plug your NFC device and test it via command (you can find more command typing `nfc-`<kbd>TAB</kbd>)
```{r, engine='bash', count_lines}
$ nfc-list
$ nfc-poll
```
The first command just lists all devices but the second can read your tag via device.

#### nfc-bindings
We are using `nfc-binding` library as python wrapper for `libnfc`. More information in official [repository](https://github.com/xantares/nfc-bindings). We are using library in this [commit](https://github.com/xantares/nfc-bindings/tree/c3b4ae99201be43258fdfb7f708eed21660faac3). If you are using newer//older version it is up you, but this is tested and works well.

Before installation make sure you have all requirements.Probably you do not have `SWIG`. For more information read next chapter.

`nfc-bindings` installation is straightforward. Just follow these steps
```{r, engine='bash', count_lines}
$ git clone https://github.com/xantares/nfc-bindings.git
$ cd nfc-bindings
$ cmake -DCMAKE_INSTALL_PREFIX=~/.local . # in this step you probably NEED to specify python version e.g. -DPYTHON_EXECUTABLE=/usr/bin/python3
$ make install
```

Now try
```{r, engine='bash', count_lines}
$ python3 python/examples/quick_start_example.py
```

If you are getting error [do not panic](http://flamesnation.ca/uploads/Image/don't_panic.jpg)! Try to follow [this issue](https://github.com/xantares/nfc-bindings/issues/7). Does not work? Panic!

#### SWIG
We are using [`SWIG`](http://swig.org/) in version 3.0.9 and works well. For installation just follow.
```{r, engine='bash', count_lines}
$ git clone https://github.com/swig/swig.git
$ cd swig
$ ./autogen.sh
$ ./configure
$ make
$ make install
```