#!/bin/sh
export DEVELOPMENT_BUILD_CONFIGURATIONS="+(Debug-DEV|Debug-PROD|Debug)"
export NODE_BINARY=node
../node_modules/react-native-schemes-manager/lib/react-native-xcode.sh
