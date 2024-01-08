#!/bin/sh

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install --build-from-source python@3.10
brew install node@14
brew link node@14
brew install fastlane

echo "ENV: $XCODE_CLOUD_BUILD and $ENV"
# Install dependencies
npm install
pod install

cp -fv ../../.env.$ENV ../../.env
