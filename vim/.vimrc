set nocompatible              " be iMproved, required
filetype off                  " required

" Plugins will be downloaded under the specified directory.
call plug#begin(has('nvim') ? stdpath('data') . '/plugged' : '~/.vim/plugged')

" Declare the list of plugins.
Plug 'junegunn/seoul256.vim'

" List ends here. Plugins become visible to Vim after this call.
call plug#end()

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'preservim/nerdtree'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'Syntastic'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'fatih/vim-go'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetyp plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
  
" Can be enabled or disabled
" let g:webdevicons_enable_nerdtree = 1

" whether or not to show the nerdtree brackets around flags
" let g:webdevicons_conceal_nerdtree_brackets = 1

" vim config file
set autoindent          " 자동 들여쓰기
set cindent             " c 스타일 들여쓰기 사용
set number              " 행 번호 표시하기
set tabstop=4           " 탭의 공백 수치 설정
set shiftwidth=4        " { 입력 후의 자동 들여쓰기 수치
syntax on               " 문법 강조 표시
set visualbell          " 경고음 대신 화면을 깜빡임
set showcmd             " 현재 입력하고 있는 명령 표시
set colorcolumn=80      " 색상으로 열을 제한
set textwidth=79        " 열 너비를 79까지 허용
set cursorline          " 커서가 있는 행에 언더라인 표시
set hlsearch            " 검색어 하이라이팅
set sw=1                " 스크롤바 너비
set autoread            " 작업 중인 파일 외부에서 변경됐을 경우 자동으로 불러옴
set showmatch           " 일치하는 괄호 하이라이팅
set smartcase           " 검색시 대소문자 구별
set smartindent         " 스마트한 들여쓰기
set scrolloff=5         " 5개 행을 미리 스크롤 
set encoding=utf-8      " 인코딩 UTF-8로 설정
set incsearch           " 키워드 입력시 점진적 검색
filetype indent on      " 파일 종류에 따른 구문강조
set expandtab           " 탭대신 스페이스
set ruler               " 화면 우측 하단에 현재 커서의 위치(줄,칸) 표시
set tenc=utf-8          " 터미널 인코딩
set wrap                " window 크기가 부족하면 행 다보이게 하기(<> nowrap)
set nowrapscan          " 검색할 때 문서의 끝에서 처음으로 안돌아감
set backspace=eol,start,indent 
    "  줄의 끝, 시작, 들여쓰기에서 백스페이스시 이전줄로
colorscheme koehler     " color theme 변경
