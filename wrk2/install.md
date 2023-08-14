# WRK2

## [Source]

 - github: https://github.com/giltene/wrk2

## [Install]

```sh
sudo apt-get install build-essential libssl-dev git zlib1g-dev
git clone https://github.com/giltene/wrk2.git
cd wrk2
make
```

## [Usage]

### - cli

#### GET

```sh
./wrk -t20 -c400 -d30s -R10000 http://localhost:3000/health
```

#### POST

`post.lua`

> ```lua
> -- example HTTP POST script which demonstrates setting the
> -- HTTP method, body, and adding a header
> 
> wrk.method = "POST"
> wrk.body   = '{"foo": "bar", "baz": 1000}'
> wrk.headers["Content-Type"] = "application/json"
> ```

```sh
./wrk -t20 -c400 -d30s -R10000 -s ./post.lua http://localhost:3000/posts
```


### - cli options

```sh
-t{N}     : Thread 개수
-c{N}     : Connection 개수(최소값: Thread 개수)
-R{N}     : TPS 조절
-d{N}s    : 얼마간 진행할 것인가(duration)
-s {name} : 스크립트 파일
```

<br>
<br>
<br>
<br>
<br>

# Lua

## [ Install ]

### - Ubuntu

```sh
sudo apt install build-essential libreadline-dev
sudo apt install lua
sudo apt install luarock
```

### - Build 

#### https://www.lua.org/download.html

```sh
curl -R -O http://www.lua.org/ftp/lua-5.4.4.tar.gz
tar zxf lua-5.4.4.tar.gz
cd lua-5.4.4
make all test
```