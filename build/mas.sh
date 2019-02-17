#!/bin/bash

set -ex

APP="Mirrors Photo"

electron-packager . \
  "$APP" \
  --asar \
  --asar-unpack=protocol-link.html \
  --overwrite \
  --platform=mas \
  --app-bundle-id=com.mirrors-photo.mac \
  --app-version="$npm_package_version" \
  --build-version="1.1.0" \
  --arch=x64 \
  --icon=build/icon.icns \
  --prune=true \
  --out=app \
  --extend-info=build/info.plist

APP_PATH="./app/$APP-mas-x64/$APP.app"
RESULT_PATH="./app/$APP.pkg"
APP_KEY="3rd Party Mac Developer Application: Сергей Прищенко (M85FTR22CA)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Сергей Прищенко (M85FTR22CA)"
FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"
CHILD_PLIST="./build/child.plist"
PARENT_PLIST="./build/parent.plist"
LOGINHELPER_PLIST="./build/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"