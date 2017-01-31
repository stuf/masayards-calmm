#!/usr/bin/env bash
set -e

DIRNAME=$(dirname $0)
. "$DIRNAME/utils.sh"

ROOT="$DIRNAME/.."

PLUGIN_SRC_DIR="/Library/Internet Plug-Ins/PepperFlashPlayer"
PLUGIN_FILENAME="PepperFlashPlayer.plugin"
MASAYARDS_LIB_DIR="$ROOT/app/lib"

# Create the lib dir if it doesn't exist
[[ ! -d "$MASAYARDS_LIB_DIR" ]] \
	&& mkdir -pv "$MASAYARDS_LIB_DIR"

plugin_src="$PLUGIN_SRC_DIR/$PLUGIN_FILENAME"
flash_plugin="$MASAYARDS_LIB_DIR/$PLUGIN_FILENAME"

if [[ ! -d "$flash_plugin" ]]
then
	log "Flash plugin not found in $flash_plugin"
	log "Looking for PepperFlashPlayer"

	if [[ -d "$plugin_src" ]]
	then
		log "Found installed plugin in $plugin_src"

		cp -r "$plugin_src" "$flash_plugin"
		log "Copied PepperFlashPlayer to $flash_plugin"
	fi
fi

# Read Flash player version
version_key="CFBundleShortVersionString"
defaults read "$flash_plugin/Contents/Info.plist" $version_key

log "All done."
