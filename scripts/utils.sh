#!/usr/bin/env bash
set -e

# Colors
red='\033[0;31m'
bold='\033[1m'
off='\033[0m'

pushd () {
    command pushd "$@" > /dev/null
}

popd () {
    command popd "$@" > /dev/null
}

# Logging
log() {
	printf ">> $@\n"
}

error() {
    printf ">> ${red}ERROR${off}: $@\n"
}
