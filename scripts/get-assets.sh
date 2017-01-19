#!/usr/bin/env bash
set -e

readlink="readlink"

# HACK Use coreutils readlink instead
if [[ "$OSTYPE" == *"darwin"* ]]
then
	readlink="greadlink"
fi

# Get the current path
CWD="$($readlink -f $(dirname $0))"
ROOT="$($readlink -f $CWD/..)"

. "$CWD/utils.sh"

ASSETS_DIR="$ROOT/app/assets"

# Assets
MATERIAL_ICONS_REPO="https://github.com/google/material-design-icons.git"
MATERIAL_ICONS_TARGET=material-design-icons

# Start
if [[ ! -d "$ASSETS_DIR" ]]
then
	echo "Asset directory '$ASSETS_DIR' doesn\'t exist. Creating it."
	mkdir -p "$ASSETS_DIR"
	echo ">> Done."
	echo
fi


echo "Cloning Material Design icon assets into '$ASSETS_DIR/$MATERIAL_ICONS_TARGET'"

pushd "$ASSETS_DIR"
if [[ ! -d "./$MATERIAL_ICONS_TARGET" ]]
then
	git clone --depth 1 "$MATERIAL_ICONS_REPO" $MATERIAL_ICONS_TARGET
else
	echo "Material Design icons already present. Performing update."
	pushd $MATERIAL_ICONS_TARGET
	git pull
	popd
	echo ">> Done."
fi
popd

echo ">> Fetching icons done."

echo "All done! Exiting."

exit
