#* To use these aliases, you need to manually load this file with "source ./aliases.sh"
#* or run loader.sh to add it to your current shell configurations,
#* so the aliases can Automatically loaded when opening the shell.

#* How to run loader.sh? E.g. bash ./loader.sh Or just run YOUR_PACKAGE_MANAGER run setup:alias:load

SCRIPT_PATH="$(realpath "$0")"
SCRIPT_DIR="$(dirname "$SCRIPT_PATH")"
WORKING_DIR="$SCRIPT_DIR/../../"

#? cwd
alias ttk="cd $WORKING_DIR"

#? Docker aliases
# alias docb="docker build . -t PATH_HERE"
# alias docr="docker run -it -u 0 -p 3000:3000 PATH_HERE"

#? Railway aliases
alias rwl="railway logs"
alias rwu="railway up"

#? Liara aliases
alias lrdd="liara deploy --platform=docker"
alias lrdn="liara deploy --platform=node"
alias lrl="liara logs"

#? npm
alias nrb="npm run build"
alias nrcf="npm run check:format"
alias nrcl="npm run check:lint"
alias nrclf="npm run check:lint:fix"
alias nrclfs="npm run check:lint:fix:strict"
alias nrcs="npm run check:style"
alias nrsd="npm run start:dev"
alias nrsp="npm run start:production"
alias nrtd="npm run test:dev"
alias nrtdc="npm run test:dev:coverage"
alias nrtdw="npm run test:dev:watch"
alias nrsdw="npm run start:dev:watch"
alias nrct="npm run check:types"
alias nrctw="npm run check:types:watch"
alias nrsdd="npm run start:dev:dashboard"
alias nrsdm="npm run start:dev:map-view"

#? yarn
alias ya="yarn add"
alias yd="yarn dev"
alias ys="yarn start"
alias yy="yarn"
